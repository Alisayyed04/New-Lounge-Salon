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
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">

            {/* IMAGE */}
            <div className="w-full aspect-square overflow-hidden">
                <img
                    src={service.image || "https://via.placeholder.com/300"}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

                {/* Title + Price */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {service.name}
                    </h3>
                    <span className="text-sm font-bold text-black">
                        ₹{service.price}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2">
                    {service.description}
                </p>

                {/* Category + Duration */}
                <div className="flex justify-between text-xs text-gray-400">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                        {service.category}
                    </span>
                    <span>⏱ {service.duration} mins</span>
                </div>

                {/* Book Button */}
                <button
                    onClick={() => navigate(`/bookings/${service._id}`)}
                    className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Book Now
                </button>

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => navigate(`/editservice/${service._id}`)}
                            className="flex-1 border border-gray-300 py-1 rounded-lg hover:bg-gray-100 text-sm"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
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