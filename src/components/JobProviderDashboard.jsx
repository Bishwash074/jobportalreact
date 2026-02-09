import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIAuthenticateClient } from "../api";

const JobProviderDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      const res = await APIAuthenticateClient.get("/application/getapplication");
      setApplications(res.data.application);
    } catch (err) {
      console.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await APIAuthenticateClient.patch(
        `/application/aplicationupdate/${id}`,
        { status }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // stats
  const stats = {
    total: applications.length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    pending: applications.filter(
      a => a.status === "applied" || a.status === "in_review"
    ).length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <button
          onClick={() => navigate("/jobcreate")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          + Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Applications", value: stats.total },
          { label: "Pending Review", value: stats.pending },
          { label: "Accepted", value: stats.accepted },
          { label: "Rejected", value: stats.rejected },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <p className="text-gray-500 text-sm">{s.label}</p>
            <p className="text-3xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Applications */}
      <h2 className="text-xl font-semibold mb-4">
        Applications
      </h2>

      {loading && (
        <p className="text-gray-500">Loading applications...</p>
      )}

      {!loading && applications.length === 0 && (
        <p className="text-gray-500">
          No applications received yet.
        </p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {/* Applicant Info */}
            <div>
              <h3 className="font-semibold text-lg">
                {app.user?.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Applied for <b>{app.job?.title}</b>
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <select
                value={app.status}
                disabled={updatingId === app.id}
                onChange={(e) =>
                  handleStatusUpdate(app.id, e.target.value)
                }
                className="border rounded-xl px-3 py-2 text-sm"
              >
                <option value="applied">Applied</option>
                <option value="in_review">In Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() =>
                  navigate(`/applicant/${app.user?.id}`)
                }
                className="px-4 py-2 border rounded-xl text-sm hover:bg-gray-100"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobProviderDashboard;
