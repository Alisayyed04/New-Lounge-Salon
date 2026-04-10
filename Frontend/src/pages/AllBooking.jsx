import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";

export default function AdminBookings() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } catch (err) {
                console.log(err.message || err.response);
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

        } catch (err) {
            console.log(err.message || err.response);
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
                    <BookingCard key={booking._id} booking={booking}
                        onDelete={handleDelete} />
                ))
            )}
        </>
    );
}