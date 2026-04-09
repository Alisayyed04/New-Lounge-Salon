import { Link } from "react-router-dom"
export default function navbar() {

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/booking/mybooking">Bookings</Link></li>
                    {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                    <li><Link to="/editservice">Edit Service </Link></li>
                    <li><Link to="/editbooking">Edit Booking</Link></li>
                    <li><Link to="/createservice">Create Service </Link></li>

                    <li><Link to="/admin">Admin </Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </>
    )
}