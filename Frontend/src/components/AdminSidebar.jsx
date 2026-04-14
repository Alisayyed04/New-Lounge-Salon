import { Link } from "react-router-dom";

export default function AdminSidebar({ isOpen, setIsOpen }) {
    return (
        <>
            {/* OVERLAY */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition"
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-64 z-50 
                bg-gradient-to-b from-[#0a0a0a] to-[#111] 
                border-r border-white/10 
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-6 text-yellow-500">
                        Admin Panel
                    </h3>

                    <ul className="space-y-4 text-zinc-300 text-sm">

                        <li>
                            <Link to="/admin/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-yellow-500 transition">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/create"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-yellow-500 transition">
                                Create Admin
                            </Link>
                        </li>

                        <li>
                            <Link to="/createservice"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-yellow-500 transition">
                                Create Service
                            </Link>
                        </li>

                        <li>
                            <Link to="/services"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-yellow-500 transition">
                                Edit Service
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/bookings"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-yellow-500 transition">
                                All Bookings
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>

            {/* TOGGLE BUTTON (ONLY WHEN CLOSED) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed top-5 left-5 z-50 px-3 py-2 rounded-lg 
                    bg-black/60 backdrop-blur-md border border-white/10 
                    text-white hover:border-yellow-500 transition"
                >
                    ☰
                </button>
            )}
        </>
    );
}