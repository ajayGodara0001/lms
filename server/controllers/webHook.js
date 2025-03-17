import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async(req, res) =>{
        try {
            const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
            await whook.verify(JSON.stringify(req.body), {
                "svix-id" : req.headers["svix-id"],
                "svix-timestamp" : req.headers["svix-timestamp"],
                "svix-signature" : req.headers["svix-signature"]
            })
            const { type, data } = req.body;

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
                    return res.json({})
                    break;
    
                case "user.updated":
                    // Update user details in MongoDB
                    await User.findByIdAndUpdate(data.id, {
                        name: data.first_name + " " + data.last_name,
                        email: data.email_addresses[0]?.email_address,
                        imageUrl: data.image_url,
                    });
                    return res.json({})
                    break;
    
                case "user.deleted":
                    // Remove user from MongoDB
                    await User.findByIdAndDelete(data.id);
                    return res.json({})
                    break;
    
                default:
                    break;
            }
    
           return  res.status(200).json({message:"Webhook processed"});
    
        } catch (error) {
            return res.json({success:false, message: error.message})
        }

}