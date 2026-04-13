import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";

export default function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const { showAlert } = useAlert();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { name, email, password, phone } = formData;

        if (!name || !email || !password) {
            return "All fields are required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (phone && !phoneRegex.test(phone)) {
            return "Invalid phone number";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            showAlert(error);
            return;
        }

        try {
            await axios.post(
                `${API}/api/users/admin/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            showAlert("Admin created successfully", "success");

            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
            });
        } catch (err) {
            showAlert(
                err.response?.data?.message || "Error creating admin"
            );
        }
    };

    return (
        <section className="relative text-white px-6 py-20 max-w-3xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold">
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Create Admin
                    </span>
                </h2>
                <p className="text-zinc-400 text-sm mt-2">
                    Add a new administrator to the system
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

                <div className="space-y-6">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Email
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500"
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Phone (optional)
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500"
                        />
                    </div>

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
                    Create Admin
                </button>

            </form>

        </section>
    );
}