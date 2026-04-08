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

router.post("/", protect, authorizeRoles("customer"), createBooking); //authorizeRoles("user") add this later

// special routes first
router.get("/my", protect, authorizeRoles("customer"), getMyBookings);

// general routes after
router.get("/", protect, authorizeRoles("admin"), getBookings);
router.get(
  "/:id",
  protect,
  authorizeRoles("customer", "admin"),
  getBookingById,
);

router.put("/:id", protect, authorizeRoles("admin"), updateBookingStatus);
router.delete(
  "/:id",
  protect,
  authorizeRoles("customer", "admin"),
  deleteBooking,
);

export default router;
