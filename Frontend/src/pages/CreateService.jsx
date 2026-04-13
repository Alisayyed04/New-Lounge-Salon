import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token || user?.role !== "admin") {
            showAlert("Unauthorized ❌");
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

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
                `${API}/api/services/`,
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
        <section className="text-white px-6 py-20 max-w-4xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Create Service
                    </span>
                </h2>
                <p className="text-zinc-400 text-sm mt-2">
                    Add a new service to your salon
                </p>
            </div>

            {/* FORM CARD */}
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-b from-[#111] to-[#0a0a0a]
                border border-white/10 
                backdrop-blur-xl 
                rounded-2xl 
                p-8 
                shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >

                <div className="grid md:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Service Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                        >
                            <option value="">Select Category</option>
                            <option value="hair">Hair</option>
                            <option value="haircut">Haircut</option>
                            <option value="skin & facial">Skin & Facial</option>
                            <option value="coloring">Coloring</option>
                            <option value="nails">Nails</option>
                            <option value="waxing">Waxing</option>
                            <option value="makeup">Makeup</option>
                            <option value="threading">Threading</option>
                            <option value="bridal">Bridal</option>
                        </select>
                    </div>

                    {/* PRICE */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Price (₹)
                        </label>
                        <input
                            name="price"
                            type="number"
                            min="1"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                    {/* DURATION */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Duration (mins)
                        </label>
                        <input
                            name="duration"
                            type="number"
                            min="5"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                    <label className="block text-sm text-zinc-400 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                    />
                </div>

                {/* IMAGE */}
                <div className="mt-6">
                    <label className="block text-sm text-zinc-400 mb-2">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full mt-8 py-3 rounded-xl 
                    bg-gradient-to-r from-red-900 to-red-700 
                    hover:from-red-800 hover:to-red-600 
                    text-white font-medium 
                    transition shadow-lg"
                >
                    Create Service
                </button>

            </form>

        </section>
    );
}