import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        image: "",
    });

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
                "http://localhost:8080/api/services/",
                formData
            );

            alert("Service created ✅");

            navigate("/"); // go back home
        } catch (err) {
            console.log(err);
            alert("Error creating service ❌");
        }
    };

    return (
        <div>
            <h2>Create Service</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="description" placeholder="Description" onChange={handleChange} />
                <input name="price" placeholder="Price" type="number" onChange={handleChange} />
                <input name="duration" placeholder="Duration" type="number" onChange={handleChange} />
                <input name="category" placeholder="Category" onChange={handleChange} />
                <input name="image" placeholder="Image URL" onChange={handleChange} />

                <button type="submit">Create Service</button>

            </form>

        </div>
    );
}