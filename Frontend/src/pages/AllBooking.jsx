import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { useAlert } from "../context/AlertContext";

export default function AdminBookings() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    useEffect(() => {
        const getAllBookings = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    "http://localhost:8080/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(res.data.data);
                showAlert("Bookings loaded successfully", "success");

            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to fetch bookings"
                );
            } finally {
                setLoading(false);
            }
        };

        getAllBookings();
    }, []);

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
            showAlert("Booking deleted successfully", "success");

        } catch (err) {
            showAlert(
                err.response?.data?.message || "Failed to delete booking"
            );
        }
    };

    return (
        <>
            <h2>All Bookings (Admin)</h2>

            {loading ? (
                <p>Loading...</p>
            ) : data.length === 0 ? (
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
        </>
    );
}