import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        image: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔒 Logout helper (declare FIRST)
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // 🔹 Fetch service (declare BEFORE useEffect)
    const fetchService = async (token) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFormData(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log("Fetch error:", err.response?.data || err.message);

            if (err.response?.status === 401 || err.response?.status === 403) {
                handleLogout();
                return;
            }

            setError("Failed to load service ❌");
            setLoading(false);
        }
    };

    // 🔒 AUTH CHECK + FETCH
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token || user?.role !== "admin") {
            alert("Unauthorized ❌");
            navigate("/");
            return;
        }

        fetchService(token);

    }, [id]);

    // 🔹 Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            handleLogout();
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/services/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Service updated ✅");
            navigate("/");

        } catch (err) {
            console.log("Update error:", err.response?.data || err.message);

            if (err.response?.status === 401 || err.response?.status === 403) {
                handleLogout();
                return;
            }

            setError("Failed to update ❌");
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Service (Admin)</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button type="submit">Update Service</button>
            </form>
        </div>
    );
}