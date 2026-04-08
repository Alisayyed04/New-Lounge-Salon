import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import Services from "./pages/Services.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx"
import Booking from "./pages/Booking.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings/:id" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;