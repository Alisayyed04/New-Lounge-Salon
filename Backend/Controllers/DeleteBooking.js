import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";

export const deleteBooking = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;

  // 🔴 1. Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  // 🔴 2. Find booking
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // 🔴 3. Authorization (owner or admin)
  if (booking.user.toString() !== userId && req.user.role !== "admin") {
    throw new AppError("Not authorized", 403);
  }

  // 🔴 4. Delete booking
  await Booking.findByIdAndDelete(id);

  // 🟢 5. Response
  res.status(200).json({
    success: true,
    message: "Booking deleted",
    data: booking,
  });
});
