import React, { useState } from "react";
import Navbar from "../../components/educator/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/educator/SideBar";

const Educator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar with toggleSidebar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Controlled by state */}
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Educator;
