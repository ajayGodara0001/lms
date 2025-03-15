import { LayoutDashboard, Book, PlusCircle, Users, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-[64px] w-64 bg-white shadow-md flex flex-col p-4 
          h-[calc(100vh-64px)] transition-transform duration-300 md:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/educator/dashboard"
            end // Ensures exact matching
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 transition-all duration-300 
              ${isActive ? "border-r-4 border-blue-500 text-blue-600 bg-blue-50" : "hover:bg-gray-100"}`
            }
            onClick={toggleSidebar}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/educator/mycourse"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 transition-all duration-300 
              ${isActive ? "border-r-4 border-blue-500 text-blue-600 bg-blue-50" : "hover:bg-gray-100"}`
            }
            onClick={toggleSidebar}
          >
            <Book size={20} />
            My Course
          </NavLink>

          <NavLink
            to="/educator/addcourse"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 transition-all duration-300 
              ${isActive ? "border-r-4 border-blue-500 text-blue-600 bg-blue-50" : "hover:bg-gray-100"}`
            }
            onClick={toggleSidebar}
          >
            <PlusCircle size={20} />
            Add Course
          </NavLink>

          <NavLink
            to="/educator/enrolledstudent"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 transition-all duration-300 
              ${isActive ? "border-r-4 border-blue-500 text-blue-600 bg-blue-50" : "hover:bg-gray-100"}`
            }
            onClick={toggleSidebar}
          >
            <Users size={20} />
            Student Enrolled
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
