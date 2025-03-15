import React, { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseTitle: "",
    courseDescription: "",
    coursePrice: "",
    discount: "",
    courseContent: []
  });

  const [visibleChapters, setVisibleChapters] = useState({});
  const [visibleLectures, setVisibleLectures] = useState({});

  const toggleChapterVisibility = (index) => {
    setVisibleChapters((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleLectureVisibility = (chapterIndex) => {
    setVisibleLectures((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChapter = () => {
    setCourse((prev) => ({
      ...prev,
      courseContent: [
        ...prev.courseContent,
        { chapterTitle: "", chapterContent: [] }
      ]
    }));
  };

  const handleRemoveChapter = (index) => {
    const updatedChapters = [...course.courseContent];
    updatedChapters.splice(index, 1);
    setCourse((prev) => ({ ...prev, courseContent: updatedChapters }));
  };

  const handleChapterChange = (index, value) => {
    const updatedChapters = [...course.courseContent];
    updatedChapters[index].chapterTitle = value;
    setCourse((prev) => ({ ...prev, courseContent: updatedChapters }));
  };

  const handleAddLecture = (chapterIndex) => {
    const updatedChapters = [...course.courseContent];
    updatedChapters[chapterIndex].chapterContent.push({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false
    });
    setCourse((prev) => ({ ...prev, courseContent: updatedChapters }));
  };

  const handleRemoveLecture = (chapterIndex, lectureIndex) => {
    const updatedChapters = [...course.courseContent];
    updatedChapters[chapterIndex].chapterContent.splice(lectureIndex, 1);
    setCourse((prev) => ({ ...prev, courseContent: updatedChapters }));
  };

  const handleLectureChange = (chapterIndex, lectureIndex, name, value) => {
    const updatedChapters = [...course.courseContent];
    updatedChapters[chapterIndex].chapterContent[lectureIndex][name] = value;
    setCourse((prev) => ({ ...prev, courseContent: updatedChapters }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="courseTitle" placeholder="Course Title" value={course.courseTitle} onChange={handleChange} className="border p-2 w-full mb-2" />
        <textarea name="courseDescription" placeholder="Course Description" value={course.courseDescription} onChange={handleChange} className="border p-2 w-full mb-2 h-40" />
        <input type="number" name="coursePrice" placeholder="Price" value={course.coursePrice} onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="number" name="discount" placeholder="Discount (%)" value={course.discount} onChange={handleChange} className="border p-2 w-full mb-4" />
        <button type="button" onClick={handleAddChapter} className="bg-blue-500 text-white p-2 rounded">Add Chapter</button>
        {course.courseContent.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mt-4 border p-4 relative">
            <button className="absolute top-7  cursor-pointer right-6 text-red-500" onClick={() => handleRemoveChapter(chapterIndex)}><X size={20} /></button>
            <div className="flex items-center cursor-pointer" onClick={() => toggleChapterVisibility(chapterIndex)}>
              {visibleChapters[chapterIndex] ? <ChevronDown /> : <ChevronRight />}
              <input type="text" placeholder="Chapter Title" value={chapter.chapterTitle} onChange={(e) => handleChapterChange(chapterIndex, e.target.value)} className="border p-2 w-full mb-2 ml-2" />
            </div>
            {visibleChapters[chapterIndex] && (
              <>
                <button type="button" onClick={() => handleAddLecture(chapterIndex)} className="bg-green-500 text-white p-2 rounded mt-2">Add Lecture</button>
                {chapter.chapterContent.length > 0 && (
                  <div className="mt-2 cursor-pointer flex items-center" onClick={() => toggleLectureVisibility(chapterIndex)}>
                    {visibleLectures[chapterIndex] ? <ChevronDown /> : <ChevronRight />} <span className="ml-2">Show Lectures</span>
                  </div>
                )}
                {visibleLectures[chapterIndex] && chapter.chapterContent.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="mt-2 border p-2 relative">
                    <button className="absolute top-5 cursor-pointer right-4 text-red-500" onClick={() => handleRemoveLecture(chapterIndex, lectureIndex)}><X size={20} /></button>
                    <input type="text" placeholder="Lecture Title" value={lecture.lectureTitle} onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureTitle", e.target.value)} className="border p-2 w-full mb-2" />
                    <input type="number" placeholder="Duration (minutes)" value={lecture.lectureDuration} onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureDuration", e.target.value)} className="border p-2 w-full mb-2" />
                    <input type="text" placeholder="Lecture URL" value={lecture.lectureUrl} onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "lectureUrl", e.target.value)} className="border p-2 w-full mb-2" />
                    <label className="flex items-center">
                      <input type="checkbox" checked={lecture.isPreviewFree} onChange={(e) => handleLectureChange(chapterIndex, lectureIndex, "isPreviewFree", e.target.checked)} className="mr-2" /> Free Preview
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white p-2 mt-4 rounded w-full">Submit Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
