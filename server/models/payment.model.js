import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

const Payment =  mongoose.model("Payment", PaymentSchema);

export default Payment
