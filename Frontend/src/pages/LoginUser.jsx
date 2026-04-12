import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function LoginUser({ setUser }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ✅ HANDLE INPUT
    const handleFormData = (e) => {
        setFormData((d) => ({
            ...d,
            [e.target.name]: e.target.value,
        }));
    };

    // ✅ VALIDATION
    const validateForm = () => {
        if (!formData.email.trim()) return "Email is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return "Invalid email format";

        if (!formData.password) return "Password is required";
        if (formData.password.length < 6)
            return "Password must be at least 6 characters";

        return null;
    };

    // ✅ SUBMIT
    const handleForm = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert(validationError);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/api/users/login",
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
        <>
            <form onSubmit={handleForm}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleFormData}
                    required
                />
                <br />

                <label htmlFor="pass">Password</label>
                <input
                    type="password"
                    id="pass"
                    name="password"
                    required
                    onChange={handleFormData}
                    placeholder="Enter Password"
                    value={formData.password}
                    minLength="6"
                />
                <br />

                <button type="submit">Submit</button>
            </form>
        </>
    );
}