import React, { useEffect, useState } from "react";
import { APIAuthenticateClient } from "../api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await APIAuthenticateClient.get("/application/myapplication");
      setApplications(res.data.application || []);
    } catch (err) {
      setError("Failed to fetch applications. Please login.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 animate-pulse text-lg">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-xl mx-auto mt-10">
        {error}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        <p className="text-xl mb-2">You haven’t applied to any jobs yet.</p>
        <p className="text-sm">Browse jobs and start applying today!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          {/* Job Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {app.job?.title || "Unknown Job"}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {app.job?.company || "Unknown Company"} • {app.job?.location || "Remote"}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Applied on: {new Date(app.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Status and actions */}
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : app.status === "in_review"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {app.status.replace("_", " ").toUpperCase()}
            </span>

            <button
              onClick={() => window.open(`/job/${app.jobId}`, "_blank")}
              className="px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200"
            >
              View Job
            </button>

            {/* Optional: Withdraw button */}
            <button
              onClick={() => alert("Withdraw functionality coming soon!")}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm hover:bg-red-200"
            >
              Withdraw
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
