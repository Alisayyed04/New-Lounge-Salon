
import axios from "axios"
import { useState, useEffect } from "react"
import ServiceCard from "../components/ServiceCard"

export default function Home() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:8080/api/services"
                );
                setData(req.data.data);
            } catch (e) {
                console.log("Error:", e.message || e.response);
            }
        };
        fetchData();
    }, []);

    return (
        <>

            <div >{data.map((data) => (
                <ServiceCard key={data._id}
                    service={data} />
            ))}
            </div>
        </>
    )
}