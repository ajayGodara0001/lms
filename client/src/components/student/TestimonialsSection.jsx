import React from "react";
import { testimonials } from "../../assets/dummyData";

const TestimonialsSection = () => {
  return (
    <div className="py-12 px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Success Stories from Our Learners
      </h1>
      <p className="mt-3 text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
        See how our courses have helped professionals land their dream jobs at leading MNCs!
      </p>

      {/* Testimonials Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[90vw] md:w-[70vw] mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            {/* Image */}
            <img
              src={testimonial.image}
              alt="testimonial_image"
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* Name & Role */}
            <h2 className="mt-3 text-lg font-semibold text-gray-900">{testimonial.name}</h2>
            <h3 className="text-sm text-gray-600">{testimonial.role}</h3>

            {/* Rating Stars */}
            <div className="flex mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Feedback */}
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">{testimonial.feedback}</p>

            {/* Read More Link */}
            <a
              href="#"
              className="mt-3 text-blue-600 hover:underline text-sm font-medium"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
