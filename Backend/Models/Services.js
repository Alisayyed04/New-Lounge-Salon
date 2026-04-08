import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    category: {
      type: String,
      enum: ["haircut", "coloring", "nails", "waxing", "makeup"],
      required: true,
    },

    image: {
      type: String, // URL (Cloudinary later)
    },

    isActive: {
      type: Boolean,
      default: true, // hide service without deleting
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
