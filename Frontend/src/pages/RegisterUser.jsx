import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

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

    // ✅ STRICT VALIDATION
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
                "http://localhost:8080/api/users/register",
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
        <form onSubmit={handleForm}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        name: e.target.value.trimStart(),
                    })
                }
                required
            />
            <br />

            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        email: e.target.value.trim(),
                    })
                }
                required
            />
            <br />

            <label>Phone</label>
            <input
                type="tel"
                name="phone"
                placeholder="Enter Your phone number"
                value={formData.phone}
                onChange={handleFormData}
                required
            />
            <br />

            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleFormData}
                required
            />
            <br />

            <label>Address</label>
            <textarea
                name="address"
                placeholder="Enter Your address"
                value={formData.address}
                onChange={handleFormData}
            />
            <br />

            <label>Profile Image</label>
            <input
                type="file"
                accept="image/png, image/jpeg"
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
            <br />

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Submit"}
            </button>
        </form>
    );
}