import fs from "fs";
import { imagekit } from "../configs/imageKit.js";
import blog from "../models/blog.js";
import comment from "../models/comment.js";
import main from "../configs/gemini.js"
// import blog from "../models/blog.js";


export const addBlog = async (req, res) => {
  try {
    // ✅ Step 1: Parse blog data safely
    let parsedBlog;
    try {
      parsedBlog = JSON.parse(req.body.blog);
    } catch (err) {
        return res.json({
            success: false,
        message: "Invalid blog data format",
      });
    }

    const { title, subTitle, description,category,isPublished } = parsedBlog;
    
    console.log(req.body.blog)
    // ✅ Step 2: Validate required fields
    if (!title || !subTitle || !category || !description || ! isPublished === "undefined") {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ✅ Step 3: Validate image file
    const imageFile = req.file;
    if (!imageFile) {
      return res.json({
        success: false,
        message: "Image file is missing",
      });
    }

    // ✅ Step 4: Read and upload image
    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResult = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // ✅ Step 5: Generate optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: uploadResult.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // ✅ Step 6: Create blog entry in DB
    await blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    // ✅ Step 7: Respond with success
    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.error("Add blog error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllBlogs = async(req,res)=>{
     try {
      const blogs = await blog.find({isPublished:true})
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

export const getBlogsId = async(req,res)=>{
      try {
        const {blogid} = req.params
        const Blog = await blog.findById(blogid)

        if(!Blog){
        return res.json({
             success:false,
             message:"blog not found"
          })
        }
        res.json({success:true,Blog})
      } catch (error) {
        res.json({success:false,message:error.message})
      }
}

export const deleteByID = async(req,res)=>{
  try {
    const {id} = req.body
    const Blog = await blog.findByIdAndDelete(id)

    await comment.deleteMany({Blog:id})

    res.json({success:true,message:"blog deleted successfully"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const togglePublish = async(req,res)=>{
  try {
    const {id} = req.body
    const Blog = await blog.findById(id)
    Blog.isPublished = !Blog.isPublished
    await Blog.save()
    res.json({
      success:true,
      message:"Blog status updated"
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
}
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: blog, name, or content",
      });
    }

    const newComment = await comment.create({ blog, name, content });

    res.json({
      success: true,
      message: "Comment added for review",
      comment: newComment, // Send back comment if you want to use it in frontend
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while adding comment",
    });
  }
};

export const getBlogComment = async(req,res)=>{
   try {
      const {blogId} = req.body
      const comments = await comment.find({blog:blogId,isApproved:true}).sort({
        createdAt:-1
      })
      res.json({success:true,comments})
   } catch (error) {
    res.send({
      success:false,
      message:error.message
    })
   }
}
export const generateContent = async(req,res)=>{
    try {
      const {prompt} = req.body
     const content =  await main(prompt + 'generate a blog content for this topic in simple text format')
     res.json({
      success:true,
      content
     })
    } catch (error) {
      res.json({
        success:false,
        message:error.message
       })
    }
} 