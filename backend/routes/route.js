import express from "express";
import {getUserById, login,  signup, updateUserById} from "../controllers/usercontroller.js";
import { adminDeleteBlog, adminRestoreBlog, createBlog, deleteBlog, denyReport, dislikeBlog, getAll, getAllBlogs, getAllTrashedBlogs, getBlogById, getReportedBlogs, getTrashedBlogs, likeBlog,  reportBlog,  restoreBlog,  updateBlog} from "../controllers/blogcontroller.js";
import upload from "../middleware/multer.js";
const route=express.Router();
route.post("/signup",signup)
route.post("/login",login)
route.post("/createblog", upload.single("thumbnail"), createBlog);
route.get('/allblogs', getAllBlogs);
route.post("/likeblog/:blogId", likeBlog);
route.get("/blog/:id", getBlogById);
route.put('/blog/:id',upload.single('thumbnail'), updateBlog);
route.delete("/blog/:id", deleteBlog);
route.get('/user/:id', getUserById); 
route.put('/update/:id', updateUserById);
route.post("/report/:blogId",reportBlog)
route.get("/trash/:userId", getTrashedBlogs); 
route.post("/dislikeblog/:blogId",dislikeBlog)
route.put("/restore/:id", restoreBlog);

//admin routes
route.patch("/denyreport/:blogId", denyReport);
route.get("/reportblogs", getReportedBlogs);
route.delete("/admindelblog/:blogId", adminDeleteBlog);
route.get("/admintrash", getAllTrashedBlogs); 
route.put("/adminrestore/:blogId",adminRestoreBlog);
route.get("/bloglist",getAll)

export default route