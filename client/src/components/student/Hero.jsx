import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit px-4 text-center bg-gradient-to-b from-cyan-300/40 to-white text-gray-900">
      <div className="py-20 flex flex-col items-center ">
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">
          Transform Your Ambitions into Achievements
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl text-gray-700">
          Your journey to success starts here. Learn from world-class instructors, gain in-demand skills, and unlock endless opportunities. The future is yours—let’s build it together!
        </p>
        
        {/* Centering the SearchBar */}
        <div className="mt-6 w-full flex justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
