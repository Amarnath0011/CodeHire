import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function Applicants() {
  const { jobId } = useParams();

  const [list, setList] = useState([]);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    const res = await api.get(
      `/applications/${jobId}`
    );

    setList(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Applicants
      </h1>

      <div className="space-y-4">
        {list.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 p-5 rounded-xl"
          >
            <h2 className="text-xl font-bold">
              {item.student?.name}
            </h2>

            <p>{item.student?.email}</p>

            <p className="text-yellow-500 mt-2 capitalize">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;