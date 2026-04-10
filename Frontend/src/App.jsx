import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";

import Services from "./pages/Services.jsx";
import CreateService from "./pages/CreateService.jsx";
import EditService from "./pages/EditService.jsx"; // ✅ ADD THIS

import BookingForm from "./pages/BookingForm.jsx";
import Booking from "./pages/Booking.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import EditBooking from "./pages/EditBooking.jsx";

import Navbar from "./components/navbar.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import CreateAdmin from "./pages/CreateAdmin.jsx";
import AdminBookings from "./pages/AllBooking.jsx";
import AboutUs from "./pages/AboutUs.jsx";

function App() {

  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  return (
    <BrowserRouter>
      <Navbar setUser={setUser} />

      {user?.role === "admin" && (
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      <div
        style={{
          marginLeft: user?.role === "admin" && isOpen ? "200px" : "0px",
          transition: "all 0.3s ease",
          padding: "20px"
        }}
      >
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginUser setUser={setUser} />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          {/* BOOKINGS */}
          <Route path="/bookings/:id" element={<BookingForm />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking/mybooking" element={<MyBooking />} />
          <Route path="/editbooking/:id" element={<EditBooking />} />

          {/* ADMIN */}
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/create" element={<CreateAdmin />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/createservice" element={<CreateService />} />
          <Route path="/editservice/:id" element={<EditService />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;













// //LOGIN AND REGISTER ROUTE
// import LoginUser from "./pages/LoginUser";
// import RegisterUser from "./pages/RegisterUser";

// //SERVICE RELATED
// import Services from "./pages/Services.jsx";
// import EditService from "./pages/EditService.jsx";
// import CreateService from "./pages/CreateService.jsx";

// //BOOKING RELATED 
// import BookingForm from "./pages/BookingForm.jsx"
// import Booking from "./pages/Booking.jsx"
// import MyBooking from "./pages/MyBooking.jsx";
// import EditBooking from "./pages/EditBooking.jsx";

// //COMPONENT
// import Navbar from "./components/navbar.jsx";

// //REACT
// import { Routes, Route, BrowserRouter } from "react-router-dom";

// //RANDOM
// import Admin from "./pages/Admin.jsx";
// import Home from "./pages/Home.jsx"

// import Dashboard from "./pages/Booking.jsx";
// import CreateAdmin from "./pages/CreateAdmin.jsx";
// import AdminSidebar from "./components/AdminSidebar.jsx";
// import { useState } from "react";
// function App() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isOpen, setIsOpen] = useState(true);
//   return (

//     <BrowserRouter>
//       <Navbar />
//       <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//       <div
//         style={{
//           marginLeft:
//             user?.role === "admin" && isOpen ? "200px" : "0px",
//           transition: "all 0.3s ease"
//         }}
//       >
//         <Routes>
//           <Route path="/admin/dashboard" element={<Admin />} />
//           <Route path="/admin" element={<CreateAdmin />} />
//           <Route path="/createservice" element={<CreateService />} />
//           <Route path="/editservice/:id" element={<EditService />} />
//           <Route path="/editbooking/:id" element={<EditBooking />} />
//         </Routes>

//       </div>
//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginUser />} />
//         <Route path="/register" element={<RegisterUser />} />


//         {/* //SERVICE
//         //show all services  */}
//         <Route path="/services" element={<Services />} />

//         {/* //BOOKING
//         //show booking based on id  */}
//         <Route path="/bookings/:id" element={<BookingForm />} />
//         <Route path="/booking/:id" element={<Booking />} />
//         <Route path="/booking/mybooking" element={<MyBooking />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;