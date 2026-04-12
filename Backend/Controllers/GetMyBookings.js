import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";

export const getMyBookings = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  // 🔴 1. Fetch user's bookings
  const bookings = await Booking.find({ user: userId })
    .populate({
      path: "service",
      select: "name price image category",
    })
    .populate({
      path: "staff",
      select: "name",
    });

  // 🟢 2. Response (always 200)
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});
