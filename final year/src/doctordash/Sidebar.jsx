import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Change to use Lucide React icons like admin dashboard

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/doctordashboard" },
    { name: "Appointments", path: "/doctordashboard/appointments" },
    { name: "Profile", path: "/doctordashboard/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-60 bg-gradient-to-b from-blue-50 to-white shadow-xl border-r min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-10 text-center tracking-wide">
          Medicare
        </h2>
        <div className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-5 py-3 rounded-xl text-sm font-semibold transition duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button with Icon */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
