import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateBooking() {
    const navigate = useNavigate();
    const { id: ID } = useParams();

    const [serviceData, setServiceData] = useState({});
    const [bookedSlots, setBookedSlots] = useState([]);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        notes: "",
        totalPrice: 0,
    });

    // ✅ GENERATE TIME SLOTS
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
                    "http://localhost:8080/api/services/" + ID
                );

                const service = res.data.data;
                setServiceData(service);

                setFormData((prev) => ({
                    ...prev,
                    totalPrice: service.price,
                }));
            } catch (e) {
                console.log(e);
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

                // ✅ ONLY auto-set if user hasn't selected anything
                if (!formData.time) {
                    const available = allSlots.find(
                        (s) => !slots.includes(s)
                    );

                    if (available) {
                        setFormData((prev) => ({
                            ...prev,
                            time: available,
                        }));
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchSlots();
    }, [formData.date]);

    // ✅ FIXED PAST TIME CHECK
    const isPastTime = (slot) => {
        if (!formData.date) return false;

        const now = new Date();
        const selectedDate = new Date(formData.date);

        // only check if same day
        if (selectedDate.toDateString() !== now.toDateString()) {
            return false;
        }

        const [h, m] = slot.split(":");
        const slotDate = new Date();
        slotDate.setHours(h, m, 0);

        return slotDate < now;
    };

    // ✅ HANDLE SUBMIT
    const handleForm = async (e) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            alert("Select date and time");
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

            navigate(`/booking/${res.data.data._id}`);
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    };

    return (
        <>
            <h1>Service Details</h1>

            {serviceData?.img && (
                <img src={serviceData.img} alt="" width="150" />
            )}

            <h2>{serviceData.name}</h2>
            <p>{serviceData.description}</p>
            <h3>₹{serviceData.price}</h3>

            <form onSubmit={handleForm}>
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            date: e.target.value,
                            time: "", // reset time when date changes
                        }))
                    }
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
                                    cursor: disabled
                                        ? "not-allowed"
                                        : "pointer",
                                    opacity: disabled ? 0.5 : 1,
                                }}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>

                <br />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            notes: e.target.value,
                        }))
                    }
                />

                <br />

                <button type="submit">Book Now</button>
            </form>
        </>
    );
}