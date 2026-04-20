import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            C
          </div>

          <span className="text-2xl font-extrabold text-white">
            Code
            <span className="text-blue-500">
              Hire
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <Link
            to="/jobs"
            className="hover:text-white transition"
          >
            Jobs
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-white font-semibold transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Dashboard */}
              <Link
                to={
                  user.role ===
                  "student"
                    ? "/dashboard"
                    : "/recruiter"
                }
                className="hover:text-white transition"
              >
                Dashboard
              </Link>

              {/* Welcome Text */}
              <span className="text-sm text-gray-400">
                Hi, {user.name}
              </span>

              {/* Profile Icon */}
              <Link
                to="/profile"
                title="Profile"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition flex items-center justify-center"
              >
                <span className="text-lg">
                  👤
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-slate-950 border-t border-white/10">
          <div className="flex flex-col gap-4 pt-4 text-gray-300">
            <Link
              to="/jobs"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Jobs
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={
                    user.role ===
                    "student"
                      ? "/dashboard"
                      : "/recruiter"
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Profile
                </Link>

                <button
                  onClick={
                    handleLogout
                  }
                  className="bg-red-600 hover:bg-red-700 py-2 rounded-xl text-white font-semibold transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;