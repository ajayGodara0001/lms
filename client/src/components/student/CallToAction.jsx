import { ArrowBigRight } from "lucide-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="py-12 px-6 text-center flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Learn Anything, Anytime, Anywhere
      </h1>

      {/* Description */}
      <p className="mt-3 text-lg md:text-xl max-w-2xl text-gray-700">
        Unlock a world of knowledge with our expert-led courses. Whether you want to master coding,
        design, AI, or business—your learning journey starts here!
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-3 cursor-pointer bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md transition-all hover:bg-blue-700">
          Get Started
        </button>
        <button className="px-6 py-3 cursor-pointer bg-gray-200 text-gray-900 text-lg font-medium rounded-lg shadow-md flex items-center gap-2 transition-all hover:bg-gray-300">
          Learn More <ArrowBigRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
