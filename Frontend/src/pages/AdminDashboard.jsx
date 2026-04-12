import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("");

    const token = localStorage.getItem("token");

    // ✅ FETCH ONLY (no extra logic)
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

    // ✅ DERIVED FILTERED DATA (NO STATE)
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

    // ✅ DERIVED STATS (NO STATE)
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

    // ✅ UPDATE STATUS (SAFE)
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

            // update locally
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
        <div >
            <h1>📊 Admin Dashboard</h1>

            {/* STATS */}
            <div >
                <DashboardCard title="Total" value={stats.total} />
                <DashboardCard title="Pending" value={stats.pending} />
                <DashboardCard title="Confirmed" value={stats.confirmed} />
                <DashboardCard title="Completed" value={stats.completed} />
                <DashboardCard title="Cancelled" value={stats.cancelled} />
                <DashboardCard title="Revenue" value={`₹${stats.revenue}`} />
            </div>

            {/* CONTROLS */}
            <div >
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort</option>
                    <option value="date">Latest</option>
                    <option value="price">Highest Price</option>
                </select>
            </div>

            {/* BOOKINGS */}
            {filtered.map((b) => (
                <div key={b._id} >
                    <h3>{b.service?.name}</h3>
                    <p>{b.user?.name}</p>
                    <p>{b.date?.split("T")[0]} | {b.time}</p>
                    <p>Status: <strong>{b.status}</strong></p>
                    <p>₹{b.totalPrice}</p>

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button onClick={() => updateStatus(b._id, "confirmed")}>
                            Confirm
                        </button>
                        <button onClick={() => updateStatus(b._id, "completed")}>
                            Complete
                        </button>
                        <button onClick={() => updateStatus(b._id, "cancelled")}>
                            Cancel
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}