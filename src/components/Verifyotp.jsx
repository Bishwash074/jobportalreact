import React, { useState } from "react";
import { apiClient } from "../api";
import { useNavigate } from "react-router-dom";

const Verifyotp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await apiClient.post("/user/verify-otp", { email, otp });

      setIsError(false);
      setMessage(response.data.message);

      // Show success alert
      alert(response.data.message);

      // Clear input fields
      setEmail("");
      setOtp("");

      // Navigate to reset-password page after 1 second so user sees alert
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 500);

    } catch (error) {
      setIsError(true);
      const errMsg = error.response?.data?.message || "Something went wrong";
      setMessage(errMsg);

      // Show error alert
      alert(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">OTP</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
          >
            Verify
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${isError ? "text-red-500" : "text-green-500"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Verifyotp;
