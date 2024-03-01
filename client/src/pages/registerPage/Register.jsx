import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRegister } from "../../hooks/useRegister";

function SignUp() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const { register, error, isLoading } = useRegister();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // Client-side validation
    const errors = {};

    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (!username.trim()) {
      // Validate username
      errors.username = "Username is required";
    }
    if (Object.keys(errors).length > 0) {
      return;
    }

    await register(password, username);
  };

  if (user) {
    navigate("/exam");
  }

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden overflow-y-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md p-8 rounded-md bg-white shadow-lg">
        <h1 className="text-center text-3xl font-bold text-blue-600 tracking-widest">
          Radiology Reports
        </h1>
        <h2 className="mt-4 text-center  tracking-tighter text-zinc-600">
          Register for an Account with us.
        </h2>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-900 hover:text-blue-800"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
