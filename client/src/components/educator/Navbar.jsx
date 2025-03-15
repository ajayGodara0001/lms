import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="h-[64px] flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-gray-100 rounded-md shadow-md"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="logo_img"
          onClick={() => navigate("/")}
          className="w-12 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold">
          {user ? `Hi, ${user.fullName}!` : "Hi, Developer"}
        </p>
        {user ? (
          <UserButton />
        ) : (
          <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
