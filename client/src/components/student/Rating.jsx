import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Rating = ({ initialRating = 0, onChange, id }) => {
  const [rating, setRating] = useState(initialRating);
  const { backendUrl, getToken } = useContext(AppContext);

  // Sync rating with initialRating on component mount or when it changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = async (index) => {
    const newRating = index + 1;
    setRating(newRating);

    if (onChange) {
      onChange(newRating);
    }

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/educator/rating/${id}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error submitting rating:", error.message);
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
