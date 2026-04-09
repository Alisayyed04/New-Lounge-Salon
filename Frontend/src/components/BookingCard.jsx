import { useNavigate } from "react-router-dom";

export default function BookingCard({ booking, onDelete }) {
    const navigate = useNavigate();

    return (
        <div>
            <h3>{booking.service?.name}</h3>
            <p>User: {booking.user?.name}</p>
            <p>Date: {booking.date?.split("T")[0]}</p>
            <p>Time: {booking.time}</p>
            <p>Status: {booking.status}</p>

            <button onClick={() => navigate(`/editbooking/${booking._id}`)}>
                Edit
            </button>

            <button onClick={() => onDelete(booking._id)}>
                Delete
            </button>
        </div>
    );
}