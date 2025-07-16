import dotenv from 'dotenv';
import User from '../models/userschema.js';
dotenv.config();
export const initAdminOnStart = async () => {
  try {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }
    const newAdmin = new User({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD, 
      role: 'admin',
    });
    await newAdmin.save(); 
    console.log('Admin user created successfully on startup!');
  } catch (error) {
    console.error('Error creating admin on startup:', error.message);
  }
};
