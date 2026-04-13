import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function CreateService() {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        image: null,
    });

    // ✅ Protect route (ADMIN ONLY)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token || user?.role !== "admin") {
            showAlert("Unauthorized ❌");
            navigate("/");
        }
    }, []);

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // ✅ STRICT VALIDATION
    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (formData.name.length < 3) return "Name must be at least 3 characters";

        if (!formData.description.trim()) return "Description is required";
        if (formData.description.length < 10) return "Description too short";

        if (!formData.price || formData.price <= 0)
            return "Price must be greater than 0";

        if (!formData.duration || formData.duration < 5)
            return "Duration must be at least 5 mins";

        const validCategories = [
            "hair",
            "haircut",
            "skin & facial",
            "coloring",
            "nails",
            "waxing",
            "makeup",
            "threading",
            "bridal"
        ];
        if (!validCategories.includes(formData.category))
            return "Invalid category";

        if (!formData.image) return "Image is required";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("duration", formData.duration);
            data.append("category", formData.category);

            if (formData.image) {
                data.append("image", formData.image);
            }

            await axios.post(
                "http://localhost:8080/api/services/",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            showAlert("Service created successfully ✅", "success");
            navigate("/");

        } catch (err) {
            showAlert(
                err.response?.data?.message || "Error creating service ❌"
            );
        }
    };

    return (
        <div>
            <h2>Create Service (Admin)</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Service Name"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    placeholder="Price"
                    type="number"
                    min="1"
                    onChange={handleChange}
                    required
                />

                <input
                    name="duration"
                    placeholder="Duration (mins)"
                    type="number"
                    min="5"
                    onChange={handleChange}
                    required
                />

                <select name="category" onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="hair">Hair</option>
                    <option value="haircut">Haircut</option>
                    <option value="skin & facial">Skin & Facial </option>
                    <option value="coloring">Coloring</option>
                    <option value="nails">Nails</option>
                    <option value="waxing">Waxing</option>
                    <option value="makeup">Makeup</option>
                    <option value="threading">Threading</option>
                    <option value="bridal">Bridal</option>
                </select>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Service</button>
            </form>
        </div>
    );
}