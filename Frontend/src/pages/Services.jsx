import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
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
                    `${API}/api/services`
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

        if (search) {
            temp = temp.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== "all") {
            temp = temp.filter(
                (s) => s.category.toLowerCase().trim() === category
            );
        }

        if (sort === "low-high") {
            temp.sort((a, b) => a.duration - b.duration);
        } else if (sort === "high-low") {
            temp.sort((a, b) => b.duration - a.duration);
        }

        setFilteredData(temp);
    }, [search, category, sort, data]);

    const categories = [
        "all",
        ...new Set(data.map((s) => s.category.toLowerCase().trim())),
    ];

    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Our Services
                    </span>
                </h1>
                <p className="text-zinc-400">
                    Discover premium treatments tailored just for you
                </p>
            </div>

            {/* CONTROLS */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row gap-4">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl 
                        bg-[#111] border border-white/10 
                        focus:outline-none focus:border-yellow-500 
                        placeholder:text-zinc-500"
                    />

                    {/* CATEGORY */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl 
                        bg-[#111] border border-white/10 
                        focus:outline-none focus:border-yellow-500"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* SORT */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-4 py-3 rounded-xl 
                        bg-[#111] border border-white/10 
                        focus:outline-none focus:border-yellow-500"
                    >
                        <option value="">Sort</option>
                        <option value="low-high">Duration ↑</option>
                        <option value="high-low">Duration ↓</option>
                    </select>
                </div>
            </div>

            {/* SERVICES GRID */}
            <div className="max-w-6xl mx-auto">

                {loading ? (
                    <div className="text-center text-zinc-500 py-20">
                        Loading services...
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="text-center text-zinc-500 py-20 border border-white/10 rounded-2xl bg-[#111]/50 backdrop-blur-md">
                        No services found
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredData.map((service) => (
                            <div
                                key={service._id}
                                className="transition hover:scale-[1.02]"
                            >
                                <ServiceCard
                                    service={service}
                                    isAdmin={user?.role === "admin"}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
}