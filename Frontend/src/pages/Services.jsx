
import axios from "axios"
import { useState, useEffect } from "react"
import ServiceCard from "../components/ServiceCard"

export default function Home() {
    const [data, setData] = useState([])

    useEffect(() => {

        //this function is to send req to backend , to send the service data 
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
        //calling that function and using useEffect also the useEffect 
        //runs onetime on the component mount 
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