import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/exam");
    }
  }, [user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden overflow-y-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md p-8 rounded-md bg-white shadow-lg">
        <h1 className="text-center text-3xl font-bold text-blue-600 tracking-widest">
          Radiology Reports
        </h1>
        <h2 className="mt-4 text-center  tracking-tighter text-zinc-600">
          Log in to your account
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
                className="block w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="block w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
