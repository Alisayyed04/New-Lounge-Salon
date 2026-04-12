// CREATE ADMIN CONTROLLER (Controllers/CreateAdmin.js)
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields required!", 400);
  }

  const exists = await User.findOne({ email });

  if (exists) {
    throw new AppError("User already exists", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: "admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});
