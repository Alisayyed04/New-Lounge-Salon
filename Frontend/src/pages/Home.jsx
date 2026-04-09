import { useParams } from "react-router-dom"
import Navbar from "../components/navbar.jsx"
export default function Home() {
    const userID = useParams();
    return (
        <>
            <h1>Home</h1>
            <p>Welcome {userID.name}</p>
        </>
    )
}