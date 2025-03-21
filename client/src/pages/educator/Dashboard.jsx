import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { dashBoardData } = useContext(AppContext);
  
  return (
    <div className="p-6 space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">{dashBoardData?.enrolledStudensData?.length}</h2>
          <span className="text-gray-700 text-lg">Total Enrollments</span>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-green-600">₹{Math.floor(dashBoardData.totalEarnings)}</h2>
          <span className="text-gray-700 text-lg">Total Earnings</span>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-yellow-600">{dashBoardData.totalCourse}</h2>
          <span className="text-gray-700 text-lg">Total Courses</span>
        </div>
      </div>

      {/* Enrolled Students Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4">#</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Course Title</th>
            </tr>
          </thead>
          <tbody>
            {dashBoardData?.enrolledStudensData?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 flex items-center gap-3">
                  <img src={item.student.imageUrl} alt="img" className="w-10 h-10 rounded-full shadow-md" />
                  <span className="text-gray-800">{item.student.name}</span>
                </td>
                <td className="p-4">{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
