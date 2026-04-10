import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function RegisterUser() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        profilePic: null,
    })

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = new FormData()

            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key])
                }
            })

            const res = await axios.post(
                "http://localhost:8080/api/users/register",
                data
            )

            console.log("success", res.data)

            // store token if needed
            localStorage.setItem("token", res.data.token)

            // reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                address: "",
                profilePic: null,
            })

            // ✅ go to login page
            navigate("/")

        } catch (e) {
            console.log("Error", e.response?.data || e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleForm}>

            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                pattern="^[A-Za-z ]{3,50}$"
                title="Name must be 3-50 letters only"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value.trimStart() })
                }
                required
            /><br />

            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value.trim() })
                }
                required
            /><br />

            <label>Phone</label>
            <input
                type="tel"
                name="phone"
                pattern="^[6-9][0-9]{9}$"
                title="Enter valid 10-digit Indian number"
                placeholder="Enter Your phone number"
                value={formData.phone}
                onChange={handleFormData}
                required
            /><br />

            <label>Password</label>
            <input
                type="password"
                name="password"
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$"
                title="Min 6 chars, include uppercase, lowercase & number"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleFormData}
                required
            /><br />

            <label>Address</label>
            <textarea
                name="address"
                placeholder="Enter Your address"
                value={formData.address}
                onChange={handleFormData}
            /><br />

            <label>Profile Image</label>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    const file = e.target.files[0]

                    if (file) {
                        if (!file.type.startsWith("image/")) {
                            alert("Only images allowed")
                            return
                        }

                        if (file.size > 2 * 1024 * 1024) {
                            alert("Max file size is 2MB")
                            return
                        }

                        setFormData({ ...formData, profilePic: file })
                    }
                }}
            /><br />

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Submit"}
            </button>

        </form>
    )
}