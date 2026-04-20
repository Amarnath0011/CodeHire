import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: "Applied Jobs",
      value: "12",
      icon: "📄",
      color: "text-blue-400",
      desc: "Track all jobs you have applied for.",
    },
    {
      title: "Saved Jobs",
      value: "08",
      icon: "💾",
      color: "text-yellow-400",
      desc: "Jobs bookmarked for later review.",
    },
    {
      title: "Resume Score",
      value: "85%",
      icon: "🚀",
      color: "text-green-400",
      desc: "Improve your resume visibility.",
    },
    {
      title: "Interviews",
      value: "03",
      icon: "🎯",
      color: "text-pink-400",
      desc: "Upcoming interviews scheduled.",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-blue-500/20">
          <p className="uppercase tracking-widest text-sm text-blue-100 font-semibold">
            Student Dashboard
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3">
            Welcome back, {user?.name}
          </h1>

          <p className="text-white/90 mt-4 max-w-2xl">
            Manage applications, explore jobs, improve your resume and grow your career with CodeHire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/jobs"
              className="bg-white text-slate-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition text-center"
            >
              Explore Jobs
            </Link>

            <Link
              to="/profile"
              className="border border-white/30 bg-white/10 hover:bg-white/15 px-6 py-3 rounded-xl font-semibold transition text-center"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:bg-white/10 transition"
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

              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Applications */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">
              Recent Applications
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Frontend Developer - Google",
                "SDE Intern - Amazon",
                "React Developer - Infosys",
              ].map((job, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex justify-between items-center"
                >
                  <span>{job}</span>

                  <span className="text-green-400 text-sm font-medium">
                    Applied
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Tips */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold">
              Career Tips
            </h2>

            <div className="mt-5 space-y-4 text-gray-300">
              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Keep your resume updated weekly.
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Apply to at least 5 jobs daily.
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                ✔ Practice DSA & interviews consistently.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;