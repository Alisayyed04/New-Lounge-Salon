import Booking from "../Models/Booking.js";
import mongoose from "mongoose";

//CREATING NEW BOOKING
export const createBooking = async (req, res) => {
  try {
    const {
      user = req.user.id,
      service,
      date,
      time,
      totalPrice,
      notes,
    } = req.body;

    if (!user || !service || !date || !time) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // ✅ FIXED SLOT CHECK (NO STAFF)
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const slotExists = await Booking.findOne({
      date: { $gte: start, $lte: end },
      time,
      status: { $ne: "cancelled" },
    });

    if (slotExists) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const booking = new Booking({
      user,
      service,
      date,
      time,
      status: "pending",
      totalPrice,
      notes,
    });

    await booking.save();

    return res.status(200).json({
      message: "New booking created successfully",
      data: booking,
    });
  } catch (e) {
    console.error("CREATE BOOKING ERROR:", e); // 👈 DEBUG
    return res.status(500).json({
      message: e.message,
    });
  }
};

// GET BOOKED SLOTS FOR A DATE + STAFF
export const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      date: { $gte: start, $lte: end },
      status: { $ne: "cancelled" },
    }).select("time");

    const bookedTimes = bookings.map((b) => b.time);

    res.json(bookedTimes);
  } catch (err) {
    console.log("SLOTS ERROR:", err);
    res.status(500).json({ message: "Error fetching slots" });
  }
};

//SHOW ALL BOOKING
export const getBookings = async (req, res) => {
  try {
    //STORING DATA FROM DB IN VARIABLE
    const bookings = await Booking.find()
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "service",
        select: "name price image category", // ✅ IMPORTANT
      })
      .populate({
        path: "staff",
        select: "name",
      });
    //SENDING TO FRONTEND
    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

//SHOW BOOKING BASED ON BOOOKING ID
export const getBookingById = async (req, res) => {
  try {
    //GET THE BOOKING ID
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    //FIND THE BOOKING BASED ON BOOKING ID IN DB
    const booking = await Booking.findById(id)
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "service",
        select: "name price image category", // ✅ IMPORTANT
      })
      .populate({
        path: "staff",
        select: "name",
      });
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    //RETURN BOOKING
    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "service",
        select: "name price image category", // ✅ THIS FIXES IMAGE
      })
      .populate({
        path: "staff",
        select: "name",
      });

    // ✅ ALWAYS RETURN 200
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings, // can be []
    });
  } catch (e) {
    console.log("GET MY BOOKINGS ERROR:", e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
//GET THE USER'S BOOKING
// export const getMyBookings = async (req, res) => {
//   try {
//     //GET THE USER ID FROM REQ BODY
//     // const userId = req.params.id;
//     const userId = req.user.id;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }
//     //FINDING THE USERS BOOKING IN DB
//     const bookings = await Booking.find({ user: userId }).populate([
//       "service",
//       "staff",
//     ]);
//     if (bookings.length === 0) {
//       return res.status(404).json({
//         message: "You don't have any bookings",
//       });
//     }
//     //SENDING THE DATA TO FRONTEND
//     return res.status(200).json({
//       success: true,
//       count: bookings.length,
//       data: bookings,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// export const updateBookingStatus = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const { status } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid ID" });
//     }
//     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         message: "Invalid status value",
//       });
//     }
//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return res.status(404).json({
//         message: "Booking not found",
//       });
//     }
//     if (booking.user.toString() !== userId && req.user.role !== "admin") {
//       return res.status(403).json({
//         message: "Not authorized",
//       });
//     }
//     booking.status = status;

//     await booking.save();

//     return res.status(200).json({
//       message: "Booking status updated",
//       data: booking,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

//UPDATE BOOKING STATUS DATE TIME AND NOTE
export const updateBookingStatus = async (req, res) => {
  try {
    //GET THE USER ID AND THE BOOKING ID THEY WANNA UPDATE
    const userId = req.user.id;
    // DIFFERENCE BETWEEN Request.USER.ID AND REQ.PARAMS IS THAT I CAN GET THE PARAMS
    // FROM THE ROUTE BUT I HAVE TO GET THE USER ID FROM THE DATA
    const { id } = req.params;
    const { status, date, time, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    //FINDING THE BOOKING BASED ON THE BOOKING ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    //  only admin OR owner CAN UPDATE BOOKING
    if (booking.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // update fields only if provided
    if (status) {
      const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status value",
        });
      }

      booking.status = status;
    }

    if (date) booking.date = date;
    if (time) booking.time = time;
    if (notes !== undefined) booking.notes = notes;
    //SAVING IN DB
    await booking.save();

    return res.status(200).json({
      message: "Booking updated",
      data: booking,
    });
  } catch (e) {
    console.error("UPDATE ERROR:", e); // 👈 ADD THIS
    return res.status(500).json({
      message: e.message, // 👈 send actual error
    });
  }
};

//DELETING THE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    // if (booking.user.toString() !== userId) {
    //   return res.status(403).json({
    //     message: "Not authorized to Delete this booking",
    //   });
    // }
    if (booking.user.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized",
      });
    }
    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Booking Deleted",
      data: booking,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
