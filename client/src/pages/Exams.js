import ExamsTable from "./components/ExamsTable";
import React, { useContext } from "react";
import { ExamContext } from "../context/ExamContext";

function Exams({ exams }) {
  const { examsData, loading, error } = useContext(ExamContext);
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
