import React from 'react'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import Navbar from './components/student/Navbar'
import AllCourses from './pages/student/AllCourses'
import Educator from './pages/educator/Educator'
import DetailCourse from './pages/student/DetailCourse'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourse from './pages/educator/MyCourse'
import StudentEnrolled from './pages/educator/StudentEnrolled'

const App = () => {
  const isEducatorRoute = useMatch("/educator/*")
  return (
    <div className='text-default bg-white min-h-screen'>
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allcourses' element={<AllCourses />} />
        <Route path='/course/:id' element={<DetailCourse />} />
        <Route path='/myenrollments' element={<MyEnrollments />} />
        <Route path='/player/:id' element={<Player />} />

        <Route path='/educator' element={<Educator />}>
  {/* Redirect `/educator` to `/educator/dashboard` */}
  <Route index element={<Navigate to="dashboard" />} />
  <Route path='dashboard' element={<Dashboard />} />
  <Route path='addcourse' element={<AddCourse />} />
  <Route path='mycourse' element={<MyCourse />} />
  <Route path='enrolledstudent' element={<StudentEnrolled />} />
</Route>
      </Routes>
    </div>
  )
}

export default App
