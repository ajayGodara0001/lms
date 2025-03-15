import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentEnrolled = () => {
    const [enrolledStudent, setEnrolledStudent] = useState(null);

    const fetchEnrolledStudent = () => {
        setEnrolledStudent(dummyStudentEnrolled);
    };

    useEffect(() => {
        fetchEnrolledStudent();
    }, []);

    const formatDateToIST = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return enrolledStudent ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="p-4">#</th>
                        <th className="p-4">Student Name</th>
                        <th className="p-4">Course Title</th>
                        <th className="p-4">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledStudent.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4 flex items-center gap-3">
                                <img src={item.student.imageUrl} alt="" className="w-10 h-10 rounded-full shadow-md" />
                                <span className="text-gray-800">{item.student.name}</span>
                            </td>
                            <td className="p-4">{item.courseTitle}</td>
                            <td className="p-4">{formatDateToIST(item.purchaseDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <Loading />
    );
};

export default StudentEnrolled;
