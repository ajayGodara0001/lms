import Course from "../models/course.model.js";
import CourseProgress from "../models/courseProgress.model.js";
import Purchase from "../models/purchase.js";
import User from "../models/User.js"


export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        return res.json({ success: true, user })
    } catch (error) {

        return res.json({ success: false, message: error.message })
    }
}


export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId
        const courseData = await User.findById(userId).populate("enrolledCourses")
 // const course = await Course.find({_id: courseData.enrolledCourses[0]._id}).lean();
        // const enrolledCourses =  ((JSON.stringify(course, null, 2)));
        //   console.log(enrolledCourses);
        
        return res.json({ success: true, enrolledCourses: courseData.enrolledCourses })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.auth.userId

        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)
        
       
    
        if (!userData || !courseData) {
            return res.json({ success: false, message: "Data not found" })
        }

        const purchaseData = {
            userId,
            courseId: courseData._id,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }

        purchaseData.status = "Completed"

        userData.enrolledCourses.push(courseId)
        courseData.enrolledStudents.push(userId)
    userData.save()
    courseData.save()
    const newPurchase = await Purchase.create(purchaseData)

      
        res.json({ success: true, message: " enrollment complete" })
        // payments razorpay 

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: "lecture already completed" })
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        }
        else {
            await CourseProgress.create({
                userId,
                lectureId,
                lectureCompleted: [lectureId]
            })
        }
        res.json({ success: true, message: "progress updated" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        res.json({ success: true, progressData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const addUserrating = async (req, res) => {
    const userId = req.auth.userId
    const { courseId, rating } = req.body

    if (!userId || !courseId || !rating || !rating < 1 || !rating > 5) {
        return res.json({ success: false, message: "invalid details" })
    }

    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.json({ success: false, message: "course not found" })
        }

        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: "User has not purchased this course" })
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating
        } else {
            course.courseRatings.push({
                userId,
                rating
            })
        }

        await course.save()

        return res.json({ success: true, message: "Rating added" })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}