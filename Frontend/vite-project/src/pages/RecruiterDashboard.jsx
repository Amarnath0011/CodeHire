import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-400 mt-2">
        Recruiter Dashboard
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <Link
          to="/post-job"
          className="bg-gray-900 p-6 rounded-2xl hover:bg-gray-800 transition block"
        >
          <h2 className="text-xl font-bold">
            Post Job
          </h2>

          <p className="text-gray-400 mt-2">
            Create a new job opening
          </p>
        </Link>

        <Link
          to="/my-jobs"
          className="bg-gray-900 p-6 rounded-2xl hover:bg-gray-800 transition block"
        >
          <h2 className="text-xl font-bold">
            My Jobs
          </h2>

          <p className="text-gray-400 mt-2">
            View all posted jobs
          </p>
        </Link>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold">
            Company Profile
          </h2>

          <p className="text-gray-400 mt-2">
            Update recruiter details soon
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;