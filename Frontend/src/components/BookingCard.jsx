
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function BookingCard({ booking, onDelete }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    if (!booking) return null;

    return (
        <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px" }}>
            {booking?.service?.image ? (
                <img src={booking.service.image} alt="" width="120" />
            ) : (
                <p>No Image</p>
            )}

            <h3>{booking?.service?.name}</h3>
            <p>Category: {booking?.service?.category}</p>
            <p>Price: ₹{booking?.totalPrice}</p>
            <p>Date: {booking?.date?.split("T")[0]}</p>
            <p>Time: {booking?.time}</p>
            <p>Status: {booking?.status}</p>

            {isAdmin && <p>User: {booking?.user?.name}</p>}
            {booking?.notes && <p>Notes: {booking.notes}</p>}

            {isAdmin && (
                <>
                    <button onClick={() => navigate(`/editbooking/${booking._id}`)}>
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            onDelete?.(booking._id);
                            showAlert("Booking deleted", "success");
                        }}
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}