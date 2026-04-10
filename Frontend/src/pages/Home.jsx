import { useParams } from "react-router-dom"
export default function Home() {
    const userID = useParams();
    //main page of the site will have the navbar to go anywhere on the site
    return (
        <>
            <h1>Home</h1>
            <p>Welcome {userID.name}</p>
        </>
    )
}