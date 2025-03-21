import express from "express"
import  {addCourse, checkRole, educatorCourse, educatordashboardData, getEnrolledStudensData, updateRoleToEducator}  from "../controllers/educator.controller.js"
import upload from "../configs/multer.js"
import { protectEducator } from "../middlewares/authMiddleware.js"

const educatorRoute = express.Router()

educatorRoute.get('/update-role', updateRoleToEducator)
educatorRoute.post('/add-course',protectEducator, upload.single("image"), addCourse)
educatorRoute.get('/courses', protectEducator, educatorCourse)
educatorRoute.get('/dashboard', protectEducator, educatordashboardData)
educatorRoute.get('/enrolled-students', protectEducator, getEnrolledStudensData)
educatorRoute.get('/check-role', protectEducator, checkRole)
export default educatorRoute