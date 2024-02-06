import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './ExamsTable.css';
import { ExamContext } from '../../contexts/ExamContext';

function ExamsTable({ exams, isAdmin }) {
  const { fetchExams } = useContext(ExamContext);
  const navigate = useNavigate();

  function handleUpdate(id) {
    navigate(`/update-exam/${id}`);
  }

  /*******NEEDS TO BE UPDATED *****/
  function handleDelete(id) {
    console.log('Delete', id);
    fetchExams()

    //Needs logic to delete the exam
  }
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
            {isAdmin && (
              <th></th>
            )}
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
                {isAdmin && (
                  <td>
                    <td>
                      <button className="btn update-btn" onClick={() => handleUpdate(exam._id)}>Update</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(exam.id)}>Delete</button>
                    </td>

                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ExamsTable;
