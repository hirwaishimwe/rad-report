import "./NavBar.css";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ExamContext } from "../../../context/ExamContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import logo from "./logo.png";

function NavBar() {
  const navigate = useNavigate();
  const [searchExam, setSearchExam] = useState("");
  const { examsData } = useContext(ExamContext);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleSearchExam = e => {
    setSearchExam(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const examFound = examsData.find(
      exam => exam.medical_record_number === searchExam
    );
    if (examFound) {
      navigate(`/patient/${examFound.medical_record_number}`);
    } else {
      console.log("No exam found with that ID");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

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
            <a
              href="https://radiology-report-api.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Doc
            </a>
          </li>
          {user && (
            <li className="welcome">
              <span>Welcome, {user.username}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="search-group">
        {user && (
          <form onSubmit={handleSubmit} className="search-bar">
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
        )}
        {user ? (
          <button className="btn" onClick={handleSignOut}>
            Log Out
          </button>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
