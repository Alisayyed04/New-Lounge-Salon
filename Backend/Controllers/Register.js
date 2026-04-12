// REGISTER CONTROLLER (Controllers/RegisterUser.js)
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, bookings } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields required!", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    throw new AppError("Invalid phone number", 400);
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError("User already exists", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let imageUrl = "";

  if (req.file) {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    imageUrl = result.secure_url;
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    profilePic: imageUrl,
    bookings,
    role: "customer",
  });

  const payload = { id: user._id, email: user.email, role: user.role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user,
  });
});
