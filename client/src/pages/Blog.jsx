import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  blog_data,
  comments_data,
} from "../assets/QuickBlog-Assets/QuickBlog-Assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comment, setcomment] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      console.log("faild");
      data.success ? setData(data.Blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchcommect = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      if (data.success) {
        setcomment(data.comments);
      } else {
        toast.error(data.message, "hello");
      }
    } catch (error) {
      toast.error(error.message, "he");
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blog:id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchcommect()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogData();
    fetchcommect();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-100"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h1 className="my-5 max-w-lg truncate mx-auto ">{data.subTitle}</h1>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          MICHEAL BROWN
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        <div className="mt-14 mb-10 max-w-3xl mx-auto"></div>
        <p className="font-semibold mb-4">Commects ({comment.length})</p>
        <div className="flex flex-col gap-4">
          {comment.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} className="w-6" alt="" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="textsm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-4 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <p className="font-semibold mb-4"> Add your comment</p>
        <form
          onSubmit={addComment}
          
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <textarea
            className="
 resize-none w-full p-2 border border-gray-300 rounded outline-none h-48"
 onChange={(e) => setContent(e.target.value)}
            required
            value={content}
            placeholder="Comment"
          ></textarea>
          <button
            type="submit"
            className="bg-primary mb-5 text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="my-24 max-w-5xl mx-auto">
        <p className="font-semibold my-4">Share this artical on social media</p>
        <div className="flex">
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
