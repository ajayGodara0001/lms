import React, { useContext, useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import uniqid from "uniqid";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { backendUrl, getToken, navigate } = useContext(AppContext)
  const [course, setCourse] = useState({
    courseTitle: "",
    courseDescription: "",
    courseThumbnail: null, // Store the uploaded file
    coursePrice: "",
    isPublished: true,
    discount: "",
    courseContent: [],
    courseRatings: [],
    educator: "",
    enrolledStudents: [],
  });

  const [adding, setadding] = useState(false);
  const [errors, setErrors] = useState({});
  const [visibleChapters, setVisibleChapters] = useState({});

  // Toggle chapter visibility
  const toggleChapterVisibility = (index) => {
    setVisibleChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  // Handle file upload for course thumbnail
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => ({ ...prev, courseThumbnail: file }));
    }
  };

  // Add a new chapter
  const handleAddChapter = () => {
    setCourse((prev) => ({
      ...prev,
      courseContent: [
        ...prev.courseContent,
        {
          chapterId: uniqid(),
          chapterTitle: "",
          chapterOrder: prev.courseContent.length + 1,
          chapterContent: [],
        },
      ],
    }));
  };

  // Add a new lecture to a chapter
  const handleAddLecture = (chapterIndex) => {
    setCourse((prev) => {
      const updatedChapters = [...prev.courseContent];
      updatedChapters[chapterIndex].chapterContent.push({
        lectureId: uniqid(),
        lectureTitle: "",
        lectureDuration: "",
        lectureUrl: "",
        isPreviewFree: false,
        lectureOrder: updatedChapters[chapterIndex].chapterContent.length + 1,
      });
      return { ...prev, courseContent: updatedChapters };
    });
  };

  // Remove a chapter
  const handleRemoveChapter = (index) => {
    setCourse((prev) => ({
      ...prev,
      courseContent: prev.courseContent.filter((_, i) => i !== index),
    }));
  };

  // Remove a lecture from a chapter
  const handleRemoveLecture = (chapterIndex, lectureIndex) => {
    setCourse((prev) => {
      const updatedChapters = [...prev.courseContent];
      updatedChapters[chapterIndex].chapterContent.splice(lectureIndex, 1);
      return { ...prev, courseContent: updatedChapters };
    });
  };

  // Handle changes in chapter title
  const handleChapterChange = (index, value) => {
    setCourse((prev) => ({
      ...prev,
      courseContent: prev.courseContent.map((chapter, i) =>
        i === index ? { ...chapter, chapterTitle: value } : chapter
      ),
    }));
  };

  // Handle changes in lecture fields
  const handleLectureChange = (chapterIndex, lectureIndex, name, value) => {
    setCourse((prev) => {
      const updatedChapters = [...prev.courseContent];
      updatedChapters[chapterIndex].chapterContent[lectureIndex][name] = value;
      return { ...prev, courseContent: updatedChapters };
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Validate top-level fields
    if (!course.courseTitle.trim()) newErrors.courseTitle = "Course title is required.";
    if (!course.courseDescription.trim()) newErrors.courseDescription = "Course description is required.";
    if (!course.courseThumbnail) newErrors.courseThumbnail = "Course thumbnail is required.";
    if (!course.coursePrice || course.coursePrice <= 0) newErrors.coursePrice = "Course price must be greater than 0.";
    if (!course.discount || course.discount < 0 || course.discount > 100) newErrors.discount = "Discount must be between 0 and 100.";

    // Validate course content
    if (course.courseContent.length === 0) {
      newErrors.courseContent = "At least one chapter is required.";
    } else {
      course.courseContent.forEach((chapter, chapterIndex) => {
        if (!chapter.chapterTitle.trim()) newErrors[`chapter-${chapterIndex}`] = "Chapter title is required.";
        if (chapter.chapterContent.length === 0) {
          newErrors[`chapterContent-${chapterIndex}`] = "At least one lecture is required in this chapter.";
        } else {
          chapter.chapterContent.forEach((lecture, lectureIndex) => {
            if (!lecture.lectureTitle.trim()) newErrors[`lecture-${chapterIndex}-${lectureIndex}`] = "Lecture title is required.";
            if (!lecture.lectureUrl.trim()) newErrors[`lectureUrl-${chapterIndex}-${lectureIndex}`] = "Lecture URL is required.";
            if (!lecture.lectureDuration || lecture.lectureDuration <= 0) newErrors[`lectureDuration-${chapterIndex}-${lectureIndex}`] = "Lecture duration must be greater than 0.";
          });
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.log("Validation failed. Please fix the errors.");
      return;
    }

    try {
      const token = await getToken()
      setadding(true)
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(course)); // Append course data as a JSON string
      formData.append("image", course.courseThumbnail); // Append the image file
    
      // Make the API call
    const { data } = await axios.post(backendUrl + "/api/educator/add-course", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file uploads
        Authorization: `Bearer ${token}`, // Add the authorization token
      },
    });
if(data.success){
    toast.success(data.message)
    setadding(false)
    window.scrollTo(0, 0);
  setCourse({
    courseTitle: "",
    courseDescription: "",
    courseThumbnail: null, // Store the uploaded file
    coursePrice: "",
    isPublished: true,
    discount: "",
    courseContent: [],
    courseRatings: [],
    educator: "",
    enrolledStudents: [],
  })
  setTimeout(() => {
    navigate("/educator")
    window.location.reload();
  }, 1500);
}
} catch (error) {
  setadding(false)
      toast.success(error.message)   
    }
  };

  // Prevent form submission on Enter key press in input fields
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Course Title */}
        <div className="mb-4">
          <input
            type="text"
            name="courseTitle"
            placeholder="Course Title"
            value={course.courseTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border p-2 w-full"
          />
          {errors.courseTitle && <p className="text-red-500 text-sm">{errors.courseTitle}</p>}
        </div>

        {/* Course Description */}
        <div className="mb-4">
          <textarea
            name="courseDescription"
            placeholder="Course Description"
            value={course.courseDescription}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border p-2 w-full h-40"
          />
          {errors.courseDescription && <p className="text-red-500 text-sm">{errors.courseDescription}</p>}
        </div>

        {/* Course Thumbnail */}
        <div className="mb-4">
          <input
            type="file"
            name="courseThumbnail"
            accept="image/*"
            onChange={handleFileUpload}
            className="border p-2 w-full"
          />
          {errors.courseThumbnail && <p className="text-red-500 text-sm">{errors.courseThumbnail}</p>}
        </div>

        {/* Course Price */}
        <div className="mb-4">
          <input
            type="number"
            name="coursePrice"
            placeholder="Price"
            value={course.coursePrice}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border p-2 w-full"
          />
          {errors.coursePrice && <p className="text-red-500 text-sm">{errors.coursePrice}</p>}
        </div>

        {/* Discount */}
        <div className="mb-4">
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={course.discount}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border p-2 w-full"
          />
          {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
        </div>

        {/* Add Chapter Button */}
        <button type="button" onClick={handleAddChapter} className="bg-blue-500 text-white p-2 rounded mb-4">
          Add Chapter
        </button>
        {errors.courseContent && <p className="text-red-500 text-sm">{errors.courseContent}</p>}

        {/* Chapters */}
        {course.courseContent.map((chapter, chapterIndex) => (
          <div key={chapter.chapterId} className="mt-4 border p-4 relative">
            <button
              type="button"
              className="absolute top-7 right-6 text-red-500"
              onClick={() => handleRemoveChapter(chapterIndex)}
            >
              <X size={20} />
            </button>
            <div className="flex items-center cursor-pointer" onClick={() => toggleChapterVisibility(chapterIndex)}>
              {visibleChapters[chapterIndex] ? <ChevronDown /> : <ChevronRight />}
              <input
                type="text"
                placeholder="Chapter Title"
                value={chapter.chapterTitle}
                onChange={(e) => handleChapterChange(chapterIndex, e.target.value)}
                onKeyDown={handleKeyDown}
                className="border p-2 w-full mb-2 ml-2"
              />
            </div>
            {errors[`chapter-${chapterIndex}`] && <p className="text-red-500 text-sm">{errors[`chapter-${chapterIndex}`]}</p>}
            {errors[`chapterContent-${chapterIndex}`] && <p className="text-red-500 text-sm">{errors[`chapterContent-${chapterIndex}`]}</p>}

            {visibleChapters[chapterIndex] && (
              <>
                <button type="button" onClick={() => handleAddLecture(chapterIndex)} className="bg-green-500 text-white p-2 rounded mt-2">
                  Add Lecture
                </button>

                {/* Lectures */}
                {chapter.chapterContent.map((lecture, lectureIndex) => (
                  <div key={lecture.lectureId} className="mt-2 border p-2 relative">
                    <button
                      type="button"
                      className="absolute top-5 right-4 text-red-500"
                      onClick={() => handleRemoveLecture(chapterIndex, lectureIndex)}
                    >
                      <X size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Lecture Title"
                      value={lecture.lectureTitle}
                      onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureTitle", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border p-2 w-full mb-2"
                    />
                    {errors[`lecture-${chapterIndex}-${lectureIndex}`] && <p className="text-red-500 text-sm">{errors[`lecture-${chapterIndex}-${lectureIndex}`]}</p>}

                    <input
                      type="text"
                      placeholder="Lecture URL"
                      value={lecture.lectureUrl}
                      onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureUrl", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border p-2 w-full mb-2"
                    />
                    {errors[`lectureUrl-${chapterIndex}-${lectureIndex}`] && <p className="text-red-500 text-sm">{errors[`lectureUrl-${chapterIndex}-${lectureIndex}`]}</p>}

                    <input
                      type="number"
                      placeholder="Lecture Duration (minutes)"
                      value={lecture.lectureDuration}
                      onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureDuration", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border p-2 w-full mb-2"
                    />
                    {errors[`lectureDuration-${chapterIndex}-${lectureIndex}`] && <p className="text-red-500 text-sm">{errors[`lectureDuration-${chapterIndex}-${lectureIndex}`]}</p>}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
  type="submit"
  disabled={adding}
  className={`p-2 mt-4 rounded w-full ${
    adding
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
  } text-white`}
>
  {adding ? "Adding" : "Add Course"}
</button>

      </form>
    </div>
  );
};

export default AddCourse;