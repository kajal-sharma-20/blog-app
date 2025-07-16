import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
      match: [
        /^[A-Za-z0-9\s_-]{3,50}$/,
        'Username must contain only letters, numbers, spaces, underscores, or hyphens',
      ],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email address (e.g., user@example.com)',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true, 
      trim: true,
      match: [
        /^\+[1-9]\d{1,14}$/,
        'Please provide a valid phone number with + prefix (e.g., +1234567890)',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    instagram: {
      type: String,
      trim: true,
      match: [
        /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/,
        'Please provide a valid Instagram URL (e.g., https://www.instagram.com/username)',
      ],
      default: null,
    },
    youtube: {
      type: String,
      trim: true,
      match: [
        /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]+|user\/[A-Za-z0-9_-]+|[A-Za-z0-9_-]+)\/?$/,
        'Please provide a valid YouTube URL (e.g., https://www.youtube.com/channel/UC...)',
      ],
      default: null,
    },
    facebook: {
      type: String,
      trim: true,
      match: [
        /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/,
        'Please provide a valid Facebook URL (e.g., https://www.facebook.com/username)',
      ],
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    updatedAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model('user', userSchema);
export default User;