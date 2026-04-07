import Booking from "../Models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      user = req.user.id,
      service,
      staff,
      date,
      time,
      status,
      totalPrice,
      notes,
    } = req.body;

    if (!user || !service || !staff || !date || !time) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }
    const slotExists = await Booking.findOne({
      staff,
      date,
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
      staff,
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
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate([
      "user",
      "service",
      "staff",
    ]);
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

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const booking = await Booking.findById(id).populate([
      "user",
      "service",
      "staff",
    ]);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
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
    // const userId = req.params.id;
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const bookings = await Booking.find({ user: userId }).populate([
      "service",
      "staff",
    ]);
    if (bookings.length === 0) {
      return res.status(404).json({
        message: "You don't have any bookings",
      });
    }
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to update this booking",
      });
    }
    booking.status = status;

    await booking.save();

    return res.status(200).json({
      message: "Booking status updated",
      data: booking,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

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
    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to Delete this booking",
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
