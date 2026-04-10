import User from "../Models/User.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier";
const userExists = async (email) => {
  return User.findOne({ email });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, bookings } = req.body;

    // validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (await userExists(email)) {
      return res.status(409).json({
        message: "User already Exists",
      });
    }

    // ✅ HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ CLOUDINARY UPLOAD START
    let imageUrl = "";

    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_pics" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }
    // ✅ CLOUDINARY UPLOAD END

    // ✅ CREATE USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePic: imageUrl,
      bookings,
      role: "customer",
    });

    await user.save();

    // ✅ TOKEN
    const payload = { id: user._id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong in the server!",
      error: e.message,
    });
  }
};

const loginUser = async (req, res) => {
  //getting email and password from reqbody
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the fields correctly" });
    }
    let user = await userExists(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    //comparing using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Enter Valid credentials!",
      });
    }
    //sending token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There has been a error!", error: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required!",
      });
    }

    // check if user already exists
    if (await userExists(email)) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin",
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating admin",
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
