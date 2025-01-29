// AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ADMIN_CREDENTIALS = [
  { email: "shishirshrivastava30@gmail.com", password: "Shishir@2405" },
  { email: "guptashivanshi250@gmail.com", password: "Shivanshi@123" },
  { email: "tedxipsaindore@gmail.com", password: "TEDX123" },
];

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidAdmin = ADMIN_CREDENTIALS.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (isValidAdmin) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-lg blur-xl" />
        <div className="absolute inset-0 bg-black/50 rounded-lg backdrop-blur-sm" />

        {/* Content */}
        <div className="relative bg-zinc-900/50 p-8 rounded-lg border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="admin@tedxipsa.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg 
                       py-3 px-4 hover:from-red-500 hover:to-red-600 transition-all duration-300
                       flex items-center justify-center gap-2 group"
            >
              Login to Admin Panel
              <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
