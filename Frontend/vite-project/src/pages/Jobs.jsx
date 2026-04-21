import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { applyToJob } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Jobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

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

  const handleApply = async (jobId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await applyToJob({
        job: jobId,
        student: user._id,
      });

      alert("Applied Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to apply"
      );
    }
  };

  const handleSave = (job) => {
    const exists = savedJobs.find(
      (item) => item._id === job._id
    );

    if (exists) {
      alert("Already Saved");
      return;
    }

    const updated = [...savedJobs, job];

    setSavedJobs(updated);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updated)
    );

    alert("Job Saved");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation =
      location === "" ||
      job.location
        .toLowerCase()
        .includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
            Career Opportunities
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
            Explore Latest Jobs
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Find verified internships and jobs from top recruiters across India.
          </p>
        </div>

        {/* Search Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search title or company..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading jobs...
          </p>
        )}

        {/* Jobs Grid */}
        {!loading && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-1 hover:bg-white/10 transition duration-300 flex flex-col justify-between"
              >
                {/* Top */}
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {job.title}
                      </h2>

                      <p className="text-blue-400 mt-2 font-medium">
                        {job.company}
                      </p>
                    </div>

                    <span className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">
                      Hiring
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3">
                    📍 {job.location}
                  </p>

                  <p className="mt-3 font-semibold text-green-400">
                    ₹ {job.salary}
                  </p>

                  <p className="mt-4 text-sm text-gray-400 leading-relaxed line-clamp-4">
                    {job.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                <Link
                 to={`/apply/${job._id}`}
                  className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition text-center">Apply</Link>
                  <button
                    onClick={() =>
                      handleSave(job)
                    }
                    className="bg-white/10 hover:bg-white/15 py-3 rounded-xl font-semibold transition border border-white/10"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          filteredJobs.length === 0 && (
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold">
                No Jobs Found
              </h3>

              <p className="text-gray-400 mt-3">
                Try changing search keywords or location.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}

export default Jobs;