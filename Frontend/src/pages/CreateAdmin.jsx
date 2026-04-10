import { useState } from "react";
import axios from "axios";

export default function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            alert("Admin created successfully");

            // reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
            });
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Error creating admin");
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