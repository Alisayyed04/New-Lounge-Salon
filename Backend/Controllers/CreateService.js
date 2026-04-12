import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import Service from "../Models/Services.js";
import { uploadToCloudinary } from "../Middlewares/cloudinaryUpload.js";

export const createService = asyncHandler(async (req, res) => {
  const { name, description, price, duration, category, isActive } = req.body;

  // 🔴 1. Validation
  if (!name || !description || !price) {
    throw new AppError("Enter the essential fields", 400);
  }

  // 🔴 2. Check duplicate
  const exists = await Service.findOne({
    name: name.trim().toLowerCase(),
  });

  if (exists) {
    throw new AppError("Service already exists", 400);
  }

  // 🔴 3. Handle image
  let imageUrl;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    imageUrl = result.secure_url;
  }

  // 🟢 4. Create service
  const service = await Service.create({
    name,
    description,
    price,
    duration,
    category,
    image: imageUrl,
    isActive,
  });

  // 🟢 5. Response
  res.status(201).json({
    success: true,
    message: "New service created!",
    data: service,
  });
});
