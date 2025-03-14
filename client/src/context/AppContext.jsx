import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allCourses as courseData } from "../assets/dummyData";

export const AppContext = createContext()



const AppContextProvider = (props) => {

    const [isEducator, setIsEducator] = useState(false)
    const [allcourse, setAllCourses] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(false)
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState()

    useEffect(() => {
        setAllCourses(courseData)
    }, [])


    const noOfLecture = (chapter) => {
        let totalLecture = 0;  
        chapter.forEach((lecture) => totalLecture += 1);
        return totalLecture;  // Return the total count
    };
    const noOfLesson = (course) => {
        let totalLecture = 0;  
        course.forEach((chapter) => {
            chapter.chapterContent.forEach(() => totalLecture++);
        });
        return totalLecture;
    };
    
    const totalTimeOfCourse = (course) => {
        let totalTime = 0;  
        course.forEach((lecture) => {
            lecture.chapterContent.forEach((lec) => {
                const [minutes, seconds] = lec.duration.split(":").map(Number);
                totalTime += minutes * 60 + seconds;  // Convert to total seconds
            });
        });
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = totalTime % 60;
        return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
    };

    const totalTimeOfChapter = (chapter) => {
        let totalTime = 0;  
        chapter.forEach((lec) => {
           
                const [minutes, seconds] = lec.duration.split(":").map(Number);
                totalTime += minutes * 60 + seconds;  // Convert to total seconds
          
        });

       
            const hours = Math.floor(totalTime / 3600);
            const minutes = Math.floor((totalTime % 3600) / 60);
            const seconds = totalTime % 60;
            return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      
        
    };

    const lecTime = (lec) =>{
        let totalTime = 0; 
      {  const [minutes, seconds] = lec.duration.split(":").map(Number);
        totalTime += minutes * 60 + seconds;  }// Convert to total seconds


        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = totalTime % 60;
        return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
    }

   
    
const value = {
    isEducator,noOfLesson, setIsEducator,totalTimeOfCourse,isEnrolled,lecTime, totalTimeOfChapter, noOfLecture, allcourse, navigate, searchQuery, setSearchQuery
}

return (
    <AppContext.Provider value={value}>
        {
            props.children
        }
    </AppContext.Provider>
)
}

export default AppContextProvider 