import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApplicants, updateApplicationStatus } from "../services/applicationService";

function Applicants() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const resumeBaseUrl = window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://codehire-backend-wjsj.onrender.com";

  const loadApplicants = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getApplicants(jobId);
      setApplicants(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "recruiter") loadApplicants();
    else setLoading(false);
  }, [jobId, user?.role]);

  const handleStatus = async (id, status) => {
    try {
      setUpdating(id);
      const res = await updateApplicationStatus(id, { status });
      setApplicants((prev) => prev.map((item) => item._id === id ? { ...item, ...res.data, status } : item));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update application status.");
    } finally {
      setUpdating(null);
    }
  };

  if (user?.role !== "recruiter") {
    return <main className="min-h-screen bg-slate-950 text-white p-8"><div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center"><h1 className="text-2xl font-bold">Recruiter access only</h1><Link to="/dashboard" className="inline-block mt-5 bg-blue-600 px-5 py-3 rounded-xl">Back to Dashboard</Link></div></main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-7">
          <div><p className="text-blue-400 text-sm font-semibold uppercase">Recruiter</p><h1 className="text-3xl font-bold mt-2">Candidates</h1><p className="text-gray-400 mt-1">Review applications for this job.</p></div>
          <Link to="/job-posted" className="bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl font-semibold">Back to Jobs</Link>
        </div>

        {error && <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4">{error}</div>}
        {loading && <p className="text-gray-400">Loading candidates...</p>}
        {!loading && !error && applicants.length === 0 && <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-400">No applications yet for this job.</div>}

        <div className="space-y-5">
          {applicants.map((item) => {
            const resume = item.resume || item.student?.resume;
            const finalDecision = item.status === "accepted" || item.status === "rejected";
            return (
              <article key={item._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-bold">{item.fullName || item.student?.name || "Candidate"}</h2>
                    <p className="text-blue-400 mt-1">{item.email || item.student?.email}</p>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-5 text-sm text-gray-300">
                      <p>📞 {item.phone || item.student?.phone || "Not provided"}</p>
                      <p>🎓 {item.college || item.student?.college || "Not provided"}</p>
                      <p>📘 {item.degree || item.student?.degree || "Not provided"} {item.branch || item.student?.branch ? `· ${item.branch || item.student?.branch}` : ""}</p>
                      <p>⭐ CGPA: {item.cgpa || item.student?.cgpa || "Not provided"}</p>
                    </div>
                  </div>
                  <span className="self-start capitalize text-sm px-3 py-1 rounded-full bg-white/10">{item.status}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-6">
                  <div><h3 className="font-semibold">Skills</h3><p className="text-gray-400 text-sm mt-2 whitespace-pre-line">{item.skills || item.student?.skills || "Not provided"}</p></div>
                  <div><h3 className="font-semibold">Projects</h3><p className="text-gray-400 text-sm mt-2 whitespace-pre-line">{item.projects || item.student?.projects || "Not provided"}</p></div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {resume ? (
                    <a href={`${resumeBaseUrl}/uploads/${encodeURIComponent(resume)}`} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold">View Resume</a>
                  ) : <span className="bg-white/5 text-gray-500 px-5 py-3 rounded-xl">No Resume Available</span>}

                  {!finalDecision && item.status === "pending" && (
                    <button disabled={updating === item._id} onClick={() => handleStatus(item._id, "review")} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 rounded-xl font-semibold">{updating === item._id ? "Updating..." : "Move to Review"}</button>
                  )}
                  {!finalDecision && (
                    <>
                      <button disabled={updating === item._id} onClick={() => handleStatus(item._id, "accepted")} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-5 py-3 rounded-xl font-semibold">Accept</button>
                      <button disabled={updating === item._id} onClick={() => handleStatus(item._id, "rejected")} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-5 py-3 rounded-xl font-semibold">Reject</button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Applicants;
