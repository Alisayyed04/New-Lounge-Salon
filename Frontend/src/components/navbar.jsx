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
        <nav className="bg-[#fffaf7] text-gray-700 shadow-sm sticky top-0 z-50 border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-semibold tracking-wide text-pink-400"
                >
                    New Lounge
                </Link>

                {/* Links */}
                <ul className="flex items-center gap-6 text-sm font-medium">

                    <li>
                        <Link to="/" className="hover:text-pink-400 transition">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/services" className="hover:text-pink-400 transition">
                            Services
                        </Link>
                    </li>

                    {token && (
                        <li>
                            <Link
                                to="/booking/mybooking"
                                className="hover:text-pink-400 transition"
                            >
                                Bookings
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link to="/about" className="hover:text-pink-400 transition">
                            About
                        </Link>
                    </li>

                    <li>
                        <Link to="/contact" className="hover:text-pink-400 transition">
                            Contact
                        </Link>
                    </li>

                    {/* Auth Section */}
                    {!token ? (
                        <div className="flex items-center gap-3 ml-4">

                            <Link
                                to="/login"
                                className="px-4 py-1.5 rounded-full border border-pink-300 text-pink-500 hover:bg-pink-50 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-1.5 rounded-full bg-pink-400 text-white hover:bg-pink-500 transition shadow-sm"
                            >
                                Register
                            </Link>

                        </div>
                    ) : (
                        <div className="flex items-center gap-3 ml-4">

                            {/* Profile */}
                            {user?.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt="profile"
                                    className="w-9 h-9 rounded-full object-cover border border-pink-200"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-sm font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Username */}
                            <span className="text-sm">
                                Hello {" "}
                                <span className="font-semibold text-gray-900">
                                    {user?.name?.split(" ")[0] || "User"}
                                </span>
                            </span>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="ml-2 px-3 py-1.5 rounded-full bg-pink-400 text-white hover:bg-pink-500 transition text-sm shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
}