import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import Services from "./pages/Services.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx"
import BookingForm from "./pages/BookingForm.jsx"
import Booking from "./pages/Booking.jsx"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MyBooking from "./pages/MyBooking.jsx";
import Admin from "./pages/Admin.jsx";
import CreateService from "./pages/CreateService.jsx";
import EditService from "./pages/EditService.jsx";
import EditBooking from "./pages/EditBooking.jsx";
import Dashboard from "./pages/Booking.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/services" element={<Services />} />
        <Route path="/createservice" element={<CreateService />} />
        <Route path="/editservice/:id" element={<EditService />} />
        <Route path="/editbooking/:id" element={<EditBooking />} />
        <Route path="/bookings/:id" element={<BookingForm />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking/mybooking" element={<MyBooking />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;