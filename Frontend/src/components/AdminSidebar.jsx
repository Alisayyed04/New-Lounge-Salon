import { Link } from "react-router-dom";

export default function AdminSidebar({ isOpen, setIsOpen }) {


    return (
        <>
            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    top: "20px",
                    left: isOpen ? "210px" : "10px",
                    zIndex: 1000
                }}
            >
                {isOpen ? "⬅" : "➡"}
            </button>

            {/* SIDEBAR */}
            <div
                style={{
                    width: isOpen ? "200px" : "0px",
                    height: "100vh",
                    background: "gray",
                    padding: isOpen ? "20px" : "0px",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    transition: "all 0.3s ease"
                }}
            >
                {isOpen && (
                    <>
                        <h3>Admin Panel</h3>

                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li><Link to="/admin/create">Create Admin</Link></li>
                            <li><Link to="/createservice">Create Service</Link></li>
                            <li><Link to="/services">Edit Service</Link></li>
                            <li><Link to="/admin/bookings">All Bookings</Link></li>
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}