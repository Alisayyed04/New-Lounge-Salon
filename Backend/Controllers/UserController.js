import User from "../Models/User.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userExists = async (email) => {
  return User.findOne({ email });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, profilePic, bookings } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    if (await userExists(email)) {
      return res.status(409).json({
        message: "User already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePic: req.file?.path || null,
      bookings,
    });

    await user.save();
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong in the server!",
      error: e.message,
    });
  }
};

const loginUser = async (req, res) => {
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Enter Valid credentials!",
      });
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There has been a error!", error: error.message });
  }
};

export { registerUser, loginUser };
