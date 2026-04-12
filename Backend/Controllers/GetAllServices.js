import { asyncHandler } from "../utils/asyncHandler.js";
import Service from "../Models/Services.js";

export const getServices = asyncHandler(async (req, res) => {
  // 🔴 1. Fetch services
  const services = await Service.find().populate("category");

  // 🟢 2. Response
  res.status(200).json({
    success: true,
    data: services,
  });
});
