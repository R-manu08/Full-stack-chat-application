// TEMPORARY: Add sample users for testing
export const addSampleUsers = async (req, res) => {
  const samples = [
    { fullName: "Alice Example", email: "alice@example.com", password: "alice123" },
    { fullName: "Bob Example", email: "bob@example.com", password: "bob12345" },
    { fullName: "Charlie Example", email: "charlie@example.com", password: "charlie789" }
  ];
  try {
    const bcrypt = (await import('bcryptjs')).default;
    for (const user of samples) {
      const exists = await User.findOne({ email: user.email });
      if (!exists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await User.create({
          fullName: user.fullName,
          email: user.email,
          password: hashedPassword,
        });
      }
    }
    res.status(201).json({ message: "Sample users added", users: samples.map(u => ({ email: u.email, password: u.password })) });
  } catch (error) {
    res.status(500).json({ message: "Error adding sample users", error: error.message });
  }
};
// TEMPORARY: Count registered user emails
export const countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting users" });
  }
};
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import os from "os";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    let uploadResponse;
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name") {
      console.warn("Cloudinary not configured. Skipping image upload.");
      return res.status(400).json({ message: "Image upload is currently unavailable (Cloudinary not configured)." });
    }

    uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNetworkIp = (req, res) => {
  try {
    const interfaces = os.networkInterfaces();
    let networkIp = "localhost";
    let candidateIps = [];

    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          candidateIps.push(iface.address);
        }
      }
    }

    // Prioritize 192.168. (Standard home WiFi)
    networkIp = candidateIps.find(ip => ip.startsWith("192.168.")) || 
                candidateIps.find(ip => ip.startsWith("10.")) ||
                candidateIps[0] || 
                "localhost";

    res.status(200).json({ ip: networkIp });
  } catch (error) {
    console.error("Error getting network IP:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
