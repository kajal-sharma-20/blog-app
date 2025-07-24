import blog from '../models/blogschema.js';
import user from '../models/userschema.js';
import mongoose from 'mongoose';
export const createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file)  
    const newBlog = new blog({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.path,
      author:req.body.author  
    });

    await newBlog.save();
    return res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong!', error: err });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blog.find({ 
      isVisible: true, 
      deletedAt: null 
    }).populate("author", "username")
    .populate("likes", "username"); 
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: err });
  }
};
export const likeBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please login to like." });
  }
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blogId format" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  try {
    const foundBlog = await blog.findById(blogId).populate("author", "username");
    if (!foundBlog || !foundBlog.isVisible) {
      return res.status(404).json({ message: "Blog not found or not visible" });
    }

    const hasLiked = foundBlog.likes.includes(userId);
    const hasDisliked = foundBlog.dislikes.includes(userId);

    if (hasLiked) {
      // Unlike: Remove like
      foundBlog.likes = foundBlog.likes.filter((id) => id.toString() !== userId);
      await foundBlog.save();
      return res.status(200).json({
        message: "Blog unliked successfully!",
        totalLikes: foundBlog.likes.length,
        totalDislikes: foundBlog.dislikes.length,
        blog: foundBlog,
      });
    }

    // Like: Add like, remove dislike if exists
    if (hasDisliked) {
      foundBlog.dislikes = foundBlog.dislikes.filter((id) => id.toString() !== userId);
    }
    foundBlog.likes.push(userId);
    await foundBlog.save();

    res.status(200).json({
      message: "Blog liked successfully!",
      totalLikes: foundBlog.likes.length,
      totalDislikes: foundBlog.dislikes.length,
      blog: foundBlog,
    });
  } catch (error) {
    console.error("Like blog error:", {
      message: error.message,
      stack: error.stack,
      blogId,
      userId,
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const dislikeBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required in request body" });
  }
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blogId format" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  try {
    const foundBlog = await blog.findById(blogId).populate("author", "username");
    if (!foundBlog || !foundBlog.isVisible) {
      return res.status(404).json({ message: "Blog not found or not visible" });
    }

    const hasDisliked = foundBlog.dislikes.includes(userId);
    const hasLiked = foundBlog.likes.includes(userId);

    if (hasDisliked) {
      // Undislike: Remove dislike
      foundBlog.dislikes = foundBlog.dislikes.filter((id) => id.toString() !== userId);
      await foundBlog.save();
      return res.status(200).json({
        message: "Blog undisliked successfully!",
        totalDislikes: foundBlog.dislikes.length,
        totalLikes: foundBlog.likes.length,
        blog: foundBlog,
      });
    }

    // Dislike: Add dislike, remove like if exists
    if (hasLiked) {
      foundBlog.likes = foundBlog.likes.filter((id) => id.toString() !== userId);
    }
    foundBlog.dislikes.push(userId);
    await foundBlog.save();

    res.status(200).json({
      message: "Blog disliked successfully!",
      totalDislikes: foundBlog.dislikes.length,
      totalLikes: foundBlog.likes.length,
      blog: foundBlog,
    });
  } catch (error) {
    console.error("Dislike blog error:", {
      message: error.message,
      stack: error.stack,
      blogId,
      userId,
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const Blog = await blog.findById(blogId).populate("author", "username instagram youtube facebook");

    if (!Blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(Blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateBlog = async (req, res) => {
  const { id } = req.params; 
  const { title, description, category, userId } = req.body; 
  const thumbnail = req.file ? req.file.path : null; 
  try {
    // 1. Find the blog
    const Blog = await blog.findById(id);
    if (!Blog) return res.status(404).json({ message: "Blog not found" });

    // 2. Check if the current user is the blog author
    if (Blog.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to edit this blog" });
    }

    // 3. Update the blog fields
  Blog.title = title ||Blog.title;
  Blog.description = description ||Blog.description;
  Blog.category = category ||Blog.category;
  if (thumbnail) Blog.thumbnail = thumbnail;

    // 4. Save the updated blog
    const updatedBlog = await Blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      Blog: updatedBlog,
    });
   

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export const deleteBlog = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body; 

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // 1. Find the blog
    const Blog = await blog.findById(id);
    if (!Blog) return res.status(404).json({ message: "Blog not found" });

    // 2. Check if the user is the author
    if (Blog.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to delete this blog" });
    }

    // 3. Soft delete the blog by setting deletedAt and deletedBy
    Blog.deletedAt = Date.now();
    Blog.deletedBy = userId; 
    await Blog.save();

    res.status(200).json({ message: "Blog moved to trash successfully" });
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const reportBlog = async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const blogId = req.params.blogId;

    // Validate inputs
    if (!userId || !reason) {
      return res.status(400).json({ message: "User ID and reason are required" });
    }
  
    const userExists = await user.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if blog exists
    const Blog = await blog.findById(blogId);
    if (!Blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check for duplicate report
    const alreadyReported = Blog.reports.some(
      (report) => report.userId.toString() === userId
    );
    if (alreadyReported) {
      return res.status(400).json({ message: "You have already reported this blog" });
    }

    // Add report to blog
    Blog.reports.push({
      userId,
      reason,
      createdAt: new Date(),
    });
     // If reports are 3 or more, hide blog from frontend
     if (Blog.reports.length >= 3) {
      Blog.isVisible = false;
      Blog.isReported = true;
    }

    await Blog.save();
    return res.status(200).json({ message: "Blog reported successfully", Blog });
  } catch (error) {
    console.error("Report blog error:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
      blogId: req.params.blogId,
    });
    return res.status(500).json({ message: "Server error reporting blog" });
  }
};

// Get trashed blogs for a specific user
export const getTrashedBlogs = async (req, res) => {
  const { userId } = req.params; 

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const trashedBlogs = await blog.find({
      author: userId,
      deletedAt: { $ne: null },
      deletedBy: userId, 
    }).populate("author", "username");

    res.status(200).json({ blogs: trashedBlogs });
  } catch (error) {
    console.error("Error in getTrashedBlogs:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const restoreBlog = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body; 

  try {
    const Blog = await blog.findById(id);
    if (!Blog) return res.status(404).json({ message: "Blog not found" });


    if (!Blog.deletedAt) {
      return res.status(400).json({ message: "Blog is not in trash" });
    }

    // 3. Check if the user is the author
    if (Blog.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to restore this blog" });
    }

    // 4. Restore the blog by unsetting deletedAt
    Blog.deletedAt = null;
    await Blog.save();

    res.status(200).json({ message: "Blog restored successfully" });
  } catch (error) {
    console.error("Error in restoreBlog:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

//admin logics

export const getReportedBlogs = async (req, res) => {
  try {
    const reportedBlogs = await blog
      .find({ isReported: true })
      .populate({
        path: "author",
        select: "username",
        match: { username: { $exists: true, $ne: null } }, // Only valid users
      });
    const filteredBlogs = reportedBlogs.filter(blog => blog.author); // Exclude null authors
    console.log("Populated reported blogs:", filteredBlogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      isReported: blog.isReported,
    })));
    res.status(200).json({ blogs: filteredBlogs });
  } catch (err) {
    console.error("Error fetching reported blogs:", {
      message: err.message,
      stack: err.stack,
    });
    res.status(500).json({ message: "Error fetching reported blogs", error: err });
  }
};
export const denyReport = async (req, res) => {
  const { blogId } = req.params;
  try {
    const Blog = await blog.findById(blogId);
    Blog.isVisible = true;
    Blog.isReported = false;
    Blog.reports = [];
    await Blog.save();
    res.status(200).json({ message: "Blog report denied and restored to frontend" });
  } catch (err) {
    res.status(500).json({ message: "Error denying report", error: err });
  }
};
export const adminDeleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const { adminId } = req.body; 

  try {
    // Validate adminId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid adminId format" });
    }

    // 1. Find the blog
    const Blog = await blog.findById(blogId);
    if (!Blog) return res.status(404).json({ message: "Blog not found" });

    // 2. Soft delete the blog by setting deletedAt and deletedBy
    Blog.deletedAt = Date.now();
    Blog.deletedBy = adminId; // Set the admin who deleted the blog
    await Blog.save();

    res.status(200).json({ message: "Blog moved to trash by admin successfully" });
  } catch (error) {
    console.error("Error in adminDeleteBlog:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
export const getAll = async (req, res) => {
  try {
    const blogs = await blog.find({deletedAt: null}).populate("author", "username")
    .populate("likes", "username"); // Optional to show who liked
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: err });
  }
};


export const getAllTrashedBlogs = async (req, res) => {
  const { adminId } = req.query; 

  try {
    // Validate adminId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid adminId format" });
    }

 
    const trashedBlogs = await blog
      .find({
        deletedAt: { $ne: null },
        deletedBy: adminId, 
      })
      .populate("author", "username");

    res.status(200).json({ blogs: trashedBlogs });
  } catch (error) {
    console.error("Error in getAllTrashedBlogs:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
export const adminRestoreBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    // 1. Find the blog
    const Blog = await blog.findById(blogId);
    if (!Blog) return res.status(404).json({ message: "Blog not found" });

    // 2. Check if the blog is in trash
    if (!Blog.deletedAt) {
      return res.status(400).json({ message: "Blog is not in trash" });
    }

    // 3. Restore the blog by unsetting deletedAt
    Blog.deletedAt = null;
    await Blog.save();

    res.status(200).json({ message: "Blog restored by admin successfully" });
  } catch (error) {
    console.error("Error in adminRestoreBlog:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};