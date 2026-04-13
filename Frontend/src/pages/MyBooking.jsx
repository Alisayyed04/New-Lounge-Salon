import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
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
                    `${API}/api/bookings/my`,
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
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this booking?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `${API}/api/bookings/${id}`,
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

    // ✅ STATS
    const total = data.length;
    const upcoming = data.filter((b) => b.status === "confirmed").length;
    const completed = data.filter((b) => b.status === "completed").length;

    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        My Bookings
                    </span>
                </h1>
                <p className="text-zinc-400">
                    Manage your appointments with ease
                </p>
            </div>

            {/* STATS BAR */}
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 mb-10">
                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                    <p className="text-zinc-400 text-sm">Total</p>
                    <h2 className="text-2xl font-bold text-white">{total}</h2>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                    <p className="text-zinc-400 text-sm">Upcoming</p>
                    <h2 className="text-2xl font-bold text-yellow-400">{upcoming}</h2>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                    <p className="text-zinc-400 text-sm">Completed</p>
                    <h2 className="text-2xl font-bold text-green-400">{completed}</h2>
                </div>
            </div>

            {/* BOOKINGS */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                {data.length === 0 ? (
                    <div className="col-span-full text-center text-zinc-500 py-20 border border-white/10 rounded-2xl bg-[#111]/50 backdrop-blur-md">
                        <h2 className="text-lg mb-2">No bookings yet</h2>
                        <p className="text-sm text-zinc-600">
                            Book your first service and it’ll show up here ✂️
                        </p>
                    </div>
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
        </section>
    );
}