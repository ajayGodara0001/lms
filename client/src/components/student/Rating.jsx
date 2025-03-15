import React, { useState } from "react";
import { Star } from "lucide-react";

const Rating = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (index) => {
    setRating(index + 1);
    if (onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={30}
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          fill={index < rating ? "#FFD700" : "none"}
          stroke={index < rating ? "#FFD700" : "#ccc"}
          onClick={() => handleRating(index)}
        />
      ))}
    </div>
  );
};

export default Rating;
