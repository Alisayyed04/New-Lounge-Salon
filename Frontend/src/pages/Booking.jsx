import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

export default function Bookings() {
    const navigate = useNavigate();
    const { id: ID } = useParams()
    let [serviceData, setServiceData] = useState({})
    let [formData, setFormData] = useState({
        date: "",
        time: "09:00",
        notes: "",
        totalPrice: 0,
    });

    useEffect(() => {
        const GetServiceId = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/services/" + ID
                );

                const service = req.data.data;
                setServiceData(service);

                // ✅ update price AFTER fetch
                setFormData((prev) => ({
                    ...prev,
                    totalPrice: service.price,
                }));

            } catch (e) {
                console.log(e.message || e.response);
            }
        };

        GetServiceId();
    }, [ID]);

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")

            const res = await axios.post("http://localhost:8080/api/bookings/",
                {
                    ...formData,
                    service: ID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("success", res.data)

            setFormData({
                date: "",
                time: "09:00",
                notes: "",
                totalPrice: serviceData.price,
            })
            console.log("TOKEN", token)
        } catch (e) {
            console.log(e.message || e.response)

        }
    }
    const handleFormData = (e) => {
        setFormData((d) => {
            return { ...d, [e.target.name]: e.target.value }
        })
    }

    return (
        <>
            <h1>Service Details </h1>
            <img src={serviceData.img} alt={serviceData.name} />
            <h2>Service Name:{serviceData.name}</h2>
            <p>{serviceData.description}</p>
            <h3>₹{serviceData.price}</h3>
            <p>{serviceData.category}</p>


            <form onSubmit={handleForm}>
                <label htmlFor="date">Date</label>
                <input type="date"
                    id="date"
                    name="date"
                    // placeholder="Enter Your FullName"
                    value={formData.date}
                    onChange={handleFormData} />
                <br></br>

                <label>Time</label>
                <select
                    name="time"
                    value={formData.time}
                    onChange={handleFormData}
                >
                    <option value="09:00">09:00</option>
                    <option value="11:00">11:00</option>
                </select>
                <br></br>

                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    // placeholder={Date().now}
                    // value={formData.date}
                    onChange={handleFormData} />
                <button onClick={() => navigate(`/dashboard`)}>Book Now</button>
            </form>
        </>
    )
}