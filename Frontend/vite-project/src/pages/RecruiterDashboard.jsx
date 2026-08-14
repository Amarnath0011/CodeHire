import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRecruiterJobs } from "../services/jobService";
import { getRecruiterApplications } from "../services/applicationService";

function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const [jobsRes, applicationsRes] = await Promise.all([
        getRecruiterJobs(),
        getRecruiterApplications(),
      ]);
      setJobs(jobsRes.data || []);
      setApplications(applicationsRes.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) loadDashboard();
  }, [user?._id]);

  const pending = applications.filter((a) => a.status === "pending").length;
  const review = applications.filter((a) => a.status === "review").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const recent = applications.slice(0, 5);

  if (loading) {
    return <main className="min-h-screen bg-slate-950 text-white p-8"><div className="max-w-6xl mx-auto text-gray-400">Loading dashboard...</div></main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-400 text-sm font-semibold">RECRUITER DASHBOARD</p>
            <h1 className="text-3xl font-bold mt-2">Welcome, {user?.name}</h1>
            <p className="text-gray-400 mt-1">A simple overview of your hiring activity.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/post-job" className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold">+ Post Job</Link>
            <Link to="/my-jobs" className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold">Job Posted</Link>
          </div>
        </div>

        {error && <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4">{error}</div>}

        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Stat label="Jobs" value={jobs.length} />
          <Stat label="Applications" value={applications.length} />
          <Stat label="Pending" value={pending} />
          <Stat label="In Review" value={review} />
          <Stat label="Accepted" value={accepted} />
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Recent Applications</h2>
                <p className="text-gray-400 text-sm mt-1">Latest candidates for your jobs.</p>
              </div>
              <span className="text-sm text-gray-500">{rejected} rejected</span>
            </div>

            <div className="mt-5 space-y-3">
              {recent.length === 0 ? (
                <div className="py-8 text-center text-gray-500">No candidates have applied yet.</div>
              ) : recent.map((application) => (
                <div key={application._id} className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{application.fullName || application.student?.name || "Candidate"}</p>
                    <p className="text-sm text-gray-400 mt-1">{application.job?.title || "Job"} · {application.email || application.student?.email}</p>
                  </div>
                  <span className="text-xs capitalize px-3 py-1 rounded-full bg-white/10 text-gray-300">{application.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <div className="mt-5 space-y-3">
              <Link to="/post-job" className="block bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-semibold">Post New Job</Link>
              <Link to="/my-jobs" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">View My Jobs</Link>
              <Link to="/profile" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">Edit Profile</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return <div className="bg-white/5 border border-white/10 rounded-2xl p-5"><p className="text-gray-400 text-sm">{label}</p><p className="text-3xl font-bold mt-2">{value}</p></div>;
}

export default RecruiterDashboard;
