import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Active Jobs",
      value: "06",
      icon: "💼",
      color: "text-blue-400",
    },
    {
      title: "Applicants",
      value: "124",
      icon: "👥",
      color: "text-green-400",
    },
    {
      title: "Interviews",
      value: "12",
      icon: "🎯",
      color: "text-pink-400",
    },
    {
      title: "Hired",
      value: "04",
      icon: "🚀",
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-blue-500/20">
          <p className="uppercase tracking-widest text-sm text-blue-100 font-semibold">
            Recruiter Dashboard
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3">
            Welcome back, {user?.name}
          </h1>

          <p className="text-white/90 mt-4 max-w-2xl">
            Manage hiring, post jobs, review applicants and build your team faster with CodeHire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Highlighted Post Job */}
            <Link
              to="/post-job"
              className="bg-white text-slate-900 hover:bg-gray-100 px-7 py-4 rounded-xl font-bold transition text-center animate-pulse"
            >
              + Post New Job
            </Link>

            <Link
              to="/my-jobs"
              className="border border-white/30 bg-white/10 hover:bg-white/15 px-7 py-4 rounded-xl font-semibold transition text-center"
            >
              Manage Jobs
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:bg-white/10 transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">
                    {item.title}
                  </p>

                  <h3
                    className={`text-4xl font-extrabold mt-3 ${item.color}`}
                  >
                    {item.value}
                  </h3>
                </div>

                <span className="text-3xl">
                  {item.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Action Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Highlighted Post Job Card */}
          <Link
            to="/post-job"
            className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl shadow-blue-500/20 hover:scale-[1.01] transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="uppercase tracking-widest text-sm text-blue-100 font-semibold">
                  Priority Action
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
                  Post a New Job Opening
                </h2>

                <p className="text-white/90 mt-4 max-w-xl">
                  Reach thousands of students and professionals instantly by posting your new vacancy today.
                </p>
              </div>

              <div className="text-7xl">
                🚀
              </div>
            </div>
          </Link>

          {/* Company Profile */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
            <h2 className="text-2xl font-bold">
              Company Profile
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Update your company details, hiring preferences and brand presence.
            </p>

            <button className="mt-6 bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold transition w-full">
              Update Profile
            </button>
          </div>
        </div>

        {/* Recent Hiring Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Jobs */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">
              Recent Job Posts
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Frontend Developer",
                "Backend Engineer",
                "SDE Intern",
              ].map((job, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex justify-between items-center"
                >
                  <span>{job}</span>

                  <span className="text-blue-400 text-sm font-medium">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">
              Hiring Tips
            </h2>

            <div className="mt-5 space-y-4 text-gray-300">
              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Write clear job descriptions.
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Respond to applicants quickly.
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Keep salary and role transparent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecruiterDashboard;