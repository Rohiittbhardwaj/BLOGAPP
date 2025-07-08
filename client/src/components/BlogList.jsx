import React, { useState } from "react";
import {
  blog_data,
  blogCategories,
} from "../assets/QuickBlog-Assets/QuickBlog-Assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/Appcontext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blog,input} = useAppContext()
  
  const filteredBlogs = ()=>{
    if(input === ""){
      return blog
    }
    return blog.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase())|| blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <div className="flex justify-center  gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative cursor-pointer rounded-lg px-6 py-3 text-gray-500 font-medium ${
                menu === item
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "hover:bg-gray-900 hover:shadow-md"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 h-full w-full rounded-lg bg-primary opacity-25"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filteredBlogs().filter((blog) => (menu === "All" ? true : blog.category === menu)).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
