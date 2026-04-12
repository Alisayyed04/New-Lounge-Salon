import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";

export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔴 1. Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  // 🔴 2. Find booking
  const booking = await Booking.findById(id)
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

  // 🔴 3. Check if exists
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // 🟢 4. Response
  res.status(200).json({
    success: true,
    data: booking,
  });
});
