import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardCard from "../components/DashBoardCard";

export default function MyDashboard() {

    // ✅ must be array
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

                setData(req.data.data); // ✅ already array

            } catch (e) {
                console.log(e.message || e.response);
            }
        };

        getData();
    }, []); // ✅ no ID dependency

    return (
        <>
            <h2>My Bookings</h2>

            <div>
                {data.length === 0 ? (
                    <p>No bookings found</p>
                ) : (
                    data.map((booking) => (
                        <DashBoardCard
                            key={booking._id}
                            booking={booking}
                        />
                    ))
                )}
            </div>
        </>
    );
}