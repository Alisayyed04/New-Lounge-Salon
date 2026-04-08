import { useState } from "react"
import axios from "axios"

export default function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        // profilePic: "",
    })

    const handleFormData = (e) => {
        setFormData((d) => {
            return { ...d, [e.target.name]: e.target.value }
        })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                "http://localhost:8080/api/users/register",
                formData
            )
            console.log("success", res.data)

            localStorage.setItem("token", res.data.token)

            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                address: "",
                // profilePic: "",
            })
        } catch (e) {
            console.log("Error", e.response?.data || e.message)
        }
    }
    return (
        <>
            <form onSubmit={handleForm}>
                <label htmlFor="name">Name</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Your FullName"
                    value={formData.name}
                    onChange={handleFormData}

                    required /><br></br>

                <label htmlFor="email">Email</label>
                <input type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleFormData}
                    required /><br></br>

                <label htmlFor="phone">Phone</label>
                <input type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter Your phone number"
                    value={formData.phone}
                    onChange={handleFormData}
                /><br></br>

                <label htmlFor="pass">Password</label>
                <input type="password"
                    id="pass"
                    name="password"
                    required
                    onChange={handleFormData}
                    placeholder="Enter Password"
                    value={formData.password}
                    minLength="6" /><br></br>

                <label htmlFor="add">Address</label>
                <textarea type="text"
                    id="add"
                    name="address"
                    placeholder="Enter Your address"
                    value={formData.address}
                    onChange={handleFormData} /><br></br>

                {/* <label htmlFor="image">Profile Picture</label>
                <input type="file"
                    id="image"
                    name="profilePic"
                    accept="image/*"
                    value={formData.profilePic}
                    onChange={handleFormData} /> */}
                <button>Submit</button>
            </form>

        </>
    )
}