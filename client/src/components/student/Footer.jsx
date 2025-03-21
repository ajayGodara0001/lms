import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto ">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-20">
          {/* Logo & About */}
          <div className="flex-1">
            <img src={logo} alt="logo" className="w-20" />
            <p className="mt-4 text-gray-400 text-sm max-w-xs">
              Empowering learners worldwide with high-quality courses and expert guidance.
            </p>
          </div>

          {/* Company Links (Added More Space) */}
          <div className="flex-1 ml-0 lg:ml-28 md:ml-16 self-center">
            <p className="text-lg font-semibold">Company</p>
            <nav className="mt-3 flex flex-col gap-3 text-gray-400">
              <a href="#" className="hover:text-white transition">Home</a>
              <a href="#" className="hover:text-white transition">About Us</a>
              <a href="/refund" className="hover:text-white transition">Refund Policy</a>
              <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            </nav>
          </div>

          {/* Newsletter (Added More Space) */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Subscribe to our newsletter</h1>
            <p className="mt-3 text-gray-400 text-sm">
              Stay updated with the latest courses, tips, and special offers.
            </p>
            <div className="mt-5 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 text-white border border-gray-700 outline-none"
              />
              <button className="px-5 py-2 bg-blue-600 rounded-r-md hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">
           {new Date().getFullYear()} © Education. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
