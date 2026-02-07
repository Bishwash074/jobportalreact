import React, { useState } from 'react'
import { APIAuthenticateClient } from '../api'
import { useParams } from 'react-router-dom'

const ApplyJob = () => {
  const {jobId}=useParams()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleApply = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await APIAuthenticateClient.post(`/application/applicationcreate/${jobId}`)
      setMessage(response.data.messsage || "Applied successfully")
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to apply for job"
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <button
        onClick={handleApply}
        disabled={loading}
        className={`px-4 py-2 rounded-lg font-medium text-white
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Applying..." : "Apply Job"}
      </button>

      {message && (
        <p className="mt-2 text-sm text-green-600">{message}</p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default ApplyJob