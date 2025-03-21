import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { ArrowBigDown, ArrowBigRight, BookOpen, Clock, SettingsIcon } from "lucide-react";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

import { handlePayment } from "../../../utils/paymentService.js";
const DetailCourse = () => {
  const { allcourse, noOfLecture, totalTimeOfCourse, noOfLesson, totalTimeOfChapter, lecTime, isEnrolled, userData, backendUrl, getToken, setIsEnrolled } =
    useContext(AppContext);
  const { id } = useParams();


  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState(null)
  const [course, setCourse] = useState(null)
  const [educatorName, setEducatorName] = useState("");
  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id)


      if (data.success) {
        setCourse(data.courseData)
        setEducatorName(data.educator)
       
        
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  const enrolledCourse = async () => {
    try {
      setLoading(true)
      if (!userData) {
        setLoading(false)
        return toast.warn("Login first")
      }
      if (isEnrolled) {
        setLoading(false)
        return toast.warn("Already Enrolled")
      }
      const token =  await getToken()
      const paymentData = await handlePayment(backendUrl, token);

      if (paymentData.success) {
        const { data } = await axios.post(backendUrl + '/api/user/purchase', {
          courseId: course._id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      

      if(data.success){
        console.log(data);
        
        setLoading(false)
        window.scrollTo(0, 0);
        setIsEnrolled(true)
        toast.warn("enrolled complete")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return
      }else{
        setLoading(false)
        return toast.error(data.message)
      }
    }
  } catch (error) {
     setLoading(false)
      return toast.error(error.message)
    }
  }
  useEffect(() => {
    if(userData && course){
      setIsEnrolled(userData.enrolledCourses.includes(course._id))
    }
  }, [userData, course])
  useEffect(() => {
    fetchCourseData()
  }, [])
  // State to handle toggling of lectures for each chapter
  const [openChapters, setOpenChapters] = useState({});

  const toggleChapter = (index) => {
    setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!course) {
    return <Loading />
  }
  
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row gap-8 p-6 max-w-6xl mx-auto">

        {/* 📌 Right Section (Moves to Top on Mobile, 1/2 width on Large Screens) */}
        <div className="w-full md:w-3/5 ">
          {/* Course Title & Description */}
          <div>
            <h1 className="text-2xl font-bold">{course?.courseTitle}</h1>
            <p className="text-gray-600 mt-2"></p>
            <p className="text-gray-600 mt-2">{course?.courseDescription.slice(0, 200) + "..."}</p>
          </div>

          {/* Rating & Instructor */}
          <div className="flex items-center mt-2">
            <div>
              <span className="text-yellow-500 text-lg">⭐ {course?.rating}</span>
              <span className="text-gray-500 text-sm ml-2">({course?.reviews} Reviews)</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-700">Course by:  {educatorName}</p>
            </div>
          </div>

          {/* Course Structure */}
          <div className="mt-6">
            <h1 className="text-xl font-semibold mb-3">Course Structure</h1>
            {course?.courseContent.map((chapter, index) => (
              <div key={index} className="mb-4 border border-gray-300 rounded-lg p-3">
                
                {/* Chapter Title & Toggle Button */}
                <div className="flex items-center justify-between" onClick={() => toggleChapter(index)}>
                  <div className="flex items-center gap-2 ">

                    {openChapters[index] ? <ArrowBigDown size={24} /> : <ArrowBigRight size={24} />}

                    <h2 className="text-lg font-semibold">{chapter?.chapterTitle}</h2>

                  </div>
                  <div className="flex items-center gap-3 ">
                    <p className="text-gray-600 text-sm">
                      <strong>Lectures:</strong> {noOfLecture(chapter.chapterContent || [])}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Duration: </strong>{totalTimeOfChapter(chapter) } mins
                      {/* <strong>Duration:</strong>12 fix it */}
                    </p>
                  </div>

                </div>

                {/* Chapter Details */}
                {
                  openChapters[index] && (
                    <div className="mt-3">

                      {/* Lectures List */}
                      <div className="mt-2">
                        {chapter.chapterContent.map((lec, i) => (
                          <div key={i} className="p-2 bg-gray-100 flex  items-center justify-between rounded-md mt-2">
                            <h3 className="font-medium">{lec.lectureTitle}</h3>
                            <div className="flex gap-5">
                              <p onClick={() => setPlayer({
                                videoid: lec.lectureUrl
                              })} className="text-blue-500 hover:cursor-pointer hover:underline">{lec.isPreviewFree ? "Preview" : ""}</p>
                              <p className="text-sm text-gray-600">{lecTime(lec)} mins</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              </div>
            ))}
          </div>

          {/* 📌 Course Description at Bottom */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h1 className="text-lg font-semibold">Course Description</h1>
            <p className="text-gray-700 mt-2">{course?.courseDescription}</p>
          </div>
        </div>

        {/* Left Section (1/2 on Large Screens, Below Right Section on Mobile) */}
        <div className="w-full md:w-2/5 space-y-6">
          {/* Course Image */}
          {
            player ? (
              <YouTube videoId={player.videoid} iframeClassName="w-full aspect-video" opts={{ playerVars: { autoplay: 1 } }} />
            ) : (
              <img src={course?.courseThumbnail} alt="Course" className="w-full object-cover rounded-lg shadow-lg" />)
          }

          {/* Pricing & Discount */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
              ₹{Math.floor(course?.coursePrice - (course?.discount * course?.coursePrice) / 100)}
              </span>
              <span className="text-gray-500 line-through">₹{course?.coursePrice}</span>
              <span className="text-red-600 text-sm font-medium">{course?.discount}% off</span>
            </div>
          </div>

          {/* Course Info (Lessons & Duration) */}
          <div className="p-4 bg-white border rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock />
              <span>{totalTimeOfCourse(course?.courseContent)} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen />
              <span>{noOfLesson(course?.courseContent)} Lessons</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button
          onClick={enrolledCourse}
            className={`w-full py-3  text-white font-semibold rounded-lg transition ${ loading ? "bg-gray-500 cursor-not-allowed " : isEnrolled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              } `}
          >
            { loading ? "Please Wait"  : isEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>

          {/* Course Features */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h1 className="text-lg font-semibold">What’s in the Course?</h1>
            <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
              <li>Lifetime Access</li>
              <li>Step-by-Step Guidance</li>
              <li>Hands-on Projects</li>
              <li>Certificate of Completion</li>
              <li>Exclusive Community Access</li>
            </ul>
          </div>
        </div>

      </div >
      <Footer />
    </>
  );
};

export default DetailCourse;
