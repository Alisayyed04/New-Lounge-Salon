import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
export default function RegisterUser() {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        profilePic: null,
    });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (!/^[A-Za-z ]{3,50}$/.test(formData.name))
            return "Name must be 3-50 letters only";

        if (!formData.email.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
            return "Invalid email format";

        if (!/^[6-9][0-9]{9}$/.test(formData.phone))
            return "Invalid phone number";

        if (!formData.password) return "Password required";
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(formData.password))
            return "Password must include uppercase, lowercase, number";

        if (formData.profilePic) {
            if (!formData.profilePic.type.startsWith("image/"))
                return "Only images allowed";

            if (formData.profilePic.size > 2 * 1024 * 1024)
                return "Image must be under 2MB";
        }

        return null;
    };

    const handleForm = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            const res = await axios.post(
                `${API}/api/users/register`,
                data
            );

            localStorage.setItem("token", res.data.token);

            showAlert("Registered successfully ✅", "success");

            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                address: "",
                profilePic: null,
            });

            navigate("/");
        } catch (e) {
            showAlert(
                e.response?.data?.message ||
                "Registration failed ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 text-white">

            <div className="w-full max-w-2xl">

                {/* TITLE */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold">
                        <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Create Account
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2">
                        Join New Lounge and elevate your experience
                    </p>
                </div>

                {/* FORM CARD */}
                {/* FORM CARD */}
                <form
                    onSubmit={handleForm}
                    className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
    border border-white/10 
    backdrop-blur-xl 
    rounded-2xl 
    p-8 md:p-10
    shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* NAME */}
                        <div>
                            <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value.trimStart(),
                                    })
                                }
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg 
                bg-black/80 border border-white/10 
                text-white placeholder:text-zinc-500
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30
                transition"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value.trim(),
                                    })
                                }
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg 
                bg-black/80 border border-white/10 
                text-white placeholder:text-zinc-500
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30
                transition"
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/\D/g, "");
                                    if (value.length > 10) return;

                                    setFormData((prev) => ({
                                        ...prev,
                                        phone: value,
                                    }));
                                }}
                                maxLength={10}
                                inputMode="numeric"
                                placeholder="9876543210"
                                className="w-full px-4 py-3 rounded-lg 
                bg-black/80 border border-white/10 
                text-white placeholder:text-zinc-500
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30
                transition"
                            />

                            <p className="text-xs text-zinc-600 mt-1">
                                10-digit Indian number (6–9 start)
                            </p>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormData}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg 
                bg-black/80 border border-white/10 
                text-white placeholder:text-zinc-500
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30
                transition"
                            />
                        </div>

                    </div>

                    {/* ADDRESS */}
                    <div className="mt-6">
                        <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                            Address
                        </label>
                        <textarea
                            name="address"
                            rows="3"
                            value={formData.address}
                            onChange={handleFormData}
                            placeholder="Enter your address..."
                            className="w-full px-4 py-3 rounded-lg 
            bg-black/80 border border-white/10 
            text-white placeholder:text-zinc-500
            focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30
            transition resize-none"
                        />
                    </div>

                    {/* FILE */}
                    <div className="mt-6">
                        <label className="block text-xs tracking-wide text-zinc-500 mb-2 uppercase">
                            Profile Image
                        </label>

                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="w-full text-sm text-zinc-400 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-lg file:border 
            file:border-white/10
            file:bg-black file:text-white 
            hover:file:bg-zinc-900 
            file:transition"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                    if (!file.type.startsWith("image/")) {
                                        showAlert("Only images allowed");
                                        return;
                                    }

                                    if (file.size > 2 * 1024 * 1024) {
                                        showAlert("Max file size is 2MB");
                                        return;
                                    }

                                    setFormData({
                                        ...formData,
                                        profilePic: file,
                                    });
                                }
                            }}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 py-3 rounded-xl 
        bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600
        text-black font-semibold tracking-wide
        hover:brightness-110 
        transition shadow-lg 
        disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-center text-zinc-500 text-sm mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-yellow-500 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </section>
    );
}