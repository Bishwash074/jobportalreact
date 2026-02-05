import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api';

const SingleJob = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate=useNavigate();

  const fetchJobDetails = async () => {
    try {
      const response = await apiClient.get(`/job/getaJob/${id}`);
      //console.log("Job details fetched:", response.data.data);
      setJob(response.data.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      alert("Failed to fetch job details. Please try again.");
    }
  }
  const handleButton=(jobId)=>{
    navigate(`/applyJob/${jobId}`)
  }
  useEffect(() => {
    fetchJobDetails();
  }, [id]);
  

  if (!job) {
    return <p className="text-center text-gray-500 mt-10">Loading job details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-3xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Job Title:{job.title}</h2>
        <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow-sm">
          {job.company}
        </span>
      </div>

      <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
        <span>📍 {job.location}</span>
        <span>💰 Rs. {job.salary}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{job.jobDescription}</p>

      <div className="flex justify-end">
        <button 
        onClick={() => handleButton(job.id)}
        className="bg-linear-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-2 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200">
          Apply Job
        </button>
      </div>
    </div>
  );
}

export default SingleJob;
