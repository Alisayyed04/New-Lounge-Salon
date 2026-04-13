import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },

    address: {
      type: String,
    },

    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dylin11ku/image/upload/q_auto/f_auto/v1776001972/Default-Profile-Picture-Download-PNG-Image_wvetgl.webp",
    },

    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true },
);

// Create Model
const User = mongoose.model("User", userSchema);

export default User;
