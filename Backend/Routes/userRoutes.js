import express from "express";
import { registerUser, loginUser } from "../Controllers/UserController.js";

const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);
// LOGIN ROUTE
router.post("/login", loginUser);
export default router;
