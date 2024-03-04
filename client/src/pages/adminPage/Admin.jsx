import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { ExamContext } from "../../context/ExamContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import ExamsTable from "../components/examsTable/ExamsTable";

function Admin() {
  const { examsData, loading, error } = useContext(ExamContext);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleCreateNewExam = () => {
    navigate("/create-exam");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Access Denied</div>
          <div className="mb-4">
            Please <a href="/login">Log In</a> to access this page.
          </div>
        </div>
      </div>
    );
  }

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
