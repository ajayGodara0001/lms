import { Webhook } from "svix";
import User from "../models/User.js";
import { json } from "express";

export const clerkWebhooks = async(req, res) =>{
        try {
            const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
            await whook.verify(JSON.stringify(req.body), {
                "svix-id" : req.headers["svix-id"],
                "svix-timestamps" : req.headers["svix-timestamps"],
                "svix-signature" : req.headers["svix-signature"]
            })
            const { type, data } = evt;

            console.log("✅ Webhook received:", type, data);
    
            switch (type) {
                case "user.created":
                    // Add a new user to MongoDB
                    await User.create({
                        _id: data.id,
                        name: data.first_name + " " + data.last_name,
                        email: data.email_addresses[0]?.email_address,
                        imageUrl: data.image_url,
                    });
                    console.log("👤 New user added:", data.id);
                    res.json({})
                    break;
    
                case "user.updated":
                    // Update user details in MongoDB
                    await User.findByIdAndUpdate(data.id, {
                        name: data.first_name + " " + data.last_name,
                        email: data.email_addresses[0]?.email_address,
                        imageUrl: data.image_url,
                    });
                    console.log("🔄 User updated:", data.id);
                    res.json({})

                    break;
    
                case "user.deleted":
                    // Remove user from MongoDB
                    await User.findByIdAndDelete(data.id);
                    console.log("❌ User deleted:", data.id);
                    res.json({})
                    break;
    
                default:
                    console.log("⚠️ Unhandled webhook event:", type);
                    break;
            }
    
            res.status(200).send("Webhook processed");
    
        } catch (error) {
            res.json({success:false, message: error.message})
        }

}