import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIAuthenticateClient } from "../api";

const JobProviderDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const handleCreate = () => {
    navigate("/jobcreate");
  };

  // fetch applications for provider
  const fetchApplications = async () => {
    try {
      const res = await APIAuthenticateClient.get("/application/getapplication");
      console.log(res)
      console.log(res.data.application)
      setApplications(res.data.application);
    } catch (err) {
      console.error("Failed to load applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // update application status
  const handleStatusUpdate = async (id, status) => {
    setLoadingId(id);
    try {
      await APIAuthenticateClient.patch(`/application/aplicationupdate/${id}`, {
        status,
      });

      // update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Job Provider Dashboard
        </h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Job
        </button>
      </div>

      {/* Applications */}
      <h2 className="text-lg font-semibold mb-4">
        Job Applications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h3 className="font-semibold text-gray-800">
              👤 {app.user?.name}
            </h3>

            <p className="text-sm text-gray-500">
              Job: {app.job?.title}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Applied on:{" "}
              {new Date(app.appliedAt).toLocaleDateString()}
            </p>

            {/* Status badge */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {app.status.toUpperCase()}
              </span>
            </div>

            {/* Action buttons */}
            {(app.status === "applied" || app.status === "in_review") && (
              <div className="flex gap-3 mt-4">
                <button
                  disabled={loadingId === app.id}
                  onClick={() => handleStatusUpdate(app.id, "accepted")}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  Accept
                </button>

                <button
                  disabled={loadingId === app.id}
                  onClick={() => handleStatusUpdate(app.id, "rejected")}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default JobProviderDashboard;
