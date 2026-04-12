import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";

export const getBookedSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;

  // 🔴 1. Validation
  if (!date) {
    throw new AppError("Date is required", 400);
  }

  // 🔴 2. Normalize date range
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // 🔴 3. Fetch bookings
  const bookings = await Booking.find({
    date: { $gte: start, $lte: end },
    status: { $ne: "cancelled" },
  }).select("time");

  // 🔴 4. Extract times
  const bookedTimes = bookings.map((b) => b.time);

  // 🟢 5. Response
  res.status(200).json({
    success: true,
    data: bookedTimes,
  });
});
