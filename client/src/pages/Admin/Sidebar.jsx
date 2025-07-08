import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/QuickBlog-Assets/QuickBlog-Assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h0full pt-6'>
        <NavLink end={true} to="/admin" className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.home_icon} alt="" className='min-w-4 w-5' />
            <p className='hidden md:inline-block'>DashBoard</p>
        </NavLink>
        <NavLink  to="/admin/addblog" className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.add_icon} alt="" className='min-w-4 w-5' />
            <p className='hidden md:inline-block'>Add Blog</p>
        </NavLink>
        <NavLink  to="/admin/listblog" className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.list_icon} alt="" className='min-w-4 w-5' />
            <p className='hidden md:inline-block'>List Blog</p>
        </NavLink>
        <NavLink  to="/admin/comment" className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.comment_icon} alt="" className='min-w-4 w-5' />
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
  )
}

export default Sidebar