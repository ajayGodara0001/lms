import express from "express"
import { addUserrating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from "../controllers/user.controller.js"

const userRoute = express.Router()


userRoute.get("/data", getUserData)
userRoute.get("/enrolled-courses", userEnrolledCourses )
userRoute.post("/purchase", purchaseCourse )
userRoute.post("/update-course-progress", updateUserCourseProgress )
userRoute.post("/get-course-progress", getUserCourseProgress )
userRoute.post("/add-rating", addUserrating )
export default userRoute