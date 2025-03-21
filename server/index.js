import express from "express"
import cors from "cors"
import dotenv from 'dotenv';

import Razorpay from "razorpay";
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  

dotenv.config();
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webHook.js"
import educatorRoute from "./routes/educator.route.js"
import { clerkMiddleware } from "@clerk/express"
import connectToCloudinary from "./configs/cloudinary.js"
import courseRoute from "./routes/course.route.js"
import userRoute from "./routes/user.route.js"
import paymentsRoutes from "./routes/payment.route.js"

const app = express()

app.use(cors())
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


await connectDB()
await connectToCloudinary()
app.get("/", (req, res) => {
    res.send("api working")
})
app.post("/clerk",  clerkWebhooks )

app.use('/api/educator', educatorRoute)
app.use('/api/course', courseRoute)
app.use('/api/user', userRoute)
app.use("/api/pay", paymentsRoutes);



const PORT =  process.env.PORT || 5000

app.listen(PORT , () =>{
    console.log(`app is listening on port ${PORT}`)
})


// import express from 'express';
// import multer from 'multer';

// const app = express();

// // Multer setup (for form-data without files)
// const upload = multer();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Use Multer to parse form-data
// app.post('/api/course/add', upload.none(), (req, res) => {
//   console.log('Received Body:', req.body);

//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).json({ success: false, message: 'Form data is empty' });
//   }

//   res.json({ success: true, message: 'Data received', data: req.body });
// });

// app.listen(5000, () => console.log('Server running on port 5000'));
