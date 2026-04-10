import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginUser() {
    const navigate = useNavigate();
    //state to manage the inputs 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    //setting data based on the input value
    const handleFormData = (e) => {
        setFormData((d) => {
            return { ...d, [e.target.name]: e.target.value }
        })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            //sending data to backend 
            const res = await axios.post(
                "http://localhost:8080/api/users/login",
                formData
            )
            console.log("success", res.data)

            localStorage.setItem("token", res.data.token)

            setFormData({
                email: "",
                password: "",
            })
        } catch (e) {
            console.log("Error", e.response?.data || e.message)
        }
    }
    return (
        <>

            <form onSubmit={handleForm}>


                <label htmlFor="email">Email</label>
                <input type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleFormData}
                    required /><br></br>

                <label htmlFor="pass">Password</label>
                <input type="password"
                    id="pass"
                    name="password"
                    required
                    onChange={handleFormData}
                    placeholder="Enter Password"
                    value={formData.password}
                    minLength="6" /><br></br>
                    //going to home page after successful login
                <button onClick={() => navigate("/",)}>Submit</button>
            </form>
        </>
    )
}