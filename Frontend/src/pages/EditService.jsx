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

    // 🔹 Fetch existing service
    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/services/${id}`
                );

                setFormData(res.data.data); // adjust if your API differs
                setLoading(false);
            } catch (err) {
                console.log("Error fetching service:", err);
            }
        };

        fetchService();
    }, [id]);

    // 🔹 Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const token = localStorage.getItem("token");
    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            //goes to home page
            navigate("/");
        } catch (err) {
            console.log("Update error:", err);
            alert("Failed to update ❌");
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Service</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    placeholder="Price"
                    onChange={handleChange}
                />

                <input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    placeholder="Duration"
                    onChange={handleChange}
                />

                <input
                    name="category"
                    value={formData.category}
                    placeholder="Category"
                    onChange={handleChange}
                />

                <input
                    name="image"
                    value={formData.image}
                    placeholder="Image URL"
                    onChange={handleChange}
                />

                <button type="submit">Update Service</button>
            </form>
        </div>
    );
}