import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBooking() {
    //comes here from booking card 
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        status: "",
        note: "",
    });

    const [loading, setLoading] = useState(true);

    // fetch booking
    useEffect(() => {
        const fetchBooking = async () => {
            const token = localStorage.getItem("token");
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
                    date: booking.date,
                    time: booking.time,
                    status: booking.status || "pending",
                    note: booking.note || "",
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBooking();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/api/bookings/${id}`,
                {
                    date: formData.date,
                    time: formData.time,
                    status: formData.status,
                    note: formData.note,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Booking updated ✅");
            //Goes to home page after updation 

            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Update failed ❌");
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Booking</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={formData.date?.split("T")[0] || ""}
                    onChange={handleChange}
                />
                <textarea
                    name="note"
                    placeholder="Admin note..."
                    value={formData.note}
                    onChange={handleChange}
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={formData.status || "pending"}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                </select>

                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}