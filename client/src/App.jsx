import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Commect from './pages/Admin/Commect'
import LogIn from './pages/Admin/LogIn'
import "quill/dist/quill.snow.css" 
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/Appcontext'

const App = () => {
  const {token} = useAppContext()
  return (
  <div>
    <Toaster/>
    <Routes>
      <Route path="/" element ={<Home/>} />
      <Route path="/blog/:id" element ={<Blog/>} />
      <Route path='/admin' element={token?<Layout/>:<LogIn/>} >
         <Route index element={<Dashboard/>} />
         <Route path='addblog' element={<AddBlog/>} />
         <Route path='listblog' element={<ListBlog/>} />
         <Route path='comment' element={<Commect/>} />
      </Route>
    </Routes>
  </div>
  )
}

export default App