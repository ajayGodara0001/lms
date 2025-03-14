import React from 'react';
import { NavLink } from 'react-router-dom';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 py-16 ">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Master Skills from Industry Experts
      </h1>
      <p className="mt-3 text-lg md:text-xl max-w-2xl text-gray-700">
        Explore top-rated courses in Development, AI, Data Science, Design, and more.  
        Gain real-world expertise and take your career to the next level.
      </p>

<CourseCard limit={4} hero={true} />

      <NavLink to="/allcourses" >
        <button onClick={() => scrollTo(0,0)} className="mt-6 px-6 py-3 bg-blue-600 cursor-pointer text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Show All Courses
        </button>
      </NavLink>
    </div>
  );
};

export default CoursesSection;
