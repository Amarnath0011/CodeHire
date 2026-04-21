import { useEffect, useState } from "react";
import { getAllJobs, deleteJob } from "../services/jobService";
import { Link } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const res = await getAllJobs();
      setJobs(res.data);
    } catch {
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (
    jobId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this job permanently?"
      );

    if (!confirmDelete) return;

    try {
      await deleteJob(jobId);

      setJobs((prev) =>
        prev.filter(
          (job) =>
            job._id !== jobId
        )
      );

     
    } catch {
      alert(
        "Failed to delete job"
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/20">
          <p className="uppercase tracking-widest text-sm text-blue-100 font-semibold">
            Recruiter Panel
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3">
            My Posted Jobs
          </h1>

          <p className="text-white/90 mt-4 max-w-2xl">
            Manage all your active job openings, review applicants and remove outdated listings.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 mt-10">
            Loading jobs...
          </p>
        )}

        {/* Jobs Grid */}
        {!loading &&
          jobs.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:-translate-y-1 hover:bg-white/10 transition duration-300"
                >
                  {/* Top */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {job.title}
                      </h2>

                      <p className="text-blue-400 mt-2 font-medium">
                        {job.company}
                      </p>
                    </div>

                    <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                      Active
                    </span>
                  </div>

                  {/* Info */}
                  <p className="text-gray-400 mt-4">
                    📍 {job.location}
                  </p>

                  <p className="text-green-400 font-semibold mt-2">
                    ₹ {job.salary}
                  </p>

                  <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                      to={`/applicants/${job._id}`}
                      className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-center transition"
                    >
                      Applicants
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          job._id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Empty State */}
        {!loading &&
          jobs.length === 0 && (
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold">
                No Jobs Posted Yet
              </h2>

              <p className="text-gray-400 mt-4">
                Start hiring by creating your first job opening.
              </p>

              <Link
                to="/post-job"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Post New Job
              </Link>
            </div>
          )}
      </div>
    </section>
  );
}

export default MyJobs;