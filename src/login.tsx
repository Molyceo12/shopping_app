// src/Login.tsx
import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      localStorage.setItem("loggedInUser", JSON.stringify(userExists));
      alert(`✅ Welcome back, ${userExists.email}`);
      console.log("Logged in user:", userExists);

      // ✅ Navigate to homepage after successful login
      navigate("/");
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50">
      <Header />

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full mb-2">
            <svg
              className="w-12 h-12 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-gray-500 text-sm">Login to continue shopping</p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
          <p className="text-center text-gray-500 text-sm mt-2">
            Don't have an account?{" "}
            <span
              className="text-purple-600 font-semibold cursor-pointer"
              onClick={() => navigate("/Signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
