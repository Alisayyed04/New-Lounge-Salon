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
        <section className="relative text-white px-6 py-16 max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="mb-10">
                <h2 className="text-3xl font-semibold">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        All Bookings
                    </span>
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                    Manage and monitor all customer bookings
                </p>
            </div>

            {/* CONTENT */}
            {loading ? (
                <div className="text-zinc-500 text-center py-20">
                    Loading bookings...
                </div>
            ) : data.length === 0 ? (
                <div className="text-zinc-500 text-center py-20">
                    No bookings found
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}