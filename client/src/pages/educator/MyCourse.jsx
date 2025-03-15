import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const MyCourse = () => {
    const [course, setCourse] = useState(null);
    const { allcourse } = useContext(AppContext);

    const fetchCourse = () => {
        setCourse(allcourse);
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h1 className="text-2xl font-bold mb-4">My Course</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="p-4">All Courses</th>
                        <th className="p-4">Earning</th>
                        <th className="p-4">Students</th>
                        <th className="p-4">Published On</th>
                    </tr>
                </thead>
                <tbody>
                    {course?.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-3">
                                <img src={item.image} alt="" className="w-10 h-10 rounded-full shadow-md" />
                                <span className="text-gray-800">{item.title}</span>
                            </td>
                            <td className="p-4">
                                ${Math.floor(item.enrolledStudents.length * (item.price - (item.discount * item.price) / 100))}
                            </td>
                            <td className="p-4">{item.enrolledStudents.length}</td>
                            <td className="p-4">
                                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyCourse;