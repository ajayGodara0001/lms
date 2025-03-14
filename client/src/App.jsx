import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import Navbar from './components/student/Navbar'
import AllCourses from './pages/student/AllCourses'
import Educator from './pages/educator/Educator'

const App = () => {
  const isEducatorRoute = useMatch("/educator/*") 
  return (
    <div className='text-default bg-white min-h-screen'>
  {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/allcourses' element={<AllCourses />}/>
        <Route path='/course/:id' element={<course />}/>
        <Route path='/educator' element={<Educator />}>
         
        </Route>
      </Routes>
    </div>
  )
}

export default App
