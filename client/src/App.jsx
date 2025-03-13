import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import Navbar from './components/student/Navbar'

const App = () => {
  const isEducatorRoute = useMatch("/eductor/*") 
  return (
    <div className='text-default bg-white min-h-screen'>
  {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
