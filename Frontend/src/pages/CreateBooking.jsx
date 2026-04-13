import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

export default function CreateBooking() {
    const navigate = useNavigate();
    const { id: ID } = useParams();
    const { showAlert } = useAlert();

    const today = new Date().toISOString().split("T")[0];

    const [serviceData, setServiceData] = useState({});
    const [bookedSlots, setBookedSlots] = useState([]);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        notes: "",
        totalPrice: 0,
    });

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
                const res = await axios.get(
                    `http://localhost:8080/api/services/${ID}`
                );

                const service = res.data.data;

                console.log("SERVICE DATA 👉", service); // DEBUG

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

                const slots = Array.isArray(res.data) ? res.data : [];
                setBookedSlots(slots);

                const available = allSlots.find(
                    (s) => !slots.includes(s)
                );

                if (available) {
                    setFormData((prev) => ({
                        ...prev,
                        time: available,
                    }));
                }
            } catch (err) {
                showAlert(
                    err.response?.data?.message ||
                    "Failed to fetch available slots"
                );
            }
        };

        fetchSlots();
    }, [formData.date]);

    // ✅ BLOCK PAST TIME
    const isPastTime = (slot) => {
        if (!formData.date) return false;

        const now = new Date();
        const selectedDate = new Date(formData.date);

        if (selectedDate.toDateString() !== now.toDateString()) {
            return false;
        }

        const [h, m] = slot.split(":");
        const slotDate = new Date();
        slotDate.setHours(h, m, 0);

        return slotDate < now;
    };

    // ✅ SUBMIT
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

            const res = await axios.post(
                "http://localhost:8080/api/bookings/",
                {
                    ...formData,
                    service: ID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            showAlert("Booking created successfully", "success");
            navigate(`/booking/${res.data.data._id}`);
        } catch (err) {
            showAlert(
                err.response?.data?.message || "Failed to create booking"
            );
        }
    };

    // ✅ GET IMAGE (CLOUDINARY FIX)
    const getImage = () => {
        if (serviceData?.image?.url) return serviceData.image.url;
        if (serviceData?.image) return serviceData.image;
        if (serviceData?.img) return serviceData.img;

        return "/photos/default-service.jpg";
    };

    return (
        <section className="text-white px-6 py-20 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">

                {/* LEFT - SERVICE */}
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

                {/* RIGHT - FORM */}
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
                            onKeyDown={(e) => e.preventDefault()} // 🔒 block typing
                            onFocus={(e) => e.target.showPicker()} // 🔥 force calendar
                            className="w-full mt-2 px-4 py-3 rounded-xl bg-black border border-white/10 text-white 
                            focus:outline-none focus:border-yellow-500 cursor-pointer"
                        />
                    </div>

                    {/* TIME */}
                    <div className="mb-6">
                        <label className="text-sm text-zinc-400">
                            Select Time
                        </label>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
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
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white 
                        focus:outline-none focus:border-yellow-500 mb-6"
                    />

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={!formData.date || !formData.time}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-700 
                        hover:from-red-800 hover:to-red-600 
                        disabled:opacity-40 disabled:cursor-not-allowed
                        text-white font-semibold transition"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </section>
    );
}