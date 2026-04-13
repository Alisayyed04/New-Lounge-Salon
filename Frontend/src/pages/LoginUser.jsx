import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
export default function LoginUser({ setUser }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleFormData = (e) => {
        setFormData((d) => ({
            ...d,
            [e.target.name]: e.target.value,
        }));
    };

    const validateForm = () => {
        if (!formData.email.trim()) return "Email is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return "Invalid email format";

        if (!formData.password) return "Password is required";
        if (formData.password.length < 6)
            return "Password must be at least 6 characters";

        return null;
    };

    const handleForm = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        try {
            const res = await axios.post(
                `${API}/api/users/login`,
                formData
            );

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            setUser(res.data.user);

            showAlert("Login successful ✅", "success");

            setFormData({
                email: "",
                password: "",
            });

            if (res.data.user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (e) {
            showAlert(
                e.response?.data?.message || "Login failed ❌"
            );
        }
    };

    return (
        <section className="min-h-screen flex items-center pt-20 justify-center px-6 text-white ">

            <div className="w-full max-w-md">

                {/* TITLE */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold">
                        <span className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Welcome Back
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2">
                        Login to continue your experience
                    </p>
                </div>

                {/* FORM CARD */}
                <form
                    onSubmit={handleForm}
                    className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
                    border border-white/10 
                    backdrop-blur-xl 
                    rounded-2xl 
                    p-8 
                    shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                >

                    {/* EMAIL */}
                    <div className="mb-6">
                        <label className="block text-sm text-zinc-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleFormData}
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500 transition"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-8">
                        <label className="block text-sm text-zinc-400 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleFormData}
                            className="w-full px-4 py-3 rounded-lg 
                            bg-black border border-white/10 
                            text-white placeholder-zinc-500
                            focus:outline-none focus:border-yellow-500 transition"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl 
                        bg-gradient-to-r from-red-900 to-red-700 
                        hover:from-red-800 hover:to-red-600 
                        text-white font-medium 
                        transition shadow-lg"
                    >
                        Login
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-center text-zinc-500 text-sm mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-yellow-500 cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>

            </div>
        </section>
    );
}