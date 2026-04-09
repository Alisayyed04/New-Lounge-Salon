import { useNavigate } from "react-router-dom"

export default function DashBoardCard({ booking }) {
    const navigate = useNavigate();
    let { user } = booking
    return (
        <>
            <div>
                <h3>{booking.service?.name}</h3>
                <p>User: {booking.user?.name}</p>
                <p>Date: {booking.date}</p>
                <p>Time: {booking.time}</p>
                <p>Status: {booking.status}</p>
                <button onClick={() => navigate(`/Dashboard/MyDashboard`)}>My Bookings</button>
            </div>
        </>
    )
}