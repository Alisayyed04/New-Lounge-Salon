import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔒 Logout helper
    const handleLogout = (() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }, [navigate]);

    // ✅ AUTH + FETCH (FIXED)
    useEffect(() => {
        const init = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            if (!token || user?.role !== "admin") {
                showAlert("Unauthorized ❌");
                navigate("/");
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:8080/api/services/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const service = res.data.data;

                setFormData({
                    name: service.name || "",
                    description: service.description || "",
                    price: service.price || "",
                    duration: service.duration || "",
                    category: service.category || "",
                });

                setLoading(false);
            } catch (err) {
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 403
                ) {
                    handleLogout();
                    return;
                }

                showAlert(
                    err.response?.data?.message ||
                    "Failed to load service ❌"
                );
                setLoading(false);
            }
        };

        init();
    }, []);

    // ✅ HANDLE INPUT
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setImageFile(files[0]);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // ✅ STRICT VALIDATION
    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (formData.name.length < 3) return "Name too short";

        if (!formData.description.trim()) return "Description required";
        if (formData.description.length < 10)
            return "Description too short";

        if (!formData.price || formData.price <= 0)
            return "Invalid price";

        if (!formData.duration || formData.duration < 5)
            return "Duration must be at least 5 mins";

        const validCategories = [
            "hair",
            "haircut",
            "skin & facial",
            "threading",
            "bridal",
            "coloring",
            "nails",
            "waxing",
            "makeup",
        ];
        if (!validCategories.includes(formData.category))
            return "Invalid category";

        if (imageFile) {
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedTypes.includes(imageFile.type)) {
                return "Invalid image type (jpg/png/webp only)";
            }

            if (imageFile.size > 2 * 1024 * 1024) {
                return "Image too large (max 2MB)";
            }
        }

        return null;
    };

    // ✅ SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            handleLogout();
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (imageFile) {
                data.append("image", imageFile);
            }

            await axios.put(
                `http://localhost:8080/api/services/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            showAlert("Service updated successfully ✅", "success");
            navigate("/services");
        } catch (err) {
            if (
                err.response?.status === 401 ||
                err.response?.status === 403
            ) {
                handleLogout();
                return;
            }

            showAlert(
                err.response?.data?.message ||
                "Failed to update ❌"
            );
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Service (Admin)</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Service Name"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />

                <input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >

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

                {/* 🔥 IMAGE UPDATE */}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button type="submit">Update Service</button>
            </form>
        </div>
    );
}