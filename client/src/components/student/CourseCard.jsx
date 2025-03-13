import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const CourseCard = () => {
    const navigate = useNavigate()
  // Dummy course data
  const courses = [
    {
      id: 1,
      image: "https://media.istockphoto.com/id/1456407546/vector/information-technology-and-telecommunications-concepts.webp?a=1&b=1&s=612x612&w=0&k=20&c=aUvnCQbwqEb-_rWJ4PAlQGeTClHAG_9-aBcx1H4A9GY=",
      title: "Full-Stack Web Development",
      instructor: "John Doe",
      rating: 4.8,
      reviews: 1200,
      price: 4999,
    },
    {
      id: 2,
      image: "https://plus.unsplash.com/premium_vector-1682269300973-8070788723b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFydGlmaWNpYWwlMjBpbnRpbGxpZ2FuY2UlMjBhaSUyMGltYWhnZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Artificial Intelligence & ML",
      instructor: "Sarah Lee",
      rating: 4.7,
      reviews: 950,
      price: 5999,
    },
    {
      id: 3,
      image: "https://plus.unsplash.com/premium_vector-1736942106427-d9e5e1bc2633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fERhdGElMjBTY2llbmNlJTIwQm9vdGNhbXB8ZW58MHx8MHx8fDA%3D",
      title: "Data Science Bootcamp",
      instructor: "David Kim",
      rating: 4.6,
      reviews: 800,
      price: 6999,
    },
    {
      id: 4,
      image: "https://plus.unsplash.com/premium_vector-1740097187312-483cec5de795?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R3JhcGhpYyUyMERlc2lnbiUyME1hc3Rlcnl8ZW58MHx8MHx8fDA%3D",
      title: "Graphic Design Mastery",
      instructor: "Emma Watson",
      rating: 4.9,
      reviews: 1500,
      price: 3999,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8  w-full px-4">
      {courses.map((course) => (
        <div 
          onClick={() => {
            navigate("/course/"+course.id),
            scrollTo(0,0)
          }}
          key={course.id} 
          className="shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
        >
          <div className="relative">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover transition-all duration-300 group-hover:brightness-75" />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
            <p className="text-gray-600 text-sm mt-1">Instructor: {course.instructor}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-lg">⭐ {course.rating}</span>
              <span className="text-gray-500 text-sm ml-2">({course.reviews} Reviews)</span>
            </div>
            <p className="mt-3 text-lg font-bold text-blue-600">₹{course.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
