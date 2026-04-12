import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import Service from "../Models/Services.js";
import mongoose from "mongoose";

export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔴 1. Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  // 🔴 2. Find service
  const service = await Service.findById(id).populate("category");

  if (!service) {
    throw new AppError("Service doesn't exist", 404);
  }

  // 🟢 3. Response
  res.status(200).json({
    success: true,
    data: service,
  });
});
