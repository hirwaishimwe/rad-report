import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExamContext } from '../../../context/ExamContext';
import useApi from '../../../hooks/useApi';
import './ExamsTable.css';

function ExamsTable({ exams, isAdmin }) {
  const { fetchExams } = useContext(ExamContext);
  const navigate = useNavigate();
  const { sendRequest } = useApi();

  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterKey, setFilterKey] = useState('');
  const [filterValue, setFilterValue] = useState('');

  function handleUpdate(id) {
    navigate(`/update-exam/${id}`);
  }

  async function handleDelete(id) {
    const response = await sendRequest(`users/${id}`, 'DELETE');
    if (response) {
      fetchExams();
    }
  }

  function sortExams(exams) {
    return exams.sort((a, b) => {
      const valueA = typeof a[sortKey] === 'string' ? a[sortKey].toLowerCase() : a[sortKey];
      const valueB = typeof b[sortKey] === 'string' ? b[sortKey].toLowerCase() : b[sortKey];

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  function filterExams(exams) {
    if (!filterKey || !filterValue) {
      return exams;
    }
    return exams.filter(exam => {
      const value = exam[filterKey].toString().toLowerCase();
      return value.includes(filterValue.toLowerCase());
    });
  }

  const sortedExams = sortExams(exams);
  const filteredExams = filterExams(sortedExams);

  return (
    <div className="exams-table-container">
      <div className="table-controls">
        <div className="control-group">
          <label htmlFor="sortKey">Sort by:</label>
          <select id="sortKey" onChange={(e) => setSortKey(e.target.value)}>
            <option value="">Select</option>
            <option value="age">Age</option>
            <option value="sex">Sex</option>
            <option value="latest_bmi">BMI</option>
            <option value="latest_weight">Weight</option>
            <option value="zip_code">Zip Code</option>
            <option value="icu_admits_count">ICU Admits Count</option>
          </select>
          <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="filterKey">Filter by:</label>
          <select id="filterKey" onChange={(e) => setFilterKey(e.target.value)}>
            <option value="">Select</option>
            <option value="sex">Sex</option>
            <option value="zip_code">Zip Code</option>
            <option value="icu_admit">ICU Admit</option>
            <option value="mortality">Mortality</option>
          </select>
          <input id="filterValue" type="text" placeholder="Enter value..." onChange={(e) => setFilterValue(e.target.value)} />
        </div>
      </div>
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
            <th>Zip Code</th>
            <th>Mortality</th>
            <th>ICU Admit</th>
            <th>ICU Admits Count</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredExams.map((exam) => (
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
              <td>{exam.zip_code}</td>
              <td>{exam.mortality}</td>
              <td>{exam.icu_admit}</td>
              <td>{exam.icu_admits_count}</td>
              {isAdmin && (
                <td>
                  <button className="btn update-btn" onClick={() => handleUpdate(exam._id)}>Update</button>
                  <button className="btn delete-btn" onClick={() => handleDelete(exam._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamsTable;
