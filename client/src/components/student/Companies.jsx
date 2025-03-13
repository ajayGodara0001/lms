import React from "react";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg" },
];

const Companies = () => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <h1 className=" text-center text-xl md:text-2xl font-semibold text-gray-900 ">
        Trusted by industry leaders and millions of learners worldwide
      </h1>

      <div className="mt-6 grid grid-cols-2  sm:grid-cols-4 gap-8 sm:gap-16  px-6">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-auto grayscale hover:grayscale-0 transition duration-300"
            />
            <span className="text-sm font-medium text-gray-600">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
