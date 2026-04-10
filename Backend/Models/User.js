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
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
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
