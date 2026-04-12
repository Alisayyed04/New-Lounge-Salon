import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { useAlert } from "../context/AlertContext";

export default function MyBooking() {
    const { showAlert } = useAlert();

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                showAlert("Login required");
                setData([]);
                return;
            }

            try {
                const req = await axios.get(
                    "http://localhost:8080/api/bookings/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(req.data.data || []);
            } catch (e) {
                setData([]);
                showAlert(
                    e.response?.data?.message ||
                    "Failed to fetch bookings ❌"
                );
            }
        };

        getData();
    }, [showAlert]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this booking?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `http://localhost:8080/api/bookings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData((prev) => prev.filter((b) => b._id !== id));
            showAlert("Booking deleted ✅", "success");
        } catch (err) {
            showAlert(
                err.response?.data?.message ||
                "Failed to delete booking ❌"
            );
        }
    };

    return (
        <>
            <h2>My Bookings</h2>

            <div>
                {data.length === 0 ? (
                    <p>No bookings found</p>
                ) : (
                    data.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </>
    );
}