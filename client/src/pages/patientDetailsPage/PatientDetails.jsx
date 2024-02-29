import "./PatientDetails.css";

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExamContext } from "../../context/ExamContext";
import ExamsTable from "../components/examsTable/ExamsTable";

function PatientDetails() {
  const { patientId } = useParams();
  const { examsData } = useContext(ExamContext);
  const exam = examsData.find(exam => exam.medical_record_number === patientId);
  const patientExams = examsData.filter(
    exam => exam && exam.medical_record_number === patientId
  );

  if (patientExams.length === 0) {
    return <div>Patient Exams not found</div>;
  }

  return (
    <>
      <div className="info-section patient-info">
        <h2>Patient Info</h2>
        <div className="container">
          <p className="inline">
            <strong>Patient ID:</strong> {exam.medical_record_number}
          </p>
          <p className="inline">
            <strong>Age:</strong> {exam.age}
          </p>
          <p className="inline">
            <strong>Sex:</strong> {exam.sex}
          </p>
          <p className="inline">
            <strong>Weight:</strong> {exam.latest_weight}
          </p>
          <p className="inline">
            <strong>BMI:</strong> {exam.latest_bmi}
          </p>
          <p className="inline">
            <strong>ICU Admits:</strong> {exam.icu_admits_count}
          </p>
          <p className="inline">
            <strong>ZipCode:</strong> {exam.zip_code}
          </p>
        </div>
      </div>
      <div>
        <h1>All Patient Exams for {patientId}</h1>
        <ExamsTable exams={patientExams} />
      </div>
    </>
  );
}

export default PatientDetails;
