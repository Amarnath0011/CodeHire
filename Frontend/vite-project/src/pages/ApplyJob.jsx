import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { applyToJob } from "../services/applicationService";

function ApplyJob() {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "",
    cgpa: "",
    skills: "",
    projects: "",
    reason: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } =
      e.target;

    if (name === "resume") {
      setForm({
        ...form,
        resume: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "job",
          jobId
        );

        formData.append(
          "student",
          user._id
        );

        formData.append(
          "fullName",
          form.fullName
        );

        formData.append(
          "email",
          form.email
        );

        formData.append(
          "phone",
          form.phone
        );

        formData.append(
          "college",
          form.college
        );

        formData.append(
          "degree",
          form.degree
        );

        formData.append(
          "branch",
          form.branch
        );

        formData.append(
          "graduationYear",
          form.graduationYear
        );

        formData.append(
          "cgpa",
          form.cgpa
        );

        formData.append(
          "skills",
          form.skills
        );

        formData.append(
          "projects",
          form.projects
        );

        formData.append(
          "reason",
          form.reason
        );

        if (form.resume) {
          formData.append(
            "resume",
            form.resume
          );
        }

        await applyToJob(
          formData
        );

        alert(
          "Applied Successfully"
        );

        navigate("/jobs");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Apply Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center">
          Apply Now
        </h1>

        <p className="text-gray-400 text-center mt-3 mb-10">
          Complete your details
          and upload resume.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="input"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />

          <input
            name="phone"
            onChange={handleChange}
            placeholder="Phone"
            className="input"
          />

          <input
            name="college"
            onChange={handleChange}
            placeholder="College"
            className="input"
          />

          <input
            name="degree"
            onChange={handleChange}
            placeholder="Degree"
            className="input"
          />

          <input
            name="branch"
            onChange={handleChange}
            placeholder="Branch"
            className="input"
          />

          <input
            name="graduationYear"
            onChange={handleChange}
            placeholder="Graduation Year"
            className="input"
          />

          <input
            name="cgpa"
            onChange={handleChange}
            placeholder="CGPA"
            className="input"
          />

          <textarea
            name="skills"
            onChange={handleChange}
            placeholder="Skills"
            className="input md:col-span-2"
          />

          <textarea
            name="projects"
            onChange={handleChange}
            placeholder="Projects"
            className="input md:col-span-2"
          />

          <textarea
            name="reason"
            onChange={handleChange}
            placeholder="Why do you want this role?"
            className="input md:col-span-2"
          />

          {/* Resume Upload */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-gray-300">
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={
                handleChange
              }
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl"
            />
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold transition"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>
      </div>

      <style>{`
        .input{
          width:100%;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          padding:14px;
          border-radius:16px;
          color:white;
          outline:none;
        }

        .input::placeholder{
          color:#94a3b8;
        }

        .input:focus{
          border-color:#3b82f6;
        }
      `}</style>
    </section>
  );
}

export default ApplyJob;