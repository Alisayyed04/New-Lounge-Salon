import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
    const [data, setData] = useState({});

    useEffect(() => {
        //shows all bookings 
        const fetch = async () => {
            const token = localStorage.getItem("token")
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log("success", req.data.data)
                setData(req.data.data)
            } catch (e) {
                console.log(e.message || e.response)
            }
        }
        fetch();
    }, [])

    //want this to be my dashboard where i can do anything based on the sidebar 
    //i can create services edit them delete them 
    //i can manage the bookings 
    return (
        <>
            {console.log(data)}
            <h1>Admin</h1>
        </>
    )
}