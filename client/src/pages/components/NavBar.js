import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import React, { useState, useEffect } from "react";

function NavBar() {
  const [searchExam, setSearchExam] = useState("");
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const handleSearchExam = e => {
    setSearchExam(e.target.value);
  };

  const fetchExam = async () => {
    const url = "http://localhost:8000/api/users/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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

  return (
    <nav className="navbar">
      <div className="nav-group">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </Link>
        <ul>
          <li>
            <Link to="/">Exams</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </div>
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
    </nav>
  );
}

export default NavBar;

