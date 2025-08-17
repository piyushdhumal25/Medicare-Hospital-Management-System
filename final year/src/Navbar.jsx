import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToHome, setScrollToHome] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollToHome && location.pathname === "/") {
      setTimeout(() => {
        const el = document.getElementById("home");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setScrollToHome(false);
      }, 400); // increased delay for DOM readiness
    }
  }, [location, scrollToHome]);

  const user = JSON.parse(localStorage.getItem("user")); // { role: "admin" | "doctor" | "patient", ... }

  // Helper to get dashboard path by role
  const getDashboardPath = () => {
    if (!user?.role) return null;
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "doctor":
        return "/doctor/dashboard";
      case "patient":
        return "/patient/dashboard";
      default:
        return null;
    }
  };

  const dashboardPath = getDashboardPath();

  return (
    <nav className="bg-gradient-to-r from-white via-blue-300 to-gray-500 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-bold text-blue-600">MediCare</div>

        {/* Desktop Menu */}
        <div className="flex items-center justify-center space-x-12">
          <Link
            to="/"
            className="hover:text-white font-bold"
            onClick={e => {
              e.preventDefault();
              setScrollToHome(true);
              if (location.pathname !== "/") {
                navigate("/");
              } else {
                setTimeout(() => {
                  const el = document.getElementById("home");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setScrollToHome(false);
                }, 100);
              }
            }}
          >
            Home
          </Link>
          <Link
            to="/"
            className="hover:text-white font-bold"
            onClick={() => {
              setTimeout(() => {
                const el = document.getElementById("whyus");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            About
          </Link>
          <Link to="/Contact" className="hover:text-white font-bold">
            Contact
          </Link>
          <Link to="/donate" className="hover:text-white font-bold">
            Donate
          </Link>
          {user && dashboardPath && (
            <Link to={dashboardPath} className="hover:text-white font-bold">
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <Link to="/Login" className="hover:text-white font-bold">
                Login
              </Link>
              <Link to="/SignUp" className="hover:text-white font-bold">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}></button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 font-medium"
            onClick={e => {
              e.preventDefault();
              setScrollToHome(true);
              if (location.pathname !== "/") {
                navigate("/");
              } else {
                setTimeout(() => {
                  const el = document.getElementById("home");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setScrollToHome(false);
                }, 100);
              }
            }}
          >
            Home
          </Link>
          <Link
            to="/"
            className="block text-gray-700 font-medium"
            onClick={() => {
              setTimeout(() => {
                const el = document.getElementById("whyus");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            About
          </Link>
          <Link to="/Contact" className="block text-gray-700 font-medium">
            Contact
          </Link>
          <Link to="/donate" className="block text-gray-700 font-medium">
            Donate
          </Link>
          {user && dashboardPath && (
            <Link to={dashboardPath} className="block text-gray-700 font-medium">
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <Link to="/Login" className="block text-gray-700 font-medium">
                Login
              </Link>
              <Link to="/SignUp" className="block text-gray-700 font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;