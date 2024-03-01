import React, { useContext, useState } from "react";
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
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between py-4 px-8">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: "50px" }} />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/exam">Exams</Link>
            </li>
            <li className="mr-4">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="mr-4">
              <Link to="/about">About</Link>
            </li>
            {user && (
              <li className="mr-4">
                <a
                  href="https://radiology-report-api.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Doc
                </a>
              </li>
            )}
          </ul>
          <div className="ml-auto flex items-center">
            {user && (
              <form onSubmit={handleSubmit} className="mr-4">
                <input
                  value={searchExam}
                  onChange={handleSearchExam}
                  type="search"
                  name="search_exam"
                  id="search_exam"
                  placeholder="Search by patient ID"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:bg-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Search
                </button>
              </form>
            )}
            {user && (
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                onClick={handleSignOut}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
