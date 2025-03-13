import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

import logo from "../../assets/logo.png"

const Navbar = () => {
    const navigate = useNavigate()
   const { user } = useUser()
   const { openSignIn } = useClerk()
  const isCourseListPage = location.pathname.includes("/courselist")
  return (
    <div className= {`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-200/70"}`}>
      
      <img src={logo} alt="logo_img" onClick={() => navigate("/")} className='w-12 cursor-pointer '  />
 
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex gap-3'>
         { user && 
         <>
           <button>Become Educator</button>
          <span>|</span>
          <NavLink to={"/myenrollments"}>My Enrollments </NavLink>
         </>}
        </div>
        {user ? <UserButton/> :<button onClick={() => openSignIn()} className='bg-blue-600 cursor-pointer rounded-full px-5 py-2 text-white'>
          Create Account
        </button>}
      </div>


      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>

      <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
      { user && 
         <>
           <button>Become Educator</button>
          <span>|</span>
          <NavLink to={"/myenrollments"}>My Enrollments </NavLink>
         </>}
        </div>
        {user ? <UserButton/> :<User onClick={() => openSignIn()} className='w-32 cursor-pointer'>
        
        </User>}
      </div>
    </div>
  )
}

export default Navbar
