import express from "express";
import {
  registerUser,
  loginUser,
  createAdmin,
} from "../Controllers/UserController.js";

import { protect, authorizeRoles } from "../Middlewares/authMiddleware.js";
const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);
// LOGIN ROUTE
router.post("/login", loginUser);
export default router;
// ADMIN ROUTE
router.post("/admin/create", protect, authorizeRoles("admin"), createAdmin);
