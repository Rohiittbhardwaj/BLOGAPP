import React from 'react'
import { assets } from '../assets/QuickBlog-Assets/QuickBlog-Assets/assets'
// import { useNavigate } from 'react-router-dom'
import { useAppContext } from "../context/Appcontext"

const Navbar = () => {
 
 const {navigate,token} = useAppContext()
  
  return (
    <div className='flex justify-between items-center my-5 mx-8 sm:mx-20 xl:mx-32 '>
     <img onClick={()=>{navigate("/")}} src={assets.logo} alt="logo" className='w-32 sm:w-44' />
     <button onClick={()=>{navigate("/admin")}}  className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token?"dashboard":"login"}
        <img src={assets.arrow} className='w-3' alt="arrow" />
     </button>
    </div>
  )
}

export default Navbar