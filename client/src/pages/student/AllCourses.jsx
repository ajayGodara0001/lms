import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import CourseCard from '../../components/student/CourseCard';
import Footer from '../../components/student/Footer';
import { X } from 'lucide-react';

const AllCourses = () => {
  const { navigate, searchQuery, setSearchQuery } = useContext(AppContext);
  return (
    <div className="max-w-7xl mx-auto  py-8">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Course List</h1>
        <p className="text-gray-600 mt-2">
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Home
          </span>{' '}
          / <span className=" text-blue-500">Course List</span>
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {searchQuery && (
        <div className="flex items-center bg-blue-100 text-blue-700 px-3 w-fit mb-5 m-4 py-1 rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-200">
          <span className="text-sm font-medium">{searchQuery}</span>
          <X
            className="w-5 h-5 ml-2 cursor-pointer text-blue-500 hover:text-red-500 transition-colors duration-200"
            onClick={() => setSearchQuery("")}
          />
        </div>
      )}
      {/* Course Grid */}
      <CourseCard  />


      <div className='mt-10'>
        <Footer />
      </div>
    </div>


  );
};

export default AllCourses;
