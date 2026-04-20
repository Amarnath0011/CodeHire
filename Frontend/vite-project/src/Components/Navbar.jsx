import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
      <Link to="/" className="text-2xl font-bold text-blue-500">
        CodeHire
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/jobs">Jobs</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            {user.role === "student" ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <Link to="/recruiter">Dashboard</Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;