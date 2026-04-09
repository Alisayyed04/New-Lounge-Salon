import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import DashBoardCard from "../components/DashBoardCard";


export default function Dashboard() {
    let { id: ID } = useParams()
    let [data, setData] = useState()


    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token")
            try {
                let req = await axios.get(
                    "http://localhost:8080/api/bookings/" + ID,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("success", req.data)
                let reqData = req.data.data;
                setData(reqData);
            }
            catch (e) {
                console.log(e.message || e.response)
            };
        }
        getData();
    }, [ID])

    return (
        <>
            <h2>Dashboard</h2>
            <div>
                {data && <DashBoardCard booking={data} />}

            </div>
        </>
    )
}

