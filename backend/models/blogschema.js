import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }],
  reports: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      reason: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  isVisible: { type: Boolean, default: true },
  isReported: { type: Boolean, default: false },
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  deletedAt: { type: Date, default: null }, 
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

const Blog = mongoose.model('blog', blogSchema);
export default Blog;