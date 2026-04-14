import { asyncHandler } from "../utils/asyncHandler.js";
import Booking from "../Models/Booking.js";
import { AppError } from "../utils/AppError.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { service, date, time, totalPrice, notes } = req.body;
  const userId = req.user?.id;

  // ✅ Validation
  if (!userId || !service || !date || !time) {
    throw new AppError("Please fill all the fields", 400);
  }

  // 🔥 Backend Time Validation (VERY IMPORTANT)
  const now = new Date();
  const selectedDateTime = new Date(`${date}T${time}`);

  if (selectedDateTime < now) {
    throw new AppError("Cannot book a past time", 400);
  }

  // ✅ Create booking
  const booking = await Booking.create({
    user: userId,
    service,
    date,
    time,
    status: "pending",
    totalPrice,
    notes,
  });

  // ✅ Populate AFTER creation
  const populatedBooking = await booking.populate([
    { path: "user", select: "name phone email role createdAt" },
    {
      path: "service",
      select: "name price duration category image description",
    },
  ]);

  // ✅ Response
  res.status(201).json({
    success: true,
    message: "Booking request sent. Call us if you are in a hurry!",
    data: populatedBooking,
  });
});
