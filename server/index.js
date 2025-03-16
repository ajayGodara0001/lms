import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webHook.js"

const app = express()

app.use(cors())
await connectDB()

app.get("/", (req, res) => {
    res.send("api working")
})
app.post("/clerk", express.json(), clerkWebhooks )



const PORT =  process.env.PORT || 5000

app.listen(PORT , () =>{
    console.log(`app is listening on port ${PORT}`)
})