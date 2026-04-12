
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
        <div style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            background: "#fff"
        }}>
            <img
                src={service.image || "https://via.placeholder.com/200"}
                alt=""
                style={{ width: "100%", borderRadius: "10px" }}
            />

            <h3>{service.name}</h3>
            <p style={{ color: "#666" }}>{service.description}</p>

            <p><strong>{service.category}</strong></p>
            <p>⏱ {service.duration} mins</p>

            <button
                onClick={() => navigate(`/bookings/${service._id}`)}
                style={{
                    marginTop: "10px",
                    padding: "8px",
                    width: "100%",
                    background: "#000",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none"
                }}
            >
                Book Now
            </button>

            {isAdmin && (
                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
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


// export default function ServiceCard({ service, isAdmin }) {
//     const navigate = useNavigate();
//     const { showAlert } = useAlert();

//     const handleDelete = async () => {
//         const confirmDelete = window.confirm("Delete this service?");
//         if (!confirmDelete) return;

//         const token = localStorage.getItem("token");

//         try {
//             await axios.delete(
//                 `http://localhost:8080/api/services/${service._id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             showAlert("Service deleted", "success");
//             window.location.reload();

//         } catch (err) {
//             showAlert(err.response?.data?.message || "Delete failed", "error");
//         }
//     };

//     return (
//         <div>
//             <img
//                 src={service.image || "https://via.placeholder.com/200"}
//                 alt=""
//                 width="200"
//             />

//             <h2>{service.name}</h2>
//             <p>{service.description}</p>
//             <p>Category: {service.category}</p>
//             <p>Duration: {service.duration} mins</p>

//             <button onClick={() => navigate(`/bookings/${service._id}`)}>
//                 Book Now
//             </button>

//             {isAdmin && (
//                 <div>
//                     <button onClick={() => navigate(`/editservice/${service._id}`)}>
//                         Edit
//                     </button>

//                     <button onClick={handleDelete}>
//                         Delete
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }