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

// 🔥 Separate component to use useLocation
function AppContent() {
  const location = useLocation();

  // ✅ Pages where navbar should be hidden
  const hideNavbarRoutes = [
    "/select-table",
    "/summary",
    "/email-confirmation"
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Navbar condition */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Flow pages */}
        <Route path="/select-table" element={<TableShowModal />} />
        <Route path="/summary" element={<ReservationSummary />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />

        <Route path="/success" element={<Success />} />
        <Route path="/booking-time" element={<TimeSlots />} />
      </Routes>

      {/* ✅ Optional: hide footer also if you want */}
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