import express from "express";

import { createBooking } from "../Controllers/CreateBooking.js";
import { getBookedSlots } from "../Controllers/GetBookedSlots.js";
import { getMyBookings } from "../Controllers/GetMyBookings.js";
import { getBookings } from "../Controllers/GetAllBookings.js";
import { getBookingById } from "../Controllers/GetBookingById.js";
import { updateBookingStatus } from "../Controllers/UpdateBooking.js";
import { deleteBooking } from "../Controllers/DeleteBooking.js";

import { authorizeRoles, protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// PUBLIC / BASIC
router.get("/slots", getBookedSlots);

// CREATE BOOKING
router.post("/", protect, authorizeRoles("customer"), createBooking);

// SPECIAL ROUTES FIRST
router.get("/my", protect, authorizeRoles("customer"), getMyBookings);

// GENERAL ROUTES
router.get("/", protect, authorizeRoles("admin", "customer"), getBookings);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "customer"),
  getBookingById,
);

// UPDATE
router.put("/:id", protect, authorizeRoles("admin"), updateBookingStatus);

// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "customer"),
  deleteBooking,
);

export default router;
