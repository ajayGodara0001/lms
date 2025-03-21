import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { ArrowBigDown, ArrowBigRight } from 'lucide-react';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
    const { id } = useParams();
    const { enrolledCourse, noOfLecture, totalTimeOfChapter, lecTime } = useContext(AppContext);

    const [course, setCourse] = useState(null);
    const [player, setPlayer] = useState(null);
    const [lecture, setLecture] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [mark, setMark] = useState("Mark Complete");
    const [openChapters, setOpenChapters] = useState({});

    useEffect(() => {
        setCourse(enrolledCourse.find((c) => c._id === (id)));
    }, [id, enrolledCourse]);
  

    const toggleChapter = (index) => {
        setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const markComplete = () => {
        if(mark == "Mark Complete" ){
            setMark("Completed")
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8">
                {/* Left: Course Structure */}
                <div className="w-full  md:w-1/2 lg:w-2/3">
                    <h1 className="text-xl font-semibold mb-4">Course Structure</h1>
                    {course?.courseContent?.map((chapter, index) => (
                        <div key={index} className="mb-4 border border-gray-300 rounded-lg p-4">
                            {/* Chapter Title & Toggle Button */}
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleChapter(index)}>
                                <div className="flex items-center gap-2">
                                    {openChapters[index] ? <ArrowBigDown size={24} /> : <ArrowBigRight size={24} />}
                                    <h2 className="text-lg font-semibold">{chapter?.chapterTitle}</h2>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <p><strong>Lectures:</strong> {noOfLecture(chapter.chapterContent || [])}</p>
                                    {/* <p><strong>Duration:</strong> {totalTimeOfChapter(chapter.chapterContent)}</p> */}
                                    <p><strong>Duration:</strong> {" 12 fix it "}</p>
                                </div>
                            </div>

                            {/* Chapter Details */}
                            {openChapters[index] && (
                                <div className="mt-3">
                                    {/* Lectures List */}
                                    <div className="mt-2 space-y-2">
                                        {chapter?.chapterContent?.map((lec, i) => (
                                            <div key={i} className="p-3 bg-gray-100 flex items-center justify-between rounded-md">
                                                <h3 className="font-medium">{lec.lectureTitle}</h3>
                                                <div className="flex gap-5 text-sm">
                                                    <p
                                                        onClick={() => {
                                                            setPlayer({ videoid: lec.lectureUrl });
                                                            setLecture(lec);
                                                            setChapter(chapter);
                                                        }}
                                                        className="text-blue-500 hover:cursor-pointer hover:underline"
                                                    >
                                                        Watch
                                                    </p>
                                                    {/* <p className="text-gray-600">{lecTime(lec)}</p> */}
                                                    <p className="text-gray-600">{"12 fix it"}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mt-6 p-4 rounded-lg ">
                        <h1 className="text-sm font-semibold mb-2">Rate This Course</h1>
                        <Rating initialRating={0} />
                    </div>
                </div>

                {/* Right: Video Player */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
                    {player ? (
                        <>
                            <YouTube
                                videoId={player.videoid}
                                iframeClassName="w-full aspect-video rounded-lg shadow-md"
                                opts={{ playerVars: { autoplay: 1 } }}
                            />
                            <div className="w-full mt-4 p-3 bg-gray-50 rounded-md shadow-md text-center">
                                <p className="text-lg font-semibold">
                                    {chapter?.chapterOrder}.{lecture?.lectureOrder } | {lecture?.lectureTitle
                                    }
                                </p>
                            </div>
                            <button onClick={markComplete} className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">
                               {mark}
                            </button>
                        </>
                    ) : (
                        <img
                            src={course?.courseThumbnail}
                            alt="Course"
                            className="w-full rounded-lg shadow-lg"
                        />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Player;
