import { useEffect, useState } from "react";
import { getRecruiterJobs, deleteJob } from "../services/jobService";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await getRecruiterJobs();
      setJobs(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) loadJobs();
  }, [user?._id]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteJob(deleteTarget._id);
      setJobs((prev) => prev.filter((job) => job._id !== deleteTarget._id));
      setMessage("Job deleted successfully.");
      setDeleteTarget(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-blue-400 uppercase tracking-wider text-sm font-semibold">Recruiter</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">Jobs Posted</h1>
            <p className="text-gray-400 mt-2">Manage your openings and review candidates.</p>
          </div>
          <Link to="/post-job" className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold text-center">+ Post Job</Link>
        </div>

        {message && <div className="mt-5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-2xl px-5 py-4">{message}</div>}

        {loading ? <p className="text-gray-400 mt-10">Loading posted jobs...</p> : jobs.length === 0 ? (
          <div className="text-center mt-16 bg-white/5 border border-white/10 rounded-2xl p-10">
            <h2 className="text-2xl font-bold">No Jobs Posted Yet</h2>
            <Link to="/post-job" className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">Create First Job</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-blue-400 mt-1">{job.company}</p>
                <p className="text-gray-400 mt-3">📍 {job.location}</p>
                <p className="text-green-400 font-semibold mt-1">₹ {job.salary}</p>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <Link to={`/applicants/${job._id}`} className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-center">Applicants</Link>
                  <button onClick={() => setDeleteTarget(job)} className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-7 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center text-2xl">⚠️</div>
            <h2 className="text-2xl font-bold mt-5">Delete this job?</h2>
            <p className="text-gray-400 mt-3">You are about to delete <span className="text-white font-semibold">{deleteTarget.title}</span>. This action cannot be undone.</p>
            <div className="flex gap-3 mt-7">
              <button disabled={deleting} onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/10 hover:bg-white/15 py-3 rounded-xl font-semibold">Cancel</button>
              <button disabled={deleting} onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 py-3 rounded-xl font-semibold">{deleting ? "Deleting..." : "Yes, Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyJobs;
