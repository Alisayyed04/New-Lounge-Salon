import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useState } from "react";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        showAlert("Logged out", "success");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:pl-20 md:pr-6 py-4 flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-semibold tracking-wide bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                >
                    New Lounge
                </Link>

                <div className="flex items-center gap-4 md:hidden">
                    {/* 📱 WhatsApp */}
                    <a
                        href="https://wa.me/918766613766"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 text-xl"
                    >
                        <i className="ri-whatsapp-fill"></i>
                    </a>

                    {/* 📸 Instagram */}
                    <a
                        href="https://instagram.com/shamaa_makeup_artist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 text-xl"
                    >
                        <i className="ri-instagram-fill"></i>
                    </a>

                    {/* 🍔 Hamburger */}
                    <button
                        className="text-white text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>
                {/* DESKTOP MENU */}
                <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">

                    <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
                    <li><Link to="/services" className="hover:text-yellow-500">Services</Link></li>

                    {token && (
                        <li>
                            <Link to="/booking/mybooking" className="hover:text-yellow-500">
                                Bookings
                            </Link>
                        </li>
                    )}

                    <li><Link to="/about" className="hover:text-yellow-500">About</Link></li>
                    <li><Link to="/contact" className="hover:text-yellow-500">Contact</Link></li>

                    {!token ? (
                        <div className="flex items-center gap-3 ml-4">
                            <Link
                                to="/login"
                                className="px-4 py-1.5 rounded-lg border border-white/10 text-zinc-300 hover:border-yellow-500 hover:text-yellow-500"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-900 to-red-700 text-white"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 ml-4">

                            {user?.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt="profile"
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 text-sm font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <span className="text-sm text-zinc-400">
                                Hello{" "}
                                <span className="text-white font-semibold">
                                    {user?.name?.split(" ")[0] || "User"}
                                </span>
                            </span>

                            <button
                                onClick={handleLogout}
                                className="ml-2 px-3 py-1.5 rounded-lg bg-red-900 text-white text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </ul>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-zinc-300 text-sm bg-black/90 backdrop-blur-lg">

                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>

                    {token && (
                        <Link to="/booking/mybooking" onClick={() => setMenuOpen(false)}>
                            Bookings
                        </Link>
                    )}

                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

                    {!token ? (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                {user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 text-sm">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span>{user?.name}</span>
                            </div>

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="bg-red-900 px-3 py-1 rounded text-white w-fit"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}