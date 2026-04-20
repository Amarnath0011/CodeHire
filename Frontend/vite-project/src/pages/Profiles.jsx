import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profiles() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  if (!user) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold">
            Please Login
          </h1>

          <p className="text-gray-400 mt-3">
            You need an account to access
            your profile.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Career Background"
          className="w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-slate-950/85"></div>
      </div>

      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg shadow-blue-500/20">
                {user.name?.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold">
                  {user.name}
                </h1>

                <p className="text-gray-400 mt-2">
                  {user.email}
                </p>

                <span className="inline-block mt-3 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize text-sm font-semibold">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold transition"
              >
                Manage Profile ⚙️
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                  <button className="w-full text-left px-5 py-3 hover:bg-white/5 transition">
                    Edit Profile
                  </button>

                  <button className="w-full text-left px-5 py-3 hover:bg-white/5 transition">
                    Complete Profile
                  </button>

                  <button className="w-full text-left px-5 py-3 hover:bg-white/5 transition">
                    Upload Resume
                  </button>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {[
            {
              title: "Applications",
              value: "12",
            },
            {
              title: "Saved Jobs",
              value: "08",
            },
            {
              title: "Interviews",
              value: "03",
            },
            {
              title: "Profile Score",
              value: "85%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <p className="text-gray-400 text-sm">
                {item.title}
              </p>

              <h3 className="text-3xl font-bold mt-2 text-blue-400">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mt-8">
          <h2 className="text-2xl font-bold">
            About Profile
          </h2>

          <p className="text-gray-400 mt-4 leading-relaxed">
            Welcome to your personal
            dashboard. Manage your profile,
            explore job opportunities, upload
            resume and track applications.
            Build a stronger career presence
            with CodeHire.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profiles;