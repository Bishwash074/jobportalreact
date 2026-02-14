import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api";

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  console.log(email)

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/user/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });

      setIsError(false);
      setMessage(response.data.message);
       setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Change Password
          </button>

        </form>

        {message && (
          <p className={`mt-4 text-center ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
