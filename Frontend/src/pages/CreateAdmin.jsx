import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

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
                "http://localhost:8080/api/users/admin/create",
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
        <div>
            <h2>Create Admin</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <button type="submit">Create Admin</button>
            </form>
        </div>
    );
}