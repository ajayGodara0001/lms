import express from "express"
import { getAllCourse, getcourseId, lectureIsCompleted } from "../controllers/course.controller.js"

const courseRoute = express.Router()

courseRoute.get("/all", getAllCourse )
courseRoute.get("/:id", getcourseId )
courseRoute.post("/isCompleted/:id", lectureIsCompleted)


export default courseRoute