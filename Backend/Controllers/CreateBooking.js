import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";
export const createBooking = asyncHandler(async (req, res) => {
  const { service, date, time, totalPrice, notes } = req.body;

  const userId = req.user?.id;

  if (!userId || !service || !date || !time) {
    throw new AppError("Please fill all the fields", 400);
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const slotExists = await Booking.findOne({
    date: { $gte: start, $lte: end },
    time,
    status: { $ne: "cancelled" },
  });

  if (slotExists) {
    throw new AppError("This time slot is already booked", 400);
  }

  const booking = await Booking.create({
    user: userId,
    service,
    date,
    time,
    status: "pending",
    totalPrice,
    notes,
  });

  res.status(201).json({
    success: true,
    message: "New booking created successfully",
    data: booking,
  });
});
