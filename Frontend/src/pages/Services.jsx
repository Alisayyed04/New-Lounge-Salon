import axios from "axios";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { useAlert } from "../context/AlertContext";

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/services"
                );

                setData(req.data.data);
            } catch (e) {
                showAlert(
                    e.response?.data?.message ||
                    "Failed to load services ❌"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [showAlert]);

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