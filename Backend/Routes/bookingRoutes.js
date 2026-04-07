import express from "express";
import {
  deleteBooking,
  updateBookingStatus,
  getMyBookings,
  getBookingById,
  getBookings,
  createBooking,
} from "../Controllers/BookingController.js";
const router = express.Router();

router.post("/", createBooking);

// special routes first
router.get("/my", getMyBookings);

// general routes after
router.get("/", getBookings);
router.get("/:id", getBookingById);

router.put("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

export default router;
