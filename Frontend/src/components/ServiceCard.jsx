import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ServiceCard({ service }) {

    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure?");

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:8080/api/services/${service._id}`
            );

            alert("Deleted ✅");

            // quick refresh (simple way)
            window.location.reload();
        } catch (err) {
            console.log("Delete error:", err);
            alert("Failed ❌");
        }
    };
    return (
        <>
            <div >
                <img src={service.image || "https://via.placeholder.com/200"} alt={service.name} />
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <h3>₹{service.price}</h3>
                <p>{service.category}</p>
                <p>{service.duration}</p>
                <button onClick={() => navigate(`/bookings/${service._id}`)}>
                    Book Now
                </button>
                <button>View Gallery</button>
                <button onClick={() => navigate(`/editservice/${service._id}`)}>
                    Edit
                </button>
                <button onClick={handleDelete}>
                    Delete
                </button>
            </div>

        </>
    )
}