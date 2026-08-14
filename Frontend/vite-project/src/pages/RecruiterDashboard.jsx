import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllJobs } from "../services/jobService";
import { getRecruiterApplications } from "../services/applicationService";

function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [jobsRes, applicationsRes] = await Promise.all([
          getAllJobs(),
          getRecruiterApplications(),
        ]);

        const mine = jobsRes.data.filter(
          (job) => String(job.postedBy?._id || job.postedBy) === String(user?._id)
        );
        setJobs(mine);
        setApplications(applicationsRes.data);
      } catch (error) {
        console.error("Recruiter dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) loadDashboard();
  }, [user?._id]);

  const pending = applications.filter((a) => a.status === "pending").length;
  const review = applications.filter((a) => a.status === "review").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;

  const recent = applications.slice(0, 5);

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Recruiter</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Welcome, {user?.name}</h1>
          <p className="text-gray-400 mt-2">Manage your jobs and candidates from one place.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/post-job" className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold">+ Post Job</Link>
          <Link to="/my-jobs" className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold">Job Posted</Link>
        </div>

        {loading ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-gray-400">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat label="Jobs Posted" value={jobs.length} />
              <Stat label="Applications" value={applications.length} />
              <Stat label="Pending" value={pending} />
              <Stat label="Accepted" value={accepted} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">Recent Applications</h2>
                    <p className="text-gray-400 text-sm mt-1">Candidates who recently applied to your jobs.</p>
                  </div>
                  {review > 0 && <span className="text-sm text-blue-400">{review} in review</span>}
                </div>

                <div className="mt-5 space-y-3">
                  {recent.length === 0 ? (
                    <p className="text-gray-500 py-6">No applications yet.</p>
                  ) : recent.map((application) => (
                    <div key={application._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                      <div>
                        <p className="font-semibold">{application.fullName || application.student?.name || "Candidate"}</p>
                        <p className="text-gray-400 text-sm">{application.job?.title || "Job"} · {application.student?.email || application.email}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-white/10 capitalize text-gray-300">{application.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold">Quick Actions</h2>
                <div className="space-y-3 mt-5">
                  <Link to="/post-job" className="block bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-semibold">Post a Job</Link>
                  <Link to="/my-jobs" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">View Posted Jobs</Link>
                  <Link to="/profile" className="block bg-white/10 hover:bg-white/15 p-4 rounded-xl font-semibold">Edit Profile</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default RecruiterDashboard;
