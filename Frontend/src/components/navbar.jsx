
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        showAlert("Logged out", "success");
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