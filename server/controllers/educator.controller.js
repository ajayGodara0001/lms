import { clerkClient } from "@clerk/express"
import Course from "../models/course.model.js"
import { v2 as cloudinary } from "cloudinary"
import Purchase from "../models/purchase.js"
import streamifier from 'streamifier';
import User from "../models/User.js";


export const addRating = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.auth.userId
        const { rating } = req.body
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if user has already rated the course
        const existingRating = course.courseRatings.find((r) => r.userId === userId);


        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
        } else {
            // Add a new rating
            course.courseRatings.push({ userId, rating });
        }

        // Save the updated course
        await course.save();
        return res.json({ success: true, message: "ratting added" })
        
    } catch (error) {
        return res.json({ success: false, message: "ratting not  added" })

    }
}

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId
        if (!req.auth?.userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator'
            }
        })

        return res.json({ success: true, message: "you can publish a course now" })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

export const checkRole = async (req, res) => {
    try {
        const userId = req.auth.userId
        if (!req.auth?.userId) {
            return res.json({ success: false, message: "User ID not found" });
        }

        const user = await clerkClient.users.getUser(userId);
        const role = user?.publicMetadata?.role;

        if (!role) {
            return res.json({ success: false, message: "Role not found in public metadata" });
        }
        res.json({ success: true, role });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}

export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.json({ success: false, message: "thumbnail not attached" })
        }

        if (!imageFile || !imageFile.buffer) {
            return res.json({ success: false, message: 'Invalid image file' });
        }
        const parsedCourseData = typeof courseData === "string" ? await JSON.parse(courseData) : courseData;



        parsedCourseData.educator = educatorId

        console.log("parsedCourseData: ", parsedCourseData);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "image" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
        });
        console.log("courseThumbnail: ", result.secure_url);

        const newCourse = new Course(parsedCourseData)
        newCourse.courseThumbnail = result.secure_url;


        console.log("newCourse: ", newCourse);

        await newCourse.save()

        return res.json({ success: true, message: "course added" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const educatorCourse = async (req, res) => {
    try {
        const educator = req.auth.userId


        const educatorCourses = await Course.find({ educator })
        return res.json({ success: true, educatorCourses })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



export const educatordashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const totalCourse = courses.length
        const courseIds = courses.map((course) => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'Completed'
        })


        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)


        const enrolledStudensData = []
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')

            students.forEach(student => {
                enrolledStudensData.push(
                    {
                        courseTitle: course.courseTitle,
                        student
                    }
                )
            })
        }
        res.json({
            success: true, dashboardData: {
                totalCourse, totalEarnings, enrolledStudensData, purchases
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const getEnrolledStudensData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const courseIds = courses.map((course) => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'Completed'
        }).populate('userId', 'name, imageUrl').populate('courseId', courseTitle)


        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({ success: true, enrolledStudents })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}