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
            <th>Age</th>
            <th>Sex</th>
            <th>BMI</th>
            <th>Weight</th>
            <th>ICU Admit</th>
            <th>ICU Admits Count</th>
            <th>Mortality</th>
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
                  <Link to={`/patient/${exam.medical_record_number}`}>{exam.medical_record_number}</Link>
                </td>
                <td>
                  <Link to={`/exam/${exam._id}`}>{exam.exam_id}</Link>
                </td>
                <td>
                  <img src={exam.png_filename} alt={`Exam for ${exam.patientId}`} className="exam-image" />
                </td>
                <td>{exam.age}</td>
                <td>{exam.sex.toUpperCase()}</td>
                <td>{exam.latest_bmi}</td>
                <td>{exam.latest_weight}</td>
                <td>{exam.icu_admit}</td>
                <td>{exam.icu_admits_count}</td>
                <td>{exam.mortality}</td>
                <td>{exam.zip_code}</td>
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
