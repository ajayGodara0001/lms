import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allCourses as courseData } from "../assets/dummyData";

export const AppContext = createContext()



const AppContextProvider = (props) => {

    const [isEducator, setIsEducator] = useState(false)
    const [allcourse, setAllCourses] = useState([])
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState()

    useEffect(() =>{
     setAllCourses(courseData)
    },[])

    const value = {
        isEducator, setIsEducator, allcourse, navigate, searchQuery, setSearchQuery
    }

    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export  default AppContextProvider 