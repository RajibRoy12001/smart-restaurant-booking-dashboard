import { FaHome, FaClipboardList, FaUsers, FaChartBar,FaMoneyBillWave, FaUserCog , FaBell } from "react-icons/fa";
import { FiSettings ,FiGrid } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";


const AdminSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#021B1E] text-white transition-all duration-300 ${
        collapsed ? "w-20 p-3" : "w-64 p-5"
      }`}
    >

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
  {collapsed ? (
    //  Small version (collapsed)
    <div className="w-8 h-8 bg-[#d4af37] text-black flex items-center justify-center rounded-full font-bold">
      A
    </div>
  ) : (
    //  Full logo
    <img
      src={logo}
      alt="logo"
     className="h-10 object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
    />
  )}
</div>

      <ul className="space-y-3">

        {/* Dashboard */}
        <li
          onClick={() => navigate("/admin")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname === "/admin"
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          {/* Sliding bar */}
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname === "/admin"
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          {/* Icon */}
          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            <FaHome />
          </span>

          {/* Text */}
          {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
        </li>

        {/* Bookings */}
        <li
          onClick={() => navigate("/admin/bookings")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/bookings")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/bookings")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            <FaClipboardList />
          </span>

          {!collapsed && <span className="text-sm font-medium">Reservations</span>}
        </li>

        {/* Users */}
        <li
          onClick={() => navigate("/admin/customers")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/customers")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/customers")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            <FaUsers />
          </span>

          {!collapsed && <span className="text-sm font-medium">Customers</span>}
        </li>
            <li
          onClick={() => navigate("/admin/payment")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/payment")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/payment")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
             <FaMoneyBillWave />
          </span>

          {!collapsed && <span className="text-sm font-medium">PaymentRevenue</span>}
        </li>
         <li
          onClick={() => navigate("/admin/users")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/users")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/users")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
           <FaUserCog />
          </span>

          {!collapsed && <span className="text-sm font-medium">Manage User</span>}
        </li>


<li
          onClick={() => navigate("/admin/notifications")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/notifications")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/notifications")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
           <FaBell />
          </span>

          {!collapsed && <span className="text-sm font-medium">Notifications</span>}
        </li>

         <li
          onClick={() => navigate("/admin/tablesmanagement")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/tablesmanagement")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/tablesmanagement")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            
             <FiGrid />
          </span>

          {!collapsed && <span className="text-sm font-medium">Tablesmanagement</span>}
        </li>


        {/* Analytics */}
        <li
          onClick={() => navigate("/admin/settings")}
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 group
          ${
            location.pathname.startsWith("/admin/settings")
              ? "bg-[#d4af37]/20 text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              : "hover:bg-[#d4af37]/10"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 bg-[#d4af37] rounded-r transition-all duration-300
            ${
              location.pathname.startsWith("/admin/settings")
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          ></span>

          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
           <FiSettings />
          </span>

          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </li>

      </ul>
    </div>
  );
};

export default AdminSidebar;