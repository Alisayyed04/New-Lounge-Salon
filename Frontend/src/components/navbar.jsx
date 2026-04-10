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

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>

                {/* Only logged-in users */}
                {token && (
                    <li><Link to="/booking/mybooking">Bookings</Link></li>
                )}

                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {/* Auth Section */}
                {!token ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        {/* Optional: show user name */}
                        {/*Edit user route later */}
                        <button>  <li>Hello, {user?.name}</li></button>

                        {/* Optional: show profile pic */}
                        {user?.profilePic && (
                            <li>
                                <img
                                    src={user.profilePic}
                                    alt="profile"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />
                            </li>
                        )}

                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}