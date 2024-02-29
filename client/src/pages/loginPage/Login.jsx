import "./Login.css";

import { useEffect, useState } from "react";

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
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="title">
        {" "}
        <h3>Login</h3>{" "}
      </div>

      <label htmlFor="text">Username:</label>
      <input
        id="text"
        type="text"
        onChange={e => setUsername(e.target.value)}
        value={username}
        placeholder="Please enter a valid username"
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="Please enter a valid password"
      />
      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
