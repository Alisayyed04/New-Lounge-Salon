// utils/cloudinaryUpload.js
import cloudinary from "../Config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "services" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};
