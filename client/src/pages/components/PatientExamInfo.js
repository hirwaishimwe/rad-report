import './PatientExamInfo.css';

const PatientExamInfo = ({ exam }) => {
  return (
    <div className="patient-exam-info">
      <div className="info-section patient-info">
        <h2>Patient Info</h2>
        <p><strong>Patient ID:</strong> {exam.patientId}</p>
        <p><strong>Age:</strong> {exam.age}</p>
        <p><strong>Sex:</strong> {exam.sex}</p>
        <p><strong>BMI:</strong> {exam.bmi}</p>
        <p><strong>ZipCode:</strong> {exam.zipCode}</p>
      </div>
      <div className="info-section exam-info">
        <h2>Exam Info</h2>
        <p><strong>Exam ID:</strong> {exam.examId}</p>
        <p><strong>Image URL:</strong> <a href={exam.imageURL} target="_blank" rel="noopener noreferrer">View Image</a></p>
        <div className="exam-image-container">
          <img src={exam.imageURL} alt="Exam Image" />
        </div>
        <p><strong>Date:</strong> { }</p>
        <p><strong>Key Findings:</strong> {exam.keyFindings}</p>
        <p><strong>Brixia Score:</strong> {exam.brixiaScores}</p>
      </div>
    </div>
  );
};

export default PatientExamInfo;
