import React from "react";
import {
  FaHome,
  FaUserMd,
  FaCalendarCheck,
  FaCog,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-cyan-500" : "text-gray-500";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="h-screen w-20 bg-white shadow-md flex flex-col justify-between items-center py-6 fixed top-0 left-0 z-50">
      {/* Logo / Home Button */}
      <div className="flex flex-col items-center space-y-6">
        <div
          className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-white text-xl cursor-pointer"
          onClick={() => navigate("/patient/dashboard")}
        >
          H
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col items-center space-y-6 mt-8 text-xl pt-36">
          {/* Dashboard */}
          <FaHome
            className={`cursor-pointer hover:text-cyan-500 ${isActive("/patient/dashboard")}`}
            onClick={() => navigate("/patient/dashboard")}
            title="Dashboard"
          />

          {/* My Appointments */}
          <FaCalendarCheck
            className={`cursor-pointer hover:text-cyan-500 ${isActive("/my-appointments")}`}
            onClick={() => navigate("/my-appointments")}
            title="My Appointments"
          />

          {/* All Doctors */}
          <FaUserMd
            className={`cursor-pointer hover:text-cyan-500 ${isActive("/all-doctors")}`}
            onClick={() => navigate("/all-doctors")}
            title="All Doctors"
          />
        </div>
      </div>

      {/* Logout Button */}
      <div
        className="text-red-500 text-2xl cursor-pointer"
        onClick={handleLogout}
        title="Logout"
      >
        <MdLogout />
      </div>
    </div>
  );
};

export default Sidebar;