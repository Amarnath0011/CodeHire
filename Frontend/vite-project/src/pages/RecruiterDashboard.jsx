import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?._id) return;
    const load = async () => {
      try {
        setLoading(true);
        const [jobsRes, applicationsRes] = await Promise.all([
          api.get("/jobs/recruiter"),
          api.get("/applications/recruiter"),
        ]);
        setJobs(jobsRes.data || []);
        setApplications(applicationsRes.data || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load recruiter dashboard.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?._id]);

  const count = (status) => applications.filter((item) => item.status === status).length;

  if (loading) return <main className="min-h-screen bg-slate-950 text-white p-8"><div className="max-w-6xl mx-auto text-gray-400">Loading dashboard...</div></main>;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div><p className="text-blue-400 text-sm font-semibold">RECRUITER DASHBOARD</p><h1 className="text-3xl font-bold mt-2">Welcome, {user?.name}</h1><p className="text-gray-400 mt-1">A simple overview of your hiring activity.</p></div>
          <div className="flex gap-3"><Link to="/post-job" className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold">+ Post Job</Link><Link to="/my-jobs" className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold">Job Posted</Link></div>
        </div>
        {error && <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4">{error}</div>}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Stat label="Jobs" value={jobs.length} /><Stat label="Applications" value={applications.length} /><Stat label="Pending" value={count("pending")} /><Stat label="In Review" value={count("review")} /><Stat label="Accepted" value={count("accepted")} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <section className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6"><h2 className="text-xl font-bold">Recent Applications</h2><p className="text-gray-400 text-sm mt-1">Latest candidates for your jobs.</p><div className="mt-5 space-y-3">
            {applications.slice(0, 5).map((application) => <div key={application._id} className="bg-slate-900 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3"><div><p className="font-semibold">{application.fullName || application.student?.name || "Candidate"}</p><p className="text-sm text-gray-400 mt-1">{application.job?.title || "Job"} · {application.email || application.student?.email || ""}</p></div><span className="text-xs capitalize px-3 py-1 rounded-full bg-white/10">{application.status}</span></div>)}
            {applications.length === 0 && <p className="py-8 text-center text-gray-500">No applications yet.</p>}
          </div></section>
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6"><h2 className="text-xl font-bold">Quick Actions</h2><div className="mt-5 space-y-3"><Link to="/post-job" className="block bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-semibold">Post New Job</Link><Link to="/my-jobs" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">View My Jobs</Link><Link to="/profile" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">Edit Profile</Link></div></section>
        </div>
      </div>
    </main>
  );
}
function Stat({ label, value }) { return <div className="bg-white/5 border border-white/10 rounded-2xl p-5"><p className="text-gray-400 text-sm">{label}</p><p className="text-3xl font-bold mt-2">{value}</p></div>; }
export default RecruiterDashboard;
