import express from "express";
import upload from "../Middlewares/multer.js";

import { registerUser } from "../Controllers/Register.js";
import { loginUser } from "../Controllers/Login.js";
import { createAdmin } from "../Controllers/CreateAdmin.js";

import { protect, authorizeRoles } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", upload.single("profilePic"), registerUser);

// LOGIN
router.post("/login", loginUser);

// ADMIN
router.post("/admin/create", protect, authorizeRoles("admin"), createAdmin);

export default router;
