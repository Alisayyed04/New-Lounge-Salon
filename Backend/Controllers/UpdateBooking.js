import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { status, date, time, notes } = req.body;

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

  // 🔴 4. Validate & update status
  if (status) {
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status value", 400);
    }

    booking.status = status;
  }

  // 🔴 5. Update other fields if provided
  if (date) booking.date = date;
  if (time) booking.time = time;
  if (notes !== undefined) booking.notes = notes;

  // 🟢 6. Save
  await booking.save();

  // 🟢 7. Response
  res.status(200).json({
    success: true,
    message: "Booking updated",
    data: booking,
  });
});
