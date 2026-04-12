
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

export default function ServiceCard({ service, isAdmin }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this service?");
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

            showAlert("Service deleted", "success");
            window.location.reload();

        } catch (err) {
            showAlert(err.response?.data?.message || "Delete failed", "error");
        }
    };

    return (
        <div>
            <img
                src={service.image || "https://via.placeholder.com/200"}
                alt=""
                width="200"
            />

            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <h3>₹{service.price}</h3>
            <p>Category: {service.category}</p>
            <p>Duration: {service.duration} mins</p>

            <button onClick={() => navigate(`/bookings/${service._id}`)}>
                Book Now
            </button>

            {isAdmin && (
                <div>
                    <button onClick={() => navigate(`/editservice/${service._id}`)}>
                        Edit
                    </button>

                    <button onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}