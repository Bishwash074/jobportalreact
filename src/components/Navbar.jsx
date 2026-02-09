import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, data } = useSelector((state) => state.auth);
  console.log("AUTH DATA:", data);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    // navigate("/");
  };
  

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold">
            <span className="text-blue-600">Job</span>
            <span className="text-gray-800">Portal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  👋 {data?.name}
                </span>

                <button
                  onClick={() => {
                    if (data?.role === "jobprovider") {
                      navigate("/admin/dashboard");
                    } else {
                      navigate("/user/dashboard");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3 shadow">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                Logged in as <b>{data?.username}</b>
              </div>

              <button
                onClick={() => {
                  if (data?.role === "jobprovider") {
                    navigate("/admin/dashboard");
                  } else {
                    navigate("/user/dashboard");
                  }
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
