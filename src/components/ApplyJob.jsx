import React, { useState } from 'react'
import { APIAuthenticateClient } from '../api';
import { useParams } from 'react-router-dom';

const ApplyJob = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { JobId } = useParams()

  const handleApply = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await APIAuthenticateClient.post(`application/applicationcreate/${JobId}`)
      console.log(response.data)
      setMessage(response.data.messsage); // note: in backend it's "messsage", you might want to fix the typo
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.messsage || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleApply}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Applying..." : "Apply for Job"}
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  )
}

export default ApplyJob