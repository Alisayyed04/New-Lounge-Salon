import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ get user OUTSIDE useEffect
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/services"
                );

                setData(req.data.data);
            } catch (e) {
                console.log("Error:", e.message || e.response);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Services</h2>

            {loading ? (
                <p>Loading...</p>
            ) : data.length === 0 ? (
                <p>No services found</p>
            ) : (
                data.map((service) => (
                    <ServiceCard
                        key={service._id}
                        service={service}
                        isAdmin={user?.role === "admin"}
                    />
                ))
            )}
        </div>
    );
}