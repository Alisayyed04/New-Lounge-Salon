import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
        revenue: 0,
    });

    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
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

                const bookings = res.data.data || [];

                // ✅ stats calculation
                const statsData = {
                    total: bookings.length,
                    pending: bookings.filter(b => b.status === "pending").length,
                    confirmed: bookings.filter(b => b.status === "confirmed").length,
                    completed: bookings.filter(b => b.status === "completed").length,
                    cancelled: bookings.filter(b => b.status === "cancelled").length,
                    revenue: bookings
                        .filter(b => b.status === "completed")
                        .reduce((acc, b) => acc + (b.totalPrice || 0), 0),
                };

                setStats(statsData);

                // ✅ latest 5 bookings
                const sorted = [...bookings].reverse().slice(0, 5);
                setRecentBookings(sorted);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {/* 🔥 STATS */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <DashboardCard title="Total Bookings" value={stats.total} />
                <DashboardCard title="Pending" value={stats.pending} />
                <DashboardCard title="Confirmed" value={stats.confirmed} />
                <DashboardCard title="Completed" value={stats.completed} />
                <DashboardCard title="Cancelled" value={stats.cancelled} />
                <DashboardCard title="Revenue" value={`₹${stats.revenue}`} />
            </div>

            {/* 🔥 RECENT BOOKINGS */}
            <div style={{ marginTop: "40px" }}>
                <h2>Recent Bookings</h2>

                {recentBookings.length === 0 ? (
                    <p>No recent bookings</p>
                ) : (
                    recentBookings.map((b) => (
                        <div key={b._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                            <p><strong>{b.service?.name}</strong></p>
                            <p>{b.user?.name}</p>
                            <p>{b.date?.split("T")[0]} - {b.time}</p>
                            <p>Status: {b.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}