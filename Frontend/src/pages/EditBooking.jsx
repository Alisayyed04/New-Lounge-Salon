
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

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

    // ✅ GENERATE SLOTS
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

    // ✅ FETCH BOOKING
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
                    `http://localhost:8080/api/bookings/${id}`,
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

    // ✅ FETCH BOOKED SLOTS
    useEffect(() => {
        const fetchSlots = async () => {
            if (!formData.date) return;

            try {
                const res = await axios.get(
                    "http://localhost:8080/api/bookings/slots",
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

    // ✅ VALIDATION (STRICT)
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

    // ✅ PAST TIME CHECK
    const isPastTime = (slot) => {
        if (!formData.date) return false;

        const now = new Date();
        const selectedDate = new Date(formData.date);

        if (selectedDate.toDateString() !== now.toDateString()) return false;

        const currentTime = now.toTimeString().slice(0, 5);
        return slot <= currentTime;
    };

    // ✅ HANDLE CHANGE
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ✅ SUBMIT
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
                `http://localhost:8080/api/bookings/${id}`,
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

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Booking</h2>

            <form onSubmit={handleSubmit}>
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <br />

                <label>Time</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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
                                style={{
                                    padding: "10px",
                                    background:
                                        formData.time === slot
                                            ? "black"
                                            : "lightgray",
                                    color:
                                        formData.time === slot
                                            ? "white"
                                            : "black",
                                    opacity: disabled ? 0.5 : 1,
                                    cursor: disabled
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>

                <br />

                <label>Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <br />

                <label>Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <br />

                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}
