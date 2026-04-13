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
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "hair",
        "haircut",
        "skin & facial",
        "threading",
        "bridal",
        "coloring",
        "nails",
        "waxing",
        "makeup",
      ],
    },

    image: {
      type: String,
      default: "https://via.placeholder.com/300?text=Service+Image",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
