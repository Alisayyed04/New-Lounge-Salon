import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";
export const createBooking = asyncHandler(async (req, res) => {
  const { service, date, time, totalPrice, notes } = req.body;

  const userId = req.user?.id;

  if (!userId || !service || !date || !time) {
    throw new AppError("Please fill all the fields", 400);
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
    message: "Booking request sent. Call us if you are in a hurry!",
    data: booking,
  });
});
