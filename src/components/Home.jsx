import React, { useEffect, useState } from "react";
import { apiClient } from "../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await apiClient.get("/job/getAllJob");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Dream Job 🚀
        </h1>
        <p className="text-lg mb-6">
          Browse thousands of jobs from top companies in Nepal
        </p>

        <div className="flex justify-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search job title..."
            className="w-full p-3 rounded-lg text-black outline-none"
          />
          <button className="bg-white text-blue-600 px-6 rounded-lg font-semibold">
            Search
          </button>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">
          Latest Job Openings
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs available right now.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>

                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm">📍 {job.location}</span>
                  <span className="font-semibold text-green-600">
                    Rs. {job.salary}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/jobgetbyid/${job.id}`)}
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">1000+</h3>
            <p className="text-gray-600">Jobs Posted</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600">Companies</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600">Applicants</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
