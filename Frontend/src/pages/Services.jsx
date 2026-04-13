import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { useAlert } from "../context/AlertContext";

export default function Services() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("");

    const { showAlert } = useAlert();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/services"
                );

                setData(req.data.data);
                setFilteredData(req.data.data);
            } catch (e) {
                showAlert(
                    e.response?.data?.message ||
                    "Failed to load services ❌"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 🔥 FILTER + SEARCH + SORT LOGIC
    useEffect(() => {
        let temp = [...data];

        // Search
        if (search) {
            temp = temp.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category filter
        if (category !== "all") {
            temp = temp.filter(
                (s) => s.category.toLowerCase().trim() === category
            );
        }

        // Sorting
        if (sort === "low-high") {
            temp.sort((a, b) => a.duration - b.duration);
        } else if (sort === "high-low") {
            temp.sort((a, b) => b.duration - a.duration);
        }

        setFilteredData(temp);
    }, [search, category, sort, data]);

    // Get unique categories
    const categories = ["all", ...new Set(data.map((s) => s.category.toLowerCase().trim())),];

    return (
        <div style={{ padding: "20px" }}>
            <h2>Our Services</h2>

            {/* 🔍 Controls */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

                <input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "8px", flex: 1 }}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort</option>
                    <option value="low-high">Duration ↑</option>
                    <option value="high-low">Duration ↓</option>
                </select>
            </div>

            {/* 📦 Services Grid */}
            {loading ? (
                <p>Loading...</p>
            ) : filteredData.length === 0 ? (
                <p>No services found</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {filteredData.map((service) => (
                        <ServiceCard
                            key={service._id}
                            service={service}
                            isAdmin={user?.role === "admin"}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}