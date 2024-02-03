import { Link } from 'react-router-dom';
import React from 'react';
import './ExamsTable.css';

function ExamsTable({ exams }) {

  return (

    <div className="exams-table-container">
      <table className="exams-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Exam ID</th>
            <th>Image</th>
            <th>Key Findings</th>
            <th>Brixia Score</th>
            <th>Age</th>
            <th>Sex</th>
            <th>BMI</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => {
            if (!exam) {
              console.warn(`Exam at index ${index} is`, exam);
              return null;
            }

            return (
              <tr key={exam._id}>
                <td>
                  <Link to={`/patient/${exam.patientId}`}>{exam.patientId}</Link>
                </td>
                <td>
                  <Link to={`/exam/${exam._id}`}>{exam.examId}</Link>
                </td>
                <td>
                  <img src={exam.imageURL} alt={`Exam for ${exam.patientId}`} className="exam-image" />
                </td>
                <td>{exam.keyFindings}</td>
                <td>{exam.brixiaScores}</td>
                <td>{exam.age}</td>
                <td>{exam.sex.toUpperCase()}</td>
                <td>{exam.bmi}</td>
                <td>{exam.zipCode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExamsTable;
