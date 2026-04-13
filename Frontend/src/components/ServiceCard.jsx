import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import API from "../config/api";
export default function ServiceCard({ service, isAdmin }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this service?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `${API}/api/services/${service._id}`,
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
        <div
            className="group flex flex-col h-full rounded-2xl overflow-hidden
            bg-gradient-to-b from-[#111] to-[#0a0a0a]
            border border-white/5
            shadow-[0_10px_40px_rgba(0,0,0,0.7)]
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.9)]
            hover:border-yellow-500/40
            transition-all duration-300 hover:scale-[1.02]"
        >

            {/* IMAGE */}
            <div className="relative w-full aspect-square overflow-hidden">
                <img
                    src={service.image || "https://via.placeholder.com/300"}
                    alt={service.name}
                    className="w-full h-full object-cover 
                    group-hover:scale-110 
                    transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">

                {/* TITLE + PRICE */}
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                        {service.name}
                    </h3>
                    <span className="text-sm font-semibold text-yellow-500">
                        ₹{service.price}
                    </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                    {service.description}
                </p>

                {/* CATEGORY + DURATION */}
                <div className="flex justify-between items-center text-xs mb-4">
                    <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        {service.category}
                    </span>

                    <span className="text-zinc-400">
                        ⏱ {service.duration} mins
                    </span>
                </div>

                {/* BUTTONS */}
                <div className="mt-auto">

                    {/* BOOK BUTTON */}
                    <button
                        onClick={() => navigate(`/bookings/${service._id}`)}
                        className="w-full py-2 rounded-full
                        bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600
                        text-black font-medium
                        hover:brightness-110
                        transition shadow-md"
                    >
                        Book Now
                    </button>

                    {/* ADMIN ACTIONS */}
                    {isAdmin && (
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => navigate(`/editservice/${service._id}`)}
                                className="flex-1 py-1.5 rounded-full
                                border border-white/10
                                text-zinc-300
                                hover:bg-white/5
                                transition text-sm"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex-1 py-1.5 rounded-full
                                bg-red-900/60 text-red-300
                                hover:bg-red-800
                                transition text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}