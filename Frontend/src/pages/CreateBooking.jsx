import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";

export default function CreateBooking() {
    const navigate = useNavigate();
    const { id: ID } = useParams();
    const { showAlert } = useAlert();

    const today = new Date().toISOString().split("T")[0];

    const [serviceData, setServiceData] = useState({});

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        notes: "",
        totalPrice: 0,
    });

    // 🔥 Generate slots (unchanged)
    const generateTimeSlots = (start = 9, end = 20, interval = 60) => {
        const slots = [];
        for (let hour = start; hour < end; hour++) {
            for (let min = 0; min < 60; min += interval) {
                const h = String(hour).padStart(2, "0");
                const m = String(min).padStart(2, "0");
                slots.push(`${h}:${m}`);
            }
        }
        return slots;
    };

    const allSlots = generateTimeSlots();

    // ✅ FETCH SERVICE
    useEffect(() => {
        const getService = async () => {
            try {
                const res = await axios.get(`${API}/api/services/${ID}`);
                const service = res.data.data;

                setServiceData(service);

                setFormData((prev) => ({
                    ...prev,
                    totalPrice: service.price,
                }));
            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to load service"
                );
            }
        };

        getService();
    }, [ID]);

    // ✅ BLOCK PAST TIME ONLY
    const isPastTime = (slot) => {
        if (!formData.date) return false;

        const now = new Date();
        const selectedDate = new Date(formData.date);

        // Only check time if same day
        if (selectedDate.toDateString() !== now.toDateString()) {
            return false;
        }

        const [h, m] = slot.split(":");
        const slotDate = new Date(selectedDate);
        slotDate.setHours(h, m, 0, 0);

        return slotDate < now;
    };

    // ✅ SUBMIT (REQUEST BOOKING)
    // ✅ SUBMIT (REQUEST BOOKING)
    const handleForm = async (e) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            showAlert("Select date and time");
            return;
        }

        if (formData.date < today) {
            showAlert("Invalid date selected");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                showAlert("Please login to book a service", "error");
                return;
            }

            const res = await axios.post(
                `${API}/api/bookings/`,
                {
                    ...formData,
                    service: ID,
                    status: "pending",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const bookingData = res.data.data;

            // ✅ WhatsApp Message
            const message = `
New Booking!

Name: ${bookingData.user?.name}
Phone: ${bookingData.user?.phone}
Service: ${bookingData.service?.name}
Price: ₹${bookingData.totalPrice}
Date: ${bookingData.date?.split("T")[0]}
Time: ${bookingData.time}
`;

            const adminNumber = "918766613766"; // 🔥 replace with your number

            const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

            // ✅ Open WhatsApp FIRST (better UX)
            window.open(whatsappURL, "_blank");

            // ✅ Then show success + navigate
            showAlert(
                "Booking request sent. WhatsApp message opened!",
                "success"
            );

            navigate(`/booking/${bookingData._id}`);

        } catch (err) {
            showAlert(
                err.response?.data?.message || "Failed to create booking"
            );
        }
    };
    // ✅ IMAGE FIX
    const getImage = () => {
        if (serviceData?.image?.url) return serviceData.image.url;
        if (serviceData?.image) return serviceData.image;
        if (serviceData?.img) return serviceData.img;
        return "/photos/default-service.jpg";
    };

    return (
        <section className="text-white px-6 py-20 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">

                {/* LEFT */}
                <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-xl group">
                    <div className="overflow-hidden">
                        <img
                            src={getImage()}
                            alt={serviceData?.name || "Service"}
                            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-yellow-500 mb-2">
                            {serviceData.name}
                        </h2>

                        <p className="text-zinc-400 text-sm mb-4">
                            {serviceData.description}
                        </p>

                        <h3 className="text-lg font-medium text-white">
                            ₹{serviceData.price}
                        </h3>
                    </div>
                </div>

                {/* RIGHT */}
                <form
                    onSubmit={handleForm}
                    className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl p-8 shadow-2xl"
                >
                    {/* DATE */}
                    <div className="mb-6">
                        <label className="text-sm text-zinc-400">
                            Select Date
                        </label>

                        <input
                            type="date"
                            min={today}
                            value={formData.date}
                            onChange={(e) => {
                                const selected = e.target.value;

                                if (selected < today) {
                                    showAlert("Cannot select past date");
                                    return;
                                }

                                setFormData((prev) => ({
                                    ...prev,
                                    date: selected,
                                    time: "",
                                }));
                            }}
                            onKeyDown={(e) => e.preventDefault()}
                            onFocus={(e) => e.target.showPicker()}
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                    </div>

                    {/* TIME */}
                    <div className="mb-6">
                        <label className="text-sm text-zinc-400">
                            Select Time
                        </label>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                            {allSlots.map((slot) => {
                                const isPast = isPastTime(slot);
                                const disabled = isPast;

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
                                        className={`
                                        py-2 rounded-xl text-sm transition
                                        ${formData.time === slot
                                                ? "bg-yellow-500 text-black scale-105"
                                                : "bg-zinc-900 text-zinc-300"
                                            }
                                        ${disabled
                                                ? "opacity-25 cursor-not-allowed line-through"
                                                : "hover:bg-yellow-500 hover:text-black"
                                            }
                                        `}
                                    >
                                        {slot}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* NOTES */}
                    <textarea
                        placeholder="Additional notes (optional)"
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                notes: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white mb-6"
                    />

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={!formData.date || !formData.time}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-700 
                        disabled:opacity-40 text-white font-semibold transition"
                    >
                        Request Booking
                    </button>
                </form>
            </div>
        </section>
    );
}