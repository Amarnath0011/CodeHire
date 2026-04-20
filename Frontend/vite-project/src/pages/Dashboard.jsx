import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-400 mt-2">
        Student Dashboard
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-gray-900 p-6 rounded-2xl">
          Applied Jobs
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          Saved Jobs
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl">
          Resume Score
        </div>
      </div>
    </div>
  );
}

export default Dashboard;