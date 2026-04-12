import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";

export default function Admin() {
    const [data, setData] = useState([]);
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    "http://localhost:8080/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(res.data.data);
                showAlert("Bookings loaded successfully", "success");

            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to fetch bookings"
                );
            }
        };

        fetchBookings();
    }, []);

    return (
        <>
            <h1>Admin</h1>
            <h2>Name: {data._id}</h2>
        </>
    );
}