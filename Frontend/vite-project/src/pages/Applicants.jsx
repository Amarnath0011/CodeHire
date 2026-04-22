import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicants,
  updateApplicationStatus,
} from "../services/applicationService";

function Applicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const resumeBaseUrl =
    window.location.hostname ===
    "localhost"
      ? "http://localhost:8000"
      : "https://codehire-backend-wjsj.onrender.com";

  const loadApplicants =
    async () => {
      try {
        setLoading(true);

        const res =
          await getApplicants(
            jobId
          );

        setApplicants(
          res.data
        );
      } catch {
        alert(
          "Failed to load applicants"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const handleStatus =
    async (
      applicationId,
      status
    ) => {
      try {
        await updateApplicationStatus(
          applicationId,
          { status }
        );

        setApplicants(
          (prev) =>
            prev.map(
              (
                item
              ) =>
                item._id ===
                applicationId
                  ? {
                      ...item,
                      status,
                    }
                  : item
            )
        );
      } catch (
        error
      ) {
        alert(
          error
            .response?.data
            ?.message ||
            "Failed to update status"
        );
      }
    };

  const getStatusStyles = (
    status
  ) => {
    if (
      status ===
      "accepted"
    ) {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    if (
      status ===
      "rejected"
    ) {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (
      status ===
      "review"
    ) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }

    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
            Recruiter Panel
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
            Applicants
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Review candidates,
            shortlist talent,
            and make final
            hiring decisions.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading applicants...
          </p>
        )}

        {/* Empty */}
        {!loading &&
          applicants.length ===
            0 && (
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold">
                No Applicants Yet
              </h2>

              <p className="text-gray-400 mt-4">
                Students who
                apply will
                appear here.
              </p>
            </div>
          )}

        {/* Cards */}
        {!loading &&
          applicants.length >
            0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {applicants.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item._id
                    }
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-1 hover:bg-white/10 transition duration-300"
                  >
                    {/* Top */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {item.fullName ||
                            item
                              .student
                              ?.name}
                        </h2>

                        <p className="text-blue-400 mt-1 text-sm">
                          {item.email ||
                            item
                              .student
                              ?.email}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full border capitalize ${getStatusStyles(
                          item.status
                        )}`}
                      >
                        {
                          item.status
                        }
                      </span>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-2 mt-5 text-sm text-gray-300">
                      <p>
                        📞{" "}
                        {item.phone ||
                          "N/A"}
                      </p>

                      <p>
                        🎓{" "}
                        {item.college ||
                          "N/A"}
                      </p>

                      <p>
                        📘{" "}
                        {item.degree ||
                          "N/A"}{" "}
                        {item.branch
                          ? `- ${item.branch}`
                          : ""}
                      </p>

                      <p>
                        📅{" "}
                        {item.graduationYear ||
                          "N/A"}
                      </p>

                      <p>
                        ⭐{" "}
                        {item.cgpa ||
                          "N/A"}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-5">
                      <h3 className="font-semibold">
                        Skills
                      </h3>

                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        {item.skills ||
                          "Not Provided"}
                      </p>
                    </div>

                    {/* Projects */}
                    <div className="mt-5">
                      <h3 className="font-semibold">
                        Projects
                      </h3>

                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        {item.projects ||
                          "Not Provided"}
                      </p>
                    </div>

                    {/* Reason */}
                    <div className="mt-5">
                      <h3 className="font-semibold">
                        Why Apply?
                      </h3>

                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        {item.reason ||
                          "Not Provided"}
                      </p>
                    </div>

                    {/* Resume */}
                    <div className="mt-6">
                      {item.resume ? (
                        <a
                          href={`${resumeBaseUrl}/uploads/${item.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full text-center bg-white/10 hover:bg-white/15 py-3 rounded-xl font-semibold transition"
                        >
                          View Resume
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-700 py-3 rounded-xl font-semibold cursor-not-allowed"
                        >
                          No Resume
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 space-y-3">
                      {item.status ===
                        "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatus(
                                item._id,
                                "review"
                              )
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                          >
                            Mark
                            Review
                          </button>

                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() =>
                                handleStatus(
                                  item._id,
                                  "accepted"
                                )
                              }
                              className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatus(
                                  item._id,
                                  "rejected"
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                            >
                              Reject
                            </button>
                          </div>
                        </>
                      )}

                      {item.status ===
                        "review" && (
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() =>
                              handleStatus(
                                item._id,
                                "accepted"
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(
                                item._id,
                                "rejected"
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {(item.status ===
                        "accepted" ||
                        item.status ===
                          "rejected") && (
                        <button
                          disabled
                          className="w-full bg-gray-700 py-3 rounded-xl font-semibold cursor-not-allowed"
                        >
                          Decision
                          Final
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
}

export default Applicants;