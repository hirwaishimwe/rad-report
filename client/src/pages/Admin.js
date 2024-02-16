import { useNavigate } from "react-router-dom";
import ExamsTable from "./components/ExamsTable";
import "./admin.css";
import React, { useContext } from "react";
import { ExamContext } from "../context/ExamContext";

function Admin() {
  const { examsData, loading, error } = useContext(ExamContext);
  const navigate = useNavigate();

  const handleCreateNewExam = () => {
    navigate("/create-exam");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching exams: {error}</div>;
  }

  if (!examsData) {
    return <div>No exams found</div>;
  }
  return (
    <div className="admin">
      <button className="btn create-exam-btn" onClick={handleCreateNewExam}>
        Create Exam
      </button>
      <ExamsTable exams={examsData} isAdmin={true} />
    </div>
  );
}

export default Admin;
