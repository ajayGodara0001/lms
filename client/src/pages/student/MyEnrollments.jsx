import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourse, totalTimeOfCourse, navigate, userData, backendUrl, fetchUserEnrolledCourses, getToken } = useContext(AppContext);

  const [progressArray] = useState([
    { lectureCompleted: 3, totalLecture: 10 },
    { lectureCompleted: 5, totalLecture: 5 },
    { lectureCompleted: 4, totalLecture: 8 },
    { lectureCompleted: 5, totalLecture: 6 },
  ]);

 
  return (
   <>
     <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Enrollments</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-sm md:text-base">
              <th className="p-3 text-left border border-gray-300">Course</th>
              <th className="p-3 text-left border border-gray-300">Duration</th>
              <th className="p-3 text-left border border-gray-300">Progress</th>
              <th className="p-3 text-left border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourse.length > 0 ? (
              enrolledCourse.map((course, index) => {
                const progress = progressArray[index]
                  ? (progressArray[index].lectureCompleted / progressArray[index].totalLecture) * 100
                  : 0;
                const isCompleted = progress === 100;

                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all border-b border-gray-200">
                    <td className="p-3 flex flex-col md:flex-row items-start md:items-center gap-3 border border-gray-300">
                      <img
                        src={course.courseThumbnail}
                        alt="Course"
                        className="w-16 h-16 object-cover rounded-md shadow"
                      />
                      <p className="font-medium text-sm md:text-base">{course.courseTitle}</p>
                    </td>
                    <td className="p-3 border border-gray-300 text-sm md:text-base">
                    {totalTimeOfCourse(course?.courseContent)} mins
                    </td>
                    <td className="p-3 border border-gray-300 text-sm md:text-base">
                      <div className="flex flex-col gap-2">
                        <span className="font-semibold">
                          {progressArray[index] &&
                            `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLecture} fix it`}
                        </span>
                        <Line strokeWidth={3} percent={progress} strokeColor="#3b82f6" className="rounded-full" />
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300 text-sm md:text-base">
                      <button
                        onClick={() => navigate("/player/" + course._id)}
                        className={`px-4 py-2 rounded-md cursor-pointer transition ${
                          isCompleted
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {isCompleted ? "Completed" : "Ongoing"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-5 text-center text-gray-500 font-medium">
                  No enrollments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
    <Footer />
   </>
  );
};

export default MyEnrollments;
