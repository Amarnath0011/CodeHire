import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { Link } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const res = await getAllJobs();
    setJobs(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Posted Jobs
      </h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 p-5 rounded-xl"
          >
            <h2 className="text-xl font-bold">
              {job.title}
            </h2>

            <p>{job.company}</p>

            <Link
              to={`/applicants/${job._id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;