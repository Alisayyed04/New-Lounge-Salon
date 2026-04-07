import express from "express";
import {
  deleteBooking,
  updateBookingStatus,
  getMyBookings,
  getBookingById,
  getBookings,
  createBooking,
} from "../Controllers/BookingController.js";
import { authorizeRoles, protect } from "../Middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", protect, authorizeRoles("user"), createBooking);

// special routes first
router.get("/my", protect, authorizeRoles("user"), getMyBookings);

// general routes after
router.get("/", protect, authorizeRoles("admin"), getBookings);
router.get("/:id", protect, authorizeRoles("user", "admin"), getBookingById);

router.put("/:id", protect, authorizeRoles("admin"), updateBookingStatus);
router.delete("/:id", protect, authorizeRoles("user", "admin"), deleteBooking);

export default router;
