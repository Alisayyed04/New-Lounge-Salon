import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
export default function EditBooking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        status: "pending",
        notes: "",
    });

    const generateTimeSlots = (start = 9, end = 20, interval = 60) => {
        const slots = [];
        for (let hour = start; hour < end; hour++) {
            for (let min = 0; min < 60; min += interval) {
                const h = String(hour).padStart(2, "0");
                const m = String(min).padStart(2, "0");
                slots.push(`${h}:${m} `);
            }
        }
        return slots;
    };

    const allSlots = generateTimeSlots();

    useEffect(() => {
        const fetchBooking = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                showAlert("Login required");
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(
                    `${API}/api/bookings/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const booking = res.data.data;

                setFormData({
                    date: booking.date.split("T")[0],
                    time: booking.time,
                    status: booking.status || "pending",
                    notes: booking.notes || "",
                });

                setLoading(false);
            } catch (err) {
                showAlert(
                    err.response?.data?.message ||
                    "Failed to load booking"
                );
                navigate("/");
            }
        };

        fetchBooking();
    }, [id]);

    useEffect(() => {
        const fetchSlots = async () => {
            if (!formData.date) return;

            try {
                const res = await axios.get(
                    `${API}/api/bookings/slots`,
                    {
                        params: { date: formData.date },
                    }
                );

                const filtered = res.data.filter(
                    (slot) => slot !== formData.time
                );

                setBookedSlots(filtered);

                if (filtered.includes(formData.time)) {
                    const available = allSlots.find(
                        (s) => !filtered.includes(s)
                    );

                    if (available) {
                        setFormData((prev) => ({
                            ...prev,
                            time: available,
                        }));
                    }
                }
            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to fetch slots");
            }
        };

        fetchSlots();
    }, [formData.date]);

    const validateForm = () => {
        if (!formData.date) return "Date is required";
        if (!formData.time) return "Time is required";

        const selectedDate = new Date(formData.date);
        const today = new Date();

        if (selectedDate < new Date(today.toDateString())) {
            return "Cannot select past date";
        }

        if (isPastTime(formData.time)) {
            return "Cannot select past time";
        }

        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!validStatuses.includes(formData.status)) {
            return "Invalid status";
        }

        if (formData.notes.length > 200) {
            return "Notes too long (max 200 chars)";
        }

        return null;
    };

    const isPastTime = (slot) => {
        if (!formData.date) return false;

        const now = new Date();
        const selectedDate = new Date(formData.date);

        if (selectedDate.toDateString() !== now.toDateString()) return false;

        const currentTime = now.toTimeString().slice(0, 5);
        return slot <= currentTime;
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            showAlert("Login required");
            navigate("/login");
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        try {
            await axios.put(
                `${API}/api/bookings/${id}`,
                {
                    date: formData.date,
                    time: formData.time,
                    status: formData.status,
                    notes: formData.notes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            showAlert("Booking updated successfully ✅", "success");
            navigate("/");
        } catch (err) {
            showAlert(
                err.response?.data?.message || "Update failed ❌"
            );
        }
    };

    if (loading)
        return (
            <div className="text-center text-zinc-400 mt-20">
                Loading...
            </div>
        );

    return (
        <section className="text-white px-6 py-20 max-w-4xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Edit Booking
                    </span>
                </h2>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-b from-[#111] to-[#0a0a0a]
                border border-white/10
                backdrop-blur-xl
                rounded-2xl
                p-8
                shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >

                {/* DATE */}
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-yellow-500"
                    />
                </div>

                {/* TIME */}
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-3">
                        Time Slot
                    </label>

                    <div className="flex flex-wrap gap-3">
                        {allSlots.map((slot) => {
                            const isBooked = bookedSlots.includes(slot);
                            const isPast = isPastTime(slot);
                            const disabled = isBooked || isPast;

                            return (
                                <button
                                    type="button"
                                    key={slot}
                                    disabled={disabled}
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            time: slot,
                                        }))
                                    }
                                    className={`px-4 py-2 rounded-lg text-sm transition
                                        ${formData.time === slot
                                            ? "bg-yellow-500 text-black"
                                            : "bg-black border border-white/10 text-zinc-300"
                                        }
                                        ${disabled
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:border-yellow-500"
                                        }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* NOTES */}
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-2">
                        Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-yellow-500"
                    />
                </div>

                {/* STATUS */}
                <div className="mb-6">
                    <label className="block text-sm text-zinc-400 mb-2">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-yellow-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl 
                    bg-gradient-to-r from-red-900 to-red-700 
                    hover:from-red-800 hover:to-red-600 
                    transition shadow-lg"
                >
                    Update Booking
                </button>

            </form>
        </section>
    );
}