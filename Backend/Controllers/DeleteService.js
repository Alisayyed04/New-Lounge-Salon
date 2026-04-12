import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import Service from "../Models/Services.js";
import mongoose from "mongoose";

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔴 1. Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  // 🔴 2. Delete service
  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  // 🟢 3. Response
  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
    data: service,
  });
});
