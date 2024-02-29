import "./PatientExamInfo.css";

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExamContext } from "../../../context/ExamContext";

function PatientExamInfo() {
  const { examId } = useParams();
  const { examsData } = useContext(ExamContext);
  const exam = examsData.find(exam => exam._id === examId);

  if (!exam) {
    return <div>Exam Not Found</div>;
  }

  return (
    <div className="patient-exam-info">
      <div className="info-section patient-info">
        <h2>Patient Info</h2>
        <p>
          <strong>Patient ID:</strong> {exam.medical_record_number}
        </p>
        <p>
          <strong>Age:</strong> {exam.age}
        </p>
        <p>
          <strong>Sex:</strong> {exam.sex}
        </p>
        <p>
          <strong>Weight:</strong> {exam.latest_weight}
        </p>
        <p>
          <strong>BMI:</strong> {exam.latest_bmi}
        </p>
        <p>
          <strong>ICU Admits:</strong> {exam.icu_admits_count}
        </p>
        <p>
          <strong>ZipCode:</strong> {exam.zip_code}
        </p>
      </div>
      <div className="info-section exam-info">
        <h2>Exam Info</h2>
        <p>
          <strong>Exam ID:</strong> {exam.exam_id}
        </p>
        <p>
          <strong>Image URL:</strong>{" "}
          <a href={exam.png_filename} target="_blank" rel="noopener noreferrer">
            View Image
          </a>
        </p>
        <div className="exam-image-container">
          <img src={exam.png_filename} alt="user_exam_x_ray_img" />
        </div>
        <p>
          <strong>ICU Admit:</strong> {exam.icu_admit}
        </p>
        <p>
          <strong>Mortality:</strong> {exam.mortality}
        </p>
      </div>
    </div>
  );
}

export default PatientExamInfo;
