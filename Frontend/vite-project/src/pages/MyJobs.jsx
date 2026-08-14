import { useEffect, useState } from "react";
import { getAllJobs, deleteJob } from "../services/jobService";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      // My Jobs should only show jobs created by this recruiter.
      const mine = res.data.filter(
        (job) => String(job.postedBy?._id || job.postedBy) === String(user?._id)
      );
      setJobs(mine);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadJobs();
  }, [user?._id]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteJob(deleteTarget._id);
      setJobs((prev) => prev.filter((job) => job._id !== deleteTarget._id));
      setMessage("Job deleted successfully");
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to delete job");
      setDeleteTarget(null);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/20">
          <p className="uppercase tracking-widest text-sm text-blue-100 font-semibold">Recruiter Panel</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3">My Posted Jobs</h1>
          <p className="text-white/90 mt-4 max-w-2xl">Manage your active job openings and review applicants.</p>
        </div>

        {message && (
          <div className="mt-5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-2xl px-5 py-4">
            {message}
          </div>
        )}

        {loading && <p className="text-center text-gray-400 mt-10">Loading jobs...</p>}

        {!loading && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:bg-white/10 transition">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <p className="text-blue-400 mt-2 font-medium">{job.company}</p>
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">Active</span>
                </div>

                <p className="text-gray-400 mt-4">📍 {job.location}</p>
                <p className="text-green-400 font-semibold mt-2">₹ {job.salary}</p>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-3">{job.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Link to={`/applicants/${job._id}`} className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-center transition">
                    Applicants
                  </Link>
                  <button onClick={() => setDeleteTarget(job)} className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold">No Jobs Posted Yet</h2>
            <p className="text-gray-400 mt-4">Start hiring by creating your first job opening.</p>
            <Link to="/post-job" className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition">
              Post New Job
            </Link>
          </div>
        )}
      </div>

      {/* In-page delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-7 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl mb-5">⚠️</div>
            <h2 className="text-2xl font-bold">Delete this job?</h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              You are about to delete <span className="text-white font-semibold">{deleteTarget.title}</span>. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-7">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/10 hover:bg-white/15 py-3 rounded-xl font-semibold transition">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyJobs;
