import jwt from "jsonwebtoken";
import blog from "../models/blog.js";
import comment from "../models/comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    // Check if credentials are incorrect
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { email }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "1h" } // optional: set expiry
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: true,
      message: "Something went wrong: " + error.message,
    });
  }
};

export const getAllBlogAdmin = async(req,res)=>{
  try {
    const blogs = await blog.find({}).sort({createdAt:-1})
    res.json({
      success:true,
      blogs
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
}
export const getAllComments = async(req,res)=>{
    try {
      const comments = await comment.find({}).populate("blog").sort({createdAt:-1})
      res.json({success:true,comments})
    } catch (error) {
      res.json({
        success:false,
        message:error.message
      })
    }
}

export const getDashboard = async(req,res)=>{
    try {
      const recentBlogs = await blog.find({}).sort({createdAt:-1}).limit(5)
      const blogs = await blog.countDocuments()
      const comments = await comment.countDocuments()
      const drafts = await blog.countDocuments({isPublished:false})


      const Dashboarddata = {
        blogs,recentBlogs,comments,drafts
      }
      res.json({
        success:true,
        Dashboarddata
      })
    } catch (error) {
      res.json({
        success:false,
        message:error.message
      })
    }
}
export const deleteCommentById = async(req,res)=>{
  try {
    const {id} = req.body
    await comment.findByIdAndDelete(id)
    res.json({
      success:true,
      message:'comment delete successfully'
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
}
export const ApprovedCommentById = async(req,res)=>{
  try {
    const {id} = req.body
    await comment.findByIdAndUpdate(id,{isApproved:true}).populate("blog")
    res.json({
      success:true,
      message:'comment approved successfully'
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
}