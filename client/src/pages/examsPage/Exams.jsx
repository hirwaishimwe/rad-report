import React, { useContext } from "react";

import { ExamContext } from "../../context/ExamContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import ExamsTable from "../components/examsTable/ExamsTable";

function Exams({ exams }) {
  const { user } = useAuthContext();
  const { examsData, loading, error } = useContext(ExamContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Access Denied</div>
          <div>
            Please <a href="/login">Login</a> to have access to this page.
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

  return <ExamsTable exams={examsData} />;
}

export default Exams;
