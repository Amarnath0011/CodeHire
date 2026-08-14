import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyApplications } from "../services/applicationService";
import { getProfile } from "../services/profileService";

function Dashboard() {
  const { user, login } = useAuth();
  const [apps, setApps] = useState([]);
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const [appsRes, profileRes] = await Promise.all([
          getMyApplications(user._id),
          getProfile(),
        ]);
        setApps(Array.isArray(appsRes.data) ? appsRes.data : []);
        const profileData = profileRes.data || {};
        setProfile({ ...user, ...profileData });
        login({ ...user, ...profileData }, localStorage.getItem("token"));
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user?._id]);

  const count = (status) => apps.filter((item) => item.status === status).length;

  const profileFields = ["name", "phone", "college", "degree", "branch", "graduationYear", "cgpa", "skills", "projects", "bio", "location", "resume"];
  const profileCompletion = useMemo(() => {
    const completed = profileFields.filter((field) => {
      const value = profile[field];
      return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
    }).length;
    return Math.round((completed / profileFields.length) * 100);
  }, [profile]);

  const badge = (status) => {
    if (status === "accepted") return "bg-green-500/10 text-green-400";
    if (status === "rejected") return "bg-red-500/10 text-red-400";
    if (status === "review") return "bg-blue-500/10 text-blue-400";
    return "bg-yellow-500/10 text-yellow-400";
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Student Dashboard</p>
          <h1 className="text-4xl font-bold mt-2">Welcome back, {profile?.name || user?.name}</h1>
          <p className="text-gray-400 mt-2">Track your applications, profile and opportunities in one place.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <Card title="Applied" value={apps.length} />
          <Card title="Under Review" value={count("review")} />
          <Card title="Accepted" value={count("accepted")} />
          <Card title="Rejected" value={count("rejected")} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <Link to="/jobs" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">Find Jobs →</Link>
            </div>
            {loading ? <p className="text-gray-400">Loading applications...</p> : apps.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center"><p className="text-gray-400">No applications yet.</p><Link to="/jobs" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold">Explore Jobs</Link></div>
            ) : (
              <div className="space-y-4">
                {apps.map((item) => <div key={item._id} className="border border-white/10 rounded-2xl p-5 bg-white/5"><div className="flex justify-between gap-4 items-start"><div><h3 className="text-xl font-bold">{item.job?.title || "Job"}</h3><p className="text-blue-400 mt-1">{item.job?.company || "Company"}</p><p className="text-gray-400 text-sm mt-2">{item.job?.location || "Location not available"}</p></div><span className={`px-3 py-1 rounded-full text-sm capitalize ${badge(item.status)}`}>{item.status || "pending"}</span></div></div>)}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Profile Strength</h2><span className="text-blue-400 font-bold">{profileCompletion}%</span></div>
              <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${profileCompletion}%` }} /></div>
              <p className="text-gray-400 text-sm mt-3">Complete your profile and upload your resume to improve your chances.</p>
              <Link to="/profile" className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold">Update Profile →</Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
              <div className="space-y-3 text-sm">
                {apps.slice(0, 5).map((item) => <div key={item._id} className="text-gray-300">{item.status === "accepted" ? "🎉" : item.status === "rejected" ? "🔴" : "🔵"} <span className="ml-2">{item.job?.title || "Application"}: {item.status || "pending"}</span></div>)}
                {!apps.length && <p className="text-gray-500">Your application updates will appear here.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value }) { return <div className="bg-white/5 border border-white/10 rounded-3xl p-6"><p className="text-gray-400 text-sm">{title}</p><h3 className="text-3xl font-bold mt-2">{value}</h3></div>; }

export default Dashboard;
