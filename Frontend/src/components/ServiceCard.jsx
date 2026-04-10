import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ServiceCard({ service, isAdmin }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this service?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `http://localhost:8080/api/services/${service._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Service deleted ✅");

            // simple refresh (you can optimize later)
            window.location.reload();

        } catch (err) {
            console.log("Delete error:", err.message || err.response);
            alert("Failed to delete ❌");
        }
    };

    return (
        <div >
            {/* Service Info */}
            <img
                src={service.image || "https://via.placeholder.com/200"}
                alt={service.name}
                width="200"
            />

            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <h3>₹{service.price}</h3>
            <p>Category: {service.category}</p>
            <p>Duration: {service.duration} mins</p>

            {/* USER ACTION */}
            <button onClick={() => navigate(`/bookings/${service._id}`)}>
                Book Now
            </button>

            <button onClick={() => navigate("/")}>
                View Gallery **Coming Soon**
            </button>

            {/* ADMIN ONLY */}
            {isAdmin && (
                <div>
                    <button onClick={() => {
                        console.log("EDIT CLICKED:", service._id);
                        navigate(`/editservice/${service._id}`);
                    }}>
                        Edit
                    </button>

                    <button onClick={handleDelete} >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}