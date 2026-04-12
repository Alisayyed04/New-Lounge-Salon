import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { useAlert } from "../context/AlertContext";

export default function Booking() {
    let { id: ID } = useParams();
    let [data, setData] = useState(null);
    const { showAlert } = useAlert();

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");

            try {
                let res = await axios.get(
                    "http://localhost:8080/api/bookings/" + ID,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(res.data.data);
                showAlert("Booking loaded successfully", "success");

            } catch (err) {
                showAlert(
                    err.response?.data?.message || "Failed to fetch booking"
                );
            }
        };

        getData();
    }, [ID]);

    return (
        <>
            <h2>Bookings</h2>
            <div>
                {data && (
                    <BookingCard
                        booking={data}
                        showActions={false}
                    />
                )}
            </div>
        </>
    );
}