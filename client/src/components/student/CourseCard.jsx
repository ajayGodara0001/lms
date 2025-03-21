import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ limit, hero = false }) => {
  const navigate = useNavigate();
  const { allcourse, searchQuery } = useContext(AppContext);


  let filteredCourses = allcourse?.filter((course) =>
    course?.courseTitle?.toLowerCase().includes(searchQuery?.toLowerCase().trim() || "")
  );

  const displayedCourses = hero ? allcourse.slice(0, limit) : filteredCourses



  if (displayedCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-lg bg-blue-100 shadow-md">
        <p className="text-gray-700 text-lg font-semibold">No courses available.</p>
        <p className="text-gray-900 text-sm mt-2">Try a different search or check back later.</p>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full px-4">
      {displayedCourses.map((course) => (
        <div
          onClick={() => {
            navigate("/course/" + course._id);
            scrollTo(0, 0);
          }}
          key={course._id}
          className="shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
        >
          <div className="relative">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-40 object-cover transition-all duration-300 group-hover:brightness-75"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{course.courseTitle}</h2>
            <p className="text-gray-600 text-sm mt-1">Instructor: {course.educator?.name}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-lg">⭐ {course.courseRating}</span>
              <span className="text-gray-500 text-sm ml-2">({course.reviews} Reviews)</span>
            </div>
            <p className="mt-3 text-lg font-bold text-blue-600">₹{course.coursePrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
