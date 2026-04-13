import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";

export default function Admin() {
    const [data, setData] = useState([]);
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchBookings = async () => {
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
            }
        };

        fetchBookings();
    }, []);

    return (
        <section className="relative text-white min-h-screen px-6 py-16">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </span>
                </h1>
                <p className="text-zinc-400">
                    Manage bookings and monitor activity
                </p>
            </div>

            {/* BOOKINGS GRID */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {data.length === 0 ? (
                    <p className="text-zinc-500">No bookings found.</p>
                ) : (
                    data.map((booking, i) => (
                        <div
                            key={booking._id || i}
                            className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
                            border border-white/5 
                            backdrop-blur-xl 
                            rounded-2xl p-6 
                            shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                            hover:border-yellow-500 
                            hover:scale-[1.02] 
                            transition-all duration-300"
                        >
                            {/* CLIENT */}
                            <h2 className="text-xl font-semibold mb-2 text-yellow-500">
                                {booking.name || "Client"}
                            </h2>

                            {/* DETAILS */}
                            <p className="text-zinc-400 text-sm mb-1">
                                📞 {booking.phone || "N/A"}
                            </p>
                            <p className="text-zinc-400 text-sm mb-1">
                                💇 {booking.service?.name || "Service"}
                            </p>
                            <p className="text-zinc-400 text-sm mb-1">
                                📅 {booking.date || "Date"}
                            </p>

                            {/* STATUS */}
                            <div className="mt-4">
                                <span
                                    className={`px-3 py-1 text-xs rounded-full 
                                    ${booking.status === "pending"
                                            ? "bg-yellow-900/40 text-yellow-400"
                                            : booking.status === "confirmed"
                                                ? "bg-green-900/40 text-green-400"
                                                : "bg-red-900/40 text-red-400"
                                        }`}
                                >
                                    {booking.status || "pending"}
                                </span>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 py-2 rounded-lg bg-green-900 hover:bg-green-800 text-sm transition">
                                    Confirm
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-sm transition">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </section>
    );
}