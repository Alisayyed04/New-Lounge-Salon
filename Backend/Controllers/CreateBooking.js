import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { service, date, time, totalPrice, notes } = req.body;

  const user = req.user?.id;

  // 🔴 1. Validation
  if (!user || !service || !date || !time) {
    throw new AppError("Please fill all the fields", 400);
  }

  // 🔴 2. Normalize date (full day range)
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // 🔴 3. Slot check
  const slotExists = await Booking.findOne({
    date: { $gte: start, $lte: end },
    time,
    status: { $ne: "cancelled" },
  });

  if (slotExists) {
    throw new AppError("This time slot is already booked", 400);
  }

  // 🟢 4. Create booking
  const booking = await Booking.create({
    user,
    service,
    date,
    time,
    status: "pending",
    totalPrice,
    notes,
  });

  // 🟢 5. Response
  res.status(201).json({
    success: true,
    message: "New booking created successfully",
    data: booking,
  });
});
