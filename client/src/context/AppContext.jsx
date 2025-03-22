import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "react-toastify"
export const AppContext = createContext()



const AppContextProvider = (props) => {

    const [isEducator, setIsEducator] = useState(false)
    const [userData, setUserdata] = useState(null);
    const [allcourse, setAllCourses] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [enrolledCourse, setEnrolledcourse] = useState([])
    const navigate = useNavigate()
    const [dashBoardData, setDashboardData] = useState([])
    const [educatorCourses, setEducatorCourses] = useState([])

    const [searchQuery, setSearchQuery] = useState()

    const { getToken } = useAuth()
    const { user } = useUser()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

const avgrating =  (item) => {
            let totalReview = 0;
            let totalRating = 0;
        
           item.map((ratings) => 
            totalReview +=1
           )
           item.map((ratings) => totalRating += ratings.rating
           )
           
         return   (totalRating/totalReview).toFixed(1)
        
            
}
const totalReviews =  (item) => {
          
            let totalReview = 0;
           
        
           item.map((ratings) => 
            totalReview +=1
           )
           
          return totalReview
            
}

    const fetchEducator = async () => {
        try {
            const token = await getToken();
            if (!token) {
                console.log("Authentication failed. Please log in again.");
                return;
            }
            const { data } = await axios.get(`${backendUrl}/api/educator/check-role`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                setIsEducator(true)
            } else{
                console.log(data.message);      
            }
        } catch (error) {
           console.log(error.message);     
        }
    }

    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/course/all')
            if (data.success) {
                setAllCourses(data.courses)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchEducatorCoursedata = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/educator/courses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setEducatorCourses(data.educatorCourses)
            } else {
                toast.error(data.message)
            }
            
            
        } catch (error) {
            // toast.error(error.message)
            console.log(error.message)
        }
    }


    const fetchUserData = async () => {
        try {
            // if(user.publicMetadata.role = 'educator'){
            //     setIsEducator(true)
            // }
            const token = await getToken()
            //  console.log(token);

            const { data } = await axios.get(backendUrl + '/api/user/data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUserdata(data.user)     
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    
    const fetchUserEnrolledCourses = async () => {
        try {

            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setEnrolledcourse(data.enrolledCourses)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchDashboarddata = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            // toast.error(error.message)
console.log(error.message);

        }
    }


    useEffect(() => {
        fetchAllCourses()
        fetchDashboarddata()
        fetchEducatorCoursedata()
        fetchEducator()
    },[user])




    

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
       course.map((chapter) => {
        chapter.chapterContent.map((lec) => {
          totalTime += lec.lectureDuration    
        })   
       })
        return totalTime
    };

    const totalTimeOfChapter = (chapter) => {
        let totalTime = 0;

       chapter.chapterContent.map((lecture) => {
            totalTime += lecture.lectureDuration    
        })
        
        return totalTime;
    };

    const lecTime = (lec) => {
      return lec.lectureDuration
      
    }


    
    
    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserEnrolledCourses()
        }
    }, [user])


    const value = {
          totalReviews, avgrating, educatorCourses, userData, enrolledCourse, dashBoardData, isEducator, noOfLesson, setIsEducator, totalTimeOfCourse, isEnrolled, lecTime, totalTimeOfChapter, noOfLecture, allcourse, navigate, searchQuery, setSearchQuery, backendUrl, fetchAllCourses, getToken, setUserdata, setIsEnrolled, fetchUserEnrolledCourses
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