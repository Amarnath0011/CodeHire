import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const statsRes = await api.get(
      "/admin/stats"
    );

    const usersRes = await api.get(
      "/admin/users"
    );

    const jobsRes = await api.get(
      "/admin/jobs"
    );

    setStats(statsRes.data);
    setUsers(usersRes.data);
    setJobs(jobsRes.data);
  };

  const deleteJob = async (id) => {
    await api.delete(
      `/admin/jobs/${id}`
    );

    loadData();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Panel
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl">
          Users: {stats.users}
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          Jobs: {stats.jobs}
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          Applications: {stats.applications}
        </div>
      </div>

      {/* Users */}
      <h2 className="text-2xl font-bold mb-4">
        Users
      </h2>

      <div className="space-y-3 mb-10">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-900 p-4 rounded-xl"
          >
            {user.name} - {user.email} (
            {user.role})
          </div>
        ))}
      </div>

      {/* Jobs */}
      <h2 className="text-2xl font-bold mb-4">
        Jobs
      </h2>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 p-4 rounded-xl flex justify-between items-center"
          >
            <span>
              {job.title} - {job.company}
            </span>

            <button
              onClick={() =>
                deleteJob(job._id)
              }
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;