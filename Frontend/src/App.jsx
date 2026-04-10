//LOGIN AND REGISTER ROUTE
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";

//SERVICE RELATED
import Services from "./pages/Services.jsx";
import EditService from "./pages/EditService.jsx";
import CreateService from "./pages/CreateService.jsx";

//BOOKING RELATED 
import BookingForm from "./pages/BookingForm.jsx"
import Booking from "./pages/Booking.jsx"
import MyBooking from "./pages/MyBooking.jsx";
import EditBooking from "./pages/EditBooking.jsx";

//COMPONENT
import Navbar from "./components/navbar.jsx";

//REACT
import { Routes, Route, BrowserRouter } from "react-router-dom";

//RANDOM
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx"

import Dashboard from "./pages/Booking.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        //RANDOM
        <Route path="/" element={<Home />} />
        //Basically my dashboard i can see all the bookings and services
        <Route path="/admin" element={<Admin />} />

        //USER LOGIN AND REGISTRATION
        //logs in user and goes to home page
        <Route path="/login" element={<LoginUser />} />
        //logs in user and goes to home page
        <Route path="/register" element={<RegisterUser />} />

        //SERVICE
        //show all services 
        <Route path="/services" element={<Services />} />
        //create a service only admin role can access this
        <Route path="/createservice" element={<CreateService />} />
        //edit a service only admin role can access this
        <Route path="/editservice/:id" element={<EditService />} />

        //BOOKING
        //show booking based on id 
        <Route path="/booking/:id" element={<Booking />} />
        //edit booking based on id
        <Route path="/editbooking/:id" element={<EditBooking />} />
        //create booking
        <Route path="/bookings/:id" element={<BookingForm />} />
        //show my bookings users booking
        <Route path="/booking/mybooking" element={<MyBooking />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;