import Course from "../models/course.model.js";
import User from "../models/User.js";

export const getAllCourse = async(req, res) =>{
    try {
        const courses  = await Course.find({isPublished:true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'})
        
        res.json({success:true, courses})
    } catch (error) {
        res.json({success:false, message:error.message})   
    }
}
export const getcourseId = async(req, res) =>{
    const { id }= req.params
    
    try {
       const courseData = await Course.findById(id)
    
      
      const educator  = await  User.findById(courseData.educator)
   
   
      
        // If course is not found, return an error
        if (!courseData) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
       courseData.courseContent.forEach(chapter => {
        chapter.chapterContent.forEach(lecture => {
            if(!lecture.isPreviewFree){
                lecture.lectureUrl =""
            }
        })
       })

       res.json({success: true, courseData , educator: educator.name})
    } catch (error) {
        res.json({success:true, message:error.message})
        
    }
}