// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// export default function Navbar() {
//     const user = JSON.parse(localStorage.getItem("user")); // ✅ OUTSIDE JSX
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.clear(); // ✅ cleaner
//         navigate("/login");
//     };
//     return (
//         <nav>
//             <ul>
//                 {/* PUBLIC */}
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/services">Services</Link></li>
//                 <li><Link to="/aboutUs">About Us</Link></li>
//                 <li><Link to="/contact">Contact Us </Link> </li>
//                 {/* USER */}
//                 {user && (
//                     <li><Link to="/booking/mybooking">Bookings</Link></li>
//                 )}

//                 {/* ADMIN ONLY */}
//                 {user?.role === "admin" && (
//                     <>
//                         <li><Link to="/createservice">Create Service</Link></li>
//                         <li><Link to="/editservice">Edit Service</Link></li>
//                         <li><Link to="/editbooking">Edit Booking</Link></li>
//                         <li><Link to="/admin/dashboard">Admin</Link></li>
//                         <li><Link to="/admin/create">Create Admin</Link></li>
//                     </>
//                 )}


//                 {/* AUTH */}
//                 {!user ? (
//                     <>
//                         <li><Link to="/register">Register</Link></li>
//                         <li><Link to="/login">Login</Link></li>
//                     </>
//                 ) : (
//                     <li>
//                         <button onClick={handleLogout}>Logout</button>
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// }

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                {user && (
                    <li><Link to="/booking/mybooking">Bookings</Link></li>
                )}
                <li><Link to="/aboutUs">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {!user ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}