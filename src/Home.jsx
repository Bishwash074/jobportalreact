import React, { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  // Static job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Kathmandu, Nepal",
      description: "Work on modern web applications using React.js and Tailwind CSS.",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Innovatech",
      location: "Pokhara, Nepal",
      description: "Develop RESTful APIs and manage databases using Node.js and MongoDB.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Lalitpur, Nepal",
      description: "Design user-friendly interfaces and experiences for web and mobile apps.",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "NextGen Software",
      location: "Bhaktapur, Nepal",
      description: "Handle both frontend and backend development using MERN stack.",
    },
  ];

  // Filter jobs based on search input
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center my-10">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-gray-600 mb-6">
          Browse handpicked job opportunities from top companies in Nepal.
        </p>
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          className="border border-gray-300 rounded px-4 py-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Jobs List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                <p className="mt-2 text-gray-700">{job.description}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
