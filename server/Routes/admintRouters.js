import express from "express"
import  {adminLogin, ApprovedCommentById, deleteCommentById, getAllBlogAdmin, getAllComments, getDashboard } from "../Controllers/adminController.js";
import auth from "../Middlewares/auth.js";


const admintRouter = express.Router();

admintRouter.post("/login",adminLogin)
admintRouter.get("/comments", auth, getAllComments)
admintRouter.get("/blogs",auth,getAllBlogAdmin)
admintRouter.post("/delete-comment",auth,deleteCommentById)
admintRouter.post("/approve-comment",auth,ApprovedCommentById)
admintRouter.get("/dashboard",auth,getDashboard)


export default admintRouter