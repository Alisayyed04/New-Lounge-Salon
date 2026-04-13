import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setBookings(res.data.data || []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBookings();
    }, [token]);

    const filtered = useMemo(() => {
        let temp = [...bookings];

        if (filter !== "all") {
            temp = temp.filter(b => b.status === filter);
        }

        if (sort === "date") {
            temp.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        if (sort === "price") {
            temp.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
        }

        return temp;
    }, [bookings, filter, sort]);

    const stats = useMemo(() => {
        return {
            total: bookings.length,
            pending: bookings.filter(b => b.status === "pending").length,
            confirmed: bookings.filter(b => b.status === "confirmed").length,
            completed: bookings.filter(b => b.status === "completed").length,
            cancelled: bookings.filter(b => b.status === "cancelled").length,
            revenue: bookings
                .filter(b => b.status === "completed")
                .reduce((acc, b) => acc + (b.totalPrice || 0), 0),
        };
    }, [bookings]);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8080/api/bookings/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBookings(prev =>
                prev.map(b =>
                    b._id === id ? { ...b, status } : b
                )
            );

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="relative text-white px-6 py-16 max-w-7xl mx-auto">

            {/* HEADER */}
            <h1 className="text-4xl font-bold mb-10">
                <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </span>
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                <div className="col-span-1">
                    <DashboardCard title="Total" value={stats.total} />
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Pending" value={stats.pending} />
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Confirmed" value={stats.confirmed} />
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Completed" value={stats.completed} />
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Cancelled" value={stats.cancelled} />
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Revenue" value={`₹${stats.revenue}`} />
                </div>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-wrap gap-4 mb-10">
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-[#0f0f0f] border border-white/10 text-zinc-300 px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-[#0f0f0f] border border-white/10 text-zinc-300 px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                >
                    <option value="">Sort</option>
                    <option value="date">Latest</option>
                    <option value="price">Highest Price</option>
                </select>
            </div>

            {/* BOOKINGS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((b) => (
                    <div
                        key={b._id}
                        className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
                        border border-white/5 
                        backdrop-blur-xl 
                        rounded-2xl p-6 
                        shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                        hover:border-yellow-500 
                        hover:scale-[1.02] 
                        transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-yellow-500 mb-2">
                            {b.service?.name}
                        </h3>

                        <p className="text-zinc-400 text-sm">
                            {b.user?.name}
                        </p>

                        <p className="text-zinc-400 text-sm">
                            {b.date?.split("T")[0]} | {b.time}
                        </p>

                        <p className="text-sm mt-2">
                            Status:{" "}
                            <span
                                className={`font-semibold 
                                ${b.status === "pending"
                                        ? "text-yellow-400"
                                        : b.status === "confirmed"
                                            ? "text-green-400"
                                            : b.status === "completed"
                                                ? "text-blue-400"
                                                : "text-red-400"
                                    }`}
                            >
                                {b.status}
                            </span>
                        </p>

                        <p className="text-zinc-300 mt-2 font-medium">
                            ₹{b.totalPrice}
                        </p>

                        <div className="flex gap-2 mt-5">
                            <button
                                onClick={() => updateStatus(b._id, "confirmed")}
                                className="flex-1 py-2 rounded-lg bg-green-900 hover:bg-green-800 text-sm transition"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => updateStatus(b._id, "completed")}
                                className="flex-1 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-sm transition"
                            >
                                Complete
                            </button>
                            <button
                                onClick={() => updateStatus(b._id, "cancelled")}
                                className="flex-1 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-sm transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}