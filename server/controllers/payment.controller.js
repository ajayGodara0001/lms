
import { razorpay } from "../index.js";
import crypto from "crypto";
import User from "../models/User.js";
import Payment from "../models/payment.model.js";

export const createPaymentOrder = async (req, res) => {
    const { amount, currency } = req.body;
     // userId from frontend
    const userId = req.auth.userId
    console.log(userId);
    
    const user = await User.findById(userId)
    if (!user) {
        return res.json({ success: false, message: "User not found" })
    }
    try {
        const options = {
            amount: amount, 
            currency,
            receipt: `order_rcptid_${Math.random()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save order details in database
        const newPayment = new Payment({
            userId,  // Associate payment with user
            orderId: order.id,
            amount: amount,
            currency: currency
        });

        await newPayment.save();
        
        res.json({ mesaage: "order created successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            // Update payment status in database
            await Payment.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    signature: razorpay_signature,
                    status: "Success"
                }
            );

            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            await Payment.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { status: "Failed" }
            );

            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: "not verify payment" });
    }
}


