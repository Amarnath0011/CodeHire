import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyApplications } from "../services/applicationService";

function Dashboard() {
  const { user } = useAuth();

  const [apps, setApps] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const res =
          await getMyApplications(
            user._id
          );

        setApps(res.data);
      } catch {
        alert(
          "Failed to load dashboard"
        );
      }
    };

  const count = (status) =>
    apps.filter(
      (item) =>
        item.status === status
    ).length;

  const badge = (status) => {
    if (
      status ===
      "accepted"
    )
      return "bg-green-500/10 text-green-400";

    if (
      status ===
      "rejected"
    )
      return "bg-red-500/10 text-red-400";

    if (
      status ===
      "review"
    )
      return "bg-blue-500/10 text-blue-400";

    return "bg-yellow-500/10 text-yellow-400";
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Track your job applications and opportunities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <Card title="Applied" value={apps.length} />
          <Card title="Review" value={count("review")} />
          <Card title="Accepted" value={count("accepted")} />
          <Card title="Rejected" value={count("rejected")} />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Applications */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              My Applications
            </h2>

            <div className="space-y-4">
              {apps.map((item) => (
                <div
                  key={item._id}
                  className="border border-white/10 rounded-2xl p-5 bg-white/5"
                >
                  <div className="flex justify-between gap-4 items-start">
                    <div>
                      <h3 className="text-xl font-bold">
                        {item.job?.title}
                      </h3>

                      <p className="text-blue-400 mt-1">
                        {item.job?.company}
                      </p>

                      <p className="text-gray-400 text-sm mt-2">
                        {item.job?.location}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm capitalize ${badge(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}

              {apps.length === 0 && (
                <p className="text-gray-400">
                  No applications yet.
                </p>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Notifications
              </h2>

              <div className="space-y-3 text-sm">
                {apps.map((item) => (
                  <div key={item._id}>
                    {item.status === "accepted" && (
                      <p className="text-green-400">
                        🎉 Accepted for {item.job?.title}
                      </p>
                    )}

                    {item.status === "review" && (
                      <p className="text-blue-400">
                        🔵 {item.job?.title} under review
                      </p>
                    )}

                    {item.status === "rejected" && (
                      <p className="text-red-400">
                        🔴 Rejected for {item.job?.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Profile Strength
              </h2>

              <p className="text-gray-400 text-sm">
                Keep resume, skills and projects updated.
              </p>

              <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-blue-500"></div>
              </div>

              <p className="text-sm mt-2 text-blue-400">
                80% Complete
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}

export default Dashboard;