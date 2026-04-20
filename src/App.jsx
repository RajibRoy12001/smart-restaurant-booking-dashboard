import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import ReservationSummary from "./pages/ReservationSummary";
import TableShowModal from "./pages/TableShowModal";
import EmailConfirmation from "./pages/EmailConfirmation";
import TimeSlots from "./booking/TimeSlots";
import BookingDetails from "./pages/BookingDetails";
import Offer from "./pages/Offer";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Payment from "./pages/PaymentsRevenue";
import Notifications from "./pages/Notifications";
import TablesManagement from "./pages/Tablesmanagement";

//  Separate component to use useLocation
function AppContent() {
  const location = useLocation();
 // Admin Auth Check


  //  Pages where navbar should be hidden
  const hideNavbarRoutes = [
    "/select-table",
    "/summary",
    "/email-confirmation",
    "/admin",
  "/admin/bookings",
  "/admin/customers",
  "/admin/users",
  "/admin/analytics",
  "/admin/payment",
  "/admin/notifications"

  ];

  const shouldHideNavbar =
  location.pathname.startsWith("/admin") ||
  hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {/*  Navbar condition */}
      {!shouldHideNavbar && <Navbar />}

    <Routes>
 
  
      {/* ADMIN ROUTES */}
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="bookings" element={<Bookings />} />
  <Route path="customers" element={<Customers />} />
  <Route path="payment" element={<Payment />} />
  <Route path="notifications" element={<Notifications />} />
  <Route path="users" element={<Users />} />
  <Route path="tablesmanagement" element={<TablesManagement />} />
  <Route path="analytics" element={<Analytics />} />
</Route>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/Offer" element={<Offer />} />

        {/* FLOW */}
        <Route path="/select-table" element={<TableShowModal />} />
        <Route path="/summary" element={<ReservationSummary />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />

        <Route path="/success" element={<Success />} />
        <Route path="/booking-time" element={<TimeSlots />} />

      </Routes>


      {/*  Optional: hide footer also if you want */}
      {!shouldHideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;