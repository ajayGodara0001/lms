import express from "express"
import { getAllCourse, getcourseId } from "../controllers/course.controller.js"

const courseRoute = express.Router()

courseRoute.get("/all", getAllCourse )
courseRoute.get("/:id", getcourseId )


export default courseRoute