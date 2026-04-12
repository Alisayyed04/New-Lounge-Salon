import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import Service from "../Models/Services.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../Middlewares/cloudinaryUpload.js";

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔴 1. Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  // 🔴 2. Prepare update data
  const updatedData = {
    ...req.body,
  };

  // 🔴 3. Handle image upload (Cloudinary)
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    updatedData.image = result.secure_url;
  }

  // 🔴 4. Update service
  const service = await Service.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate("category");

  if (!service) {
    throw new AppError("Service doesn't exist", 404);
  }

  // 🟢 5. Response
  res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: service,
  });
});
