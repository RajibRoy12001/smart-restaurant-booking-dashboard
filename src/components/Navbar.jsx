import { useState, useEffect } from "react";
import Button from "./Button";
import BookingDrawer from "../booking/BookingDrawer";
import logo from "../assets/logo.png";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {

  const [openAuth, setOpenAuth] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState(null);

  // ✅ Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // ✅ 🔥 Add this here (extra safety)
useEffect(() => {
  const handleStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}, []);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Reserve click logic
  const handleReserve = () => {
    if (user) {
      setOpenDrawer(true); 
// already logged in
    } else {
      setOpenAuth(true);   // open login popup
    }
  };

  return (

    <>
      <nav
        className={`fixed w-full top-0 z-50 px-10 py-5 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "bg-[#021B1E]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >

        {/* Logo */}
        <img src={logo} className="h-10" />

        {/* Menu */}
        <ul className="flex gap-10 text-sm text-white">
          <li className="text-[#d4af37] cursor-pointer">HOME</li>
          <li className="hover:text-[#d4af37] cursor-pointer">ABOUT US</li>
          <li className="hover:text-[#d4af37] cursor-pointer">CONTACT US</li>
        </ul>

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-4 text-white">

            {/* Username */}
            <span className="text-sm">
              Hi, <span className="text-[#d4af37]">{user.name}</span>
            </span>

            {/* Reserve */}
           <button
          onClick={handleReserve}
          className="border border-[#d4af37] px-4 py-1 text-sm hover:bg-[#d4af37] hover:text-black transition">
           Reserve Your Table
            </button>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-gray-300 hover:text-red-400 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Button onClick={handleReserve} />
        )}

      </nav>

      {/* 🔐 LOGIN POPUP */}
      <AuthModal 
        open={openAuth} 
        setOpen={setOpenAuth} 
        onSuccess={() => {
          const storedUser = localStorage.getItem("user");
          console.log("📦 User from localStorage:", storedUser);
          if (storedUser) {
  const parsed = JSON.parse(storedUser); // ✅ update navbar instantly
            console.log("👤 Parsed User:", parsed); 
             setUser(parsed);
          }

          setOpenAuth(false);

          // 🔥 smooth UX delay
          setTimeout(() => setOpenDrawer(true), 300);
        }}
      />

      {/* 📅 Booking Sidebar */}
      <BookingDrawer 
        open={openDrawer} 
        setOpen={setOpenDrawer} 
        user={user}  
      />

    </>
  );
};

export default Navbar;