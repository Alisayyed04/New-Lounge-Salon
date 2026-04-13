import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function BookingCard({ booking, onDelete }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    if (!booking) return null;

    // ✅ FIX CLOUDINARY IMAGE
    const getImage = () => {
        if (booking?.service?.image?.url) return booking.service.image.url;
        if (booking?.service?.image) return booking.service.image;
        if (booking?.service?.img) return booking.service.img;
        return "/photos/default-service.jpg";
    };

    const date = booking?.date?.split("T")[0];

    return (
        <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] 
        border border-white/5 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        hover:shadow-yellow-500/10 
        hover:border-yellow-500/40 
        transition-all duration-300">

            {/* IMAGE */}
            <div className="relative">
                <img
                    src={getImage()}
                    alt={booking?.service?.name}
                    className="w-full h-48 object-cover"
                />

                {/* DATE BADGE */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white border border-white/10">
                    {date}
                </div>

                {/* PRICE */}
                <div className="absolute bottom-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    ₹{booking?.totalPrice}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-yellow-500">
                    {booking?.service?.name}
                </h3>

                {/* CATEGORY + TIME */}
                <p className="text-zinc-400 text-sm mt-1">
                    {booking?.service?.category} • {booking?.time}
                </p>

                {/* STATUS */}
                <div className="mt-3">
                    <span
                        className={`px-3 py-1 text-xs rounded-full font-medium
                        ${booking?.status === "pending"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : booking?.status === "confirmed"
                                    ? "bg-green-900/30 text-green-400"
                                    : booking?.status === "completed"
                                        ? "bg-blue-900/30 text-blue-400"
                                        : "bg-red-900/30 text-red-400"
                            }`}
                    >
                        {booking?.status}
                    </span>
                </div>

                {/* NOTES */}
                {booking?.notes && (
                    <p className="text-zinc-500 text-sm mt-3 italic border-l border-yellow-500/30 pl-3">
                        {booking.notes}
                    </p>
                )}

                {/* ADMIN */}
                {isAdmin && (
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={() =>
                                navigate(`/editbooking/${booking._id}`)
                            }
                            className="flex-1 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-sm"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => {
                                onDelete?.(booking._id);
                                showAlert("Booking deleted", "success");
                            }}
                            className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}