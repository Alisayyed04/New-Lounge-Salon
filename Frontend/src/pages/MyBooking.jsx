import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";

export default function MyBooking() {


    let [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");

            try {
                let req = await axios.get(
                    "http://localhost:8080/api/bookings/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("success", req.data);

                setData(req.data.data);

            } catch (e) {
                console.log(e.message || e.response);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this booking?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `http://localhost:8080/api/bookings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setData((prev) => prev.filter((b) => b._id !== id));

        } catch (err) {
            console.log(err.message || err.response);
        }
    };

    return (
        <>
            <h2>My Bookings</h2>

            <div>
                {data.length === 0 ? (
                    <p>No bookings found</p>
                ) : (
                    data.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </>
    );
}