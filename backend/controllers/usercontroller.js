import user from '../models/userschema.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Signup Controller
export const signup = async (req, res) => {
  const { username, email, phone, password } = req.body;

  // Check for missing required fields
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ message: 'Username, email, phone, and password are required!' });
  }

  // Validate username
  if (!/^[A-Za-z0-9\s_-]{3,50}$/.test(username)) {
    return res.status(400).json({
      message: 'Username must be 3-50 characters and can only contain letters, numbers, spaces, underscores, or hyphens',
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address (e.g., user@example.com)' });
  }

  // Validate phone
  if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
    return res.status(400).json({
      message: 'Please provide a valid phone number (e.g., +1234567890)',
    });
  }

  // Validate password
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  ) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
  }

  try {
    // Check if the email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use!' });
    }

    // Create a new user
    const newUser = new user({
      username,
      email: email.toLowerCase(),
      phone,
      password, 
      role: 'user', 
    });

    const savedUser = await newUser.save(); 

    // Return a success response
    res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!', error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { emailOrphone, password } = req.body;

  try {
    // Find user by email OR phone
    const User = await user.findOne({
      $or: [
        { email: emailOrphone },
        { phone: emailOrphone }
      ]
    });

    if (!User) {
      console.log("User not found!");
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User found: ", User);

    // Compare password
    const isMatch = await bcrypt.compare(password, User.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      console.log("Password mismatch!");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("Password matched successfully!");
    console.log(User._id)
    // Send response based on role
    const response = {
      message: User.role === 'admin' ? 'Admin login successful' : 'User login successful',
      role: User.role,
      user: {
        username: User.username,
        email: User.email,
        phone: User.phone,
        id: User._id
      }
    };

    return res.status(200).json(response);

  } catch (err) {
    console.error('Error during login: ', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; 

    const userDetails = await user.findById(id).select("-password");

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details (including role and timestamps)
    return res.status(200).json({
      id: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
      phone: userDetails.phone,
      role: userDetails.role,
      createdAt: userDetails.createdAt,
      updatedAt: userDetails.updatedAt,
      instagram: userDetails.instagram || '' ,
      youtube: userDetails.youtube || '' ,
      facebook: userDetails.facebook || ''
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User by ID
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, password, instagram, youtube, facebook } = req.body;

    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate username if provided
    if (username && username.trim()) {
      const usernameRegex = /^[A-Za-z0-9\s_-]{3,50}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message: "Username must be 3-50 characters and can only contain letters, numbers, spaces, underscores, or hyphens",
        });
      }
      existingUser.username = username;
    }

    // Validate email if provided
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      const emailExists = await user.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      existingUser.email = email;
    }

    // Validate phone if provided
    if (phone && phone.trim()) {
      const phoneRegex = /^\+91[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message: "Phone number must be a valid Indian number starting with +91",
        });
      }
      const phoneExists = await user.findOne({ phone, _id: { $ne: id } });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
      existingUser.phone = phone;
    }

    // Validate and hash password if provided
    if (password && password.trim()) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
      }
      // Password will be hashed by pre-save hook
      existingUser.password = password;
    }

    // Update social media links
    existingUser.instagram = instagram && instagram.trim() ? instagram : null;
    existingUser.youtube = youtube && youtube.trim() ? youtube : null;
    existingUser.facebook = facebook && facebook.trim() ? facebook : null;

    // Save the updated user
    const updatedUser = await existingUser.save();

    // Return updated user details
    const userResponse = {
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      instagram: updatedUser.instagram || "",
      youtube: updatedUser.youtube || "",
      facebook: updatedUser.facebook || "",
    };

    return res.status(200).json({
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};