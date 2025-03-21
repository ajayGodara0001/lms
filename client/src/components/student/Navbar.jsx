import React from 'react'
import { NavLink } from 'react-router-dom'
import { User } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import logo from "../../assets/logo.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
 const { isEducator, navigate,  backendUrl,  getToken, setIsEducator } = useContext(AppContext)

   const { user } = useUser()
   const { openSignIn } = useClerk()
  const isCourseListPage = location.pathname.includes("/courselist")


  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
  
      const token = await  getToken();
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        return;
      }
  
      const { data } = await axios.get(`${backendUrl}/api/educator/update-role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
    
  
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };
  
  
  return (
    <div className= {`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-200/70"}`}>
      
      <img src={logo} alt="logo_img" onClick={() => navigate("/")} className='w-12 cursor-pointer '  />
 
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex gap-3'>
         { user && 
         <>
            <button onClick={becomeEducator} className='cursor-pointer'> { isEducator ? "Educator Dashboard" : "Become Educator"}</button>
          
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
           <button onClick={becomeEducator} className='cursor-pointer'> { isEducator ? "Educator Dashboard" : "Become Educator"}</button>
           
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
