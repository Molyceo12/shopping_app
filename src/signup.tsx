// src/Signup.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [, setAllUsers] = useState<any[]>([]); // store users for debug

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setAllUsers(storedUsers);
  }, []);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage({ text: "All fields are required", isError: true });
      return;
    }

    // Load existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (storedUsers.some((user: any) => user.email === email)) {
      setMessage({ text: "Email already registered", isError: true });
      return;
    }

    // Add new user
    const newUser = { username, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    setMessage({ text: "Registration successful 🎉", isError: false });

    // Update debug users immediately
    setAllUsers(storedUsers);

    // Redirect to login after short delay
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-purple-50  py-8">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0M12 14v7m-4-3h8" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-3">Create an Account</h2>
            <p className="text-gray-500 text-sm">Signup to start your journey</p>
          </div>

          {message && (
            <div
              className={`p-2 mb-4 text-center rounded ${
                message.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2 transition"
            >
              Signup
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already registered?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>

        {/* Debug div */}
        
      </div>
      <Footer />
    </>
  );
};

export default Signup;
