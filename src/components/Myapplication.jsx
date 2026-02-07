import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { APIAuthenticateClient } from '../api'

const Myapplication = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const response = await APIAuthenticateClient.get('/application/myapplication')
      console.log(response)
      setApplications(response.data.application)
    } catch (err) {
      setError("Unauthorized or failed to fetch data")
    } finally {
      setLoading(false)
    }
  }
  //console.log(applications)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg animate-pulse">Loading applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        {error}
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No applications found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Job ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Applied At
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {app.jobId}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          app.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Myapplication