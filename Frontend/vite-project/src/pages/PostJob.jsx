import { useState } from "react";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob(form);
      alert("Job Posted");
      navigate("/recruiter");
    }catch (error) {
        console.log(error);
       }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Post New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {[
          "title",
          "company",
          "location",
          "salary",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full bg-gray-900 p-3 rounded-xl"
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-gray-900 p-3 rounded-xl"
        />

        <button className="bg-blue-600 px-6 py-3 rounded-xl">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;