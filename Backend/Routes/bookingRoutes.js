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
router.get("/", protect, authorizeRoles("admin", "customer"), getBookings);
router.get(
  "/:id",
  protect,
  authorizeRoles("customer", "admin"),
  getBookingById,
);
// protect, authorizeRoles("admin"),
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "customer"),
  updateBookingStatus,
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "customer"),
  deleteBooking,
);

export default router;
