import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState, useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const [searchExam, setSearchExam] = useState("");
  const [exams, setExams] = useState([]);

  const handleSearchExam = e => {
    setSearchExam(e.target.value);
  };

  const fetchExam = async () => {
    const url = "http://localhost:8000/api/users/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setExams(data);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const examFound = exams.find(
        exam => exam.medical_record_number === searchExam
      );
      if (examFound) {
        navigate(`/patient/${examFound.medical_record_number}`);
      } else {
        console.log("No exam found with that ID");
      }
    } catch (error) {
      console.error("Error searching for exam:", error);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  function handleLogin() {
    navigate("/login");
  }

  // const handleSignOut = () => {
  //   logout();
  // };

  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  function handleRegister() {
    navigate("/register");
  }
  return (
    <nav className="navbar">
      <div className="nav-group">
        <Link to="/exam" className="logo">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </Link>
        <ul>
          <li>
            <Link to="/exam">Exams</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link
              to="https://radiology-report-api.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Doc
            </Link>
          </li>
          {user && (
            <li className="welcome">
              <span>Welcome, {user.username}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="search-group">
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <input
              value={searchExam}
              onChange={handleSearchExam}
              type="search"
              name="search_exam"
              id="search_exam"
              placeholder="Search by patient ID"
              required
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {user && (
          <div className="btn" onClick={handleSignOut}>
            Log Out
          </div>
        )}
        {!user && (
          <div className="btn" onClick={handleLogin}>
            Log In
          </div>
        )}
        {!user && (
          <div className="btn" onClick={handleRegister}>
            Register
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
