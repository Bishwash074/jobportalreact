import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIAuthenticateClient } from "../api";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      const response = await APIAuthenticateClient.post(
        `/application/applicationcreate/${jobId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess("🎉 Application submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to apply for this job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg">
      
      <h1 className="text-2xl font-bold mb-6">Apply for this Job</h1>

      {/* Resume Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Upload Resume <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full border rounded-xl p-2"
        />
        {resume && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {resume.name}
          </p>
        )}
      </div>

      {/* Cover Letter */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Cover Letter (Optional)
        </label>
        <textarea
          rows={5}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Why are you a good fit for this role?"
          className="w-full border rounded-xl p-3 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleApply}
          disabled={loading}
          className={`px-6 py-2 rounded-full text-white font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-full border font-medium hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>

      {/* Messages */}
      {success && (
        <p className="mt-4 text-green-600 font-medium">{success}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default ApplyJob;
