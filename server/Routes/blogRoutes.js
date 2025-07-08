import express from "express"
import { addBlog, addComment, deleteByID, generateContent, getAllBlogs, getBlogComment, getBlogsId, togglePublish } from "../Controllers/blogController.js"
import upload from "../Middlewares/multer.js"
import auth from "../Middlewares/auth.js"

const BlogRouter = express.Router()

BlogRouter.post("/add",auth ,upload.single("image"), addBlog)
BlogRouter.get("/all",getAllBlogs)
BlogRouter.get("/:blogid",getBlogsId)
BlogRouter.post("/delete",auth, deleteByID)
BlogRouter.post("/toggle-publish",auth, togglePublish)

BlogRouter.post("/add-comment",addComment)
BlogRouter.post("/comments",getBlogComment)

BlogRouter.post("/generate",auth,generateContent)
export default BlogRouter