import { useState, useEffect , useRef} from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BookingDrawer from "../booking/BookingDrawer";
import logo from "../assets/logo.png";
import AuthModal from "../auth/AuthModal";
import { FiChevronDown } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";


const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [user, setUser] = useState(null);

const navigate = useNavigate(); 

const dropdownRef = useRef();

useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  // ✅ Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Sync user across tabs
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
    } else {
      setOpenAuth(true);
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
        <img src={logo} className="h-10" alt="logo" />

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

<div ref={dropdownRef} className="relative">
 <button
  onClick={(e) => {
    e.stopPropagation();
    setOpenDropdown(!openDropdown);
  }}
  className="flex items-center gap-2 cursor-pointer group"
>
  {/* 🟡 Avatar */}
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-yellow-500 flex items-center justify-center text-black font-semibold">
    {user.name?.charAt(0).toUpperCase()}
  </div>

  {/* 🟡 Text */}
  <div className="flex items-center">
    <span className="text-base text-gray-300">Hi,</span>

    <span className="ml-1 text-lg font-medium tracking-wide bg-gradient-to-r from-[#d4af37] to-yellow-400 bg-clip-text text-transparent transition duration-300 group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">
      {user.name}
    </span>
  </div>

  {/* 🔽 Icon */}
  <FiChevronDown
    size={20}
    className={`ml-1 transition-all duration-200 ${
      openDropdown ? "rotate-180" : ""
    } opacity-70 group-hover:opacity-100`}
  />
</button>

  {openDropdown && (
    <div className="absolute right-0 mt-4 w-50 bg-[#021B1E]/95 backdrop-blur-md border border-[#d4af37] rounded-xl shadow-lg overflow-hidden z-50">

      <button
        onClick={() => {
          navigate("/booking-details");
          setOpenDropdown(false);
        }}
        className="w-full text-left px-5 py-2 text-sm text-white hover:bg-[#d4af37]/20 transition"
      >
         Booking Details
      </button>

      <button
        onClick={() => {
          navigate("/Offer");
          setOpenDropdown(false);
        }}
        className="w-full text-left px-5 py-2 text-sm text-white hover:bg-[#d4af37]/20 transition"
      >
         View Offers
      </button>

    </div>
  )}
</div>

            {/* Reserve */}
<button
  onClick={handleReserve}
  className="border border-[#d4af37] px-5 py-2 text-base font-medium hover:bg-[#d4af37] hover:text-black transition rounded-lg"
>
  Reserve Your Table
</button>

{/* Logout */}
<button
  onClick={handleLogout}
  className="flex items-center gap-2 text-base text-gray-300 hover:text-red-400 transition group"
>
  <FiLogOut
    size={18}
    className="transition group-hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]"
  />
  <span className="group-hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]">
    Logout
  </span>
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
            const parsed = JSON.parse(storedUser);
            console.log("👤 Parsed User:", parsed);
            setUser(parsed);
          }

          setOpenAuth(false);

          // smooth UX delay
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