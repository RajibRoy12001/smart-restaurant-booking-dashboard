import { FiUser, FiBell, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const AdminNavbar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  // Dynamic title
  const getTitle = () => {
    if (location.pathname.includes("bookings")) return "Bookings";
    if (location.pathname.includes("users")) return "Users";
    if (location.pathname.includes("analytics")) return "Analytics";
    return "Dashboard";
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Toggle */}
        <FiMenu
          size={20}
          className="cursor-pointer text-gray-700 hover:text-[#d4af37]"
          onClick={() => setCollapsed(!collapsed)}
        />

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800">
          {getTitle()}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell className="text-gray-600 hover:text-[#d4af37]" size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-black font-bold">
            A
          </div>
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;