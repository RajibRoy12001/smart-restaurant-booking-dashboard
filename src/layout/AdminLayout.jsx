import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); //  needed for animation

  return (
    <div className="flex min-h-screen bg-[#021B1E]">

      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} />

      {/* Right Section */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >

        {/* Navbar */}
        <div
          className={`fixed top-0 right-0 z-50 transition-all duration-300 ${
            collapsed ? "left-20" : "left-64"
          }`}
        >
          <AdminNavbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

        {/* Content */}
        <div className="mt-16 px-0 py-2">

          <div className="bg-white rounded-2xl p-8 min-h-[85vh] shadow-md w-full">

            {/*  PAGE ANIMATION */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

          </div>
<Footer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

      </div>
      
    </div>
  );
};

export default AdminLayout;