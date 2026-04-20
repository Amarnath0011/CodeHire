import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { applyToJob } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

function Jobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

  const loadJobs = async () => {
    try {
      const res = await getAllJobs();
      setJobs(res.data);
    } catch (error) {
      alert("Failed to load jobs");
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
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Latest Jobs
      </h1>

      {/* Search + Filter */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search title or company"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-gray-900 p-3 rounded-xl border border-gray-800"
        />

        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="bg-gray-900 p-3 rounded-xl border border-gray-800"
        />
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          >
            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p className="text-blue-500 mt-2">
              {job.company}
            </p>

            <p className="text-gray-400 mt-1">
              {job.location}
            </p>

            <p className="mt-2 font-semibold">
              {job.salary}
            </p>

            <p className="mt-4 text-sm text-gray-400">
              {job.description}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  handleApply(job._id)
                }
                className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Apply Now
              </button>

              <button
                onClick={() =>
                  handleSave(job)
                }
                className="bg-gray-700 px-5 py-2 rounded-xl hover:bg-gray-600"
              >
                Save Job
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <p className="text-gray-400 mt-8">
          No jobs found.
        </p>
      )}
    </div>
  );
}

export default Jobs;