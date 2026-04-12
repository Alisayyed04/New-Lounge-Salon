import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";

export const getBookings = asyncHandler(async (req, res) => {
  // 🔴 1. Fetch all bookings with populated fields
  const bookings = await Booking.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "service",
      select: "name price image category",
    })
    .populate({
      path: "staff",
      select: "name",
    });

  // 🟢 2. Response
  res.status(200).json({
    success: true,
    data: bookings,
  });
});
