import User from "../Models/User.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userExists = async (email) => {
  return User.findOne({ email });
};

//Registering user
const registerUser = async (req, res) => {
  try {
    //deconstructing the req.body to get all the fields
    const { name, email, password, phone, address, profilePic, bookings } =
      req.body;
    //checking if name email and password are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    //send callback to userExists function
    if (await userExists(email)) {
      return res.status(409).json({
        message: "User already Exists",
      });
    }
    //using bcrypt to create a stonger password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePic: req.file?.path || null,
      bookings,
      role: "customer",
    });
    //saving new user
    await user.save();
    //sending token so we can authorize who can check what
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
