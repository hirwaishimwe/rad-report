import React,{ useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ExamContext } from '../../../context/ExamContext';
import ReactPaginate from "react-paginate";
import useApi from '../../../hooks/useApi';
import './ExamsTable.css';

import {
  ChakraProvider,
  Button, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

function ExamsTable({ exams, isAdmin }) {
  const [itemToDelete, setItemToDelete] = useState(null)
  const isOpen = itemToDelete !== null
  const cancelRef = React.useRef();
  const onClose = () => setItemToDelete(null)
  const { fetchExams } = useContext(ExamContext);
  const navigate = useNavigate();
  const { sendRequest } = useApi();

  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterKey, setFilterKey] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  function handleUpdate(id) {
    navigate(`/update-exam/${id}`);
  }

  async function handleDelete() {
    const id = itemToDelete
    const response = await sendRequest(`users/${id}`, 'DELETE');
    if (response) {
        toast.success('Exam deleted successfully!', {
            onClose: () => {
                fetchExams();
            }
        });
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
  const currentData = filteredExams.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredExams.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <ChakraProvider>
    <div className="exams-table-container">
      <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
        />

        
      <div className="table-controls">
        <div className="control-group">
          <label htmlFor="sortKey">Sort by:</label>
          <select id="sortKey" onChange={(e) => setSortKey(e.target.value)}>
            <option value="">All</option>
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
            <option value="">All</option>
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
            <th>Pronouns</th>
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
          {currentData.map((exam) => (
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
              <td>{exam.pro_nouns}</td>
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
                  <button className="btn delete-btn" onClick={() => setItemToDelete(exam._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"pagination-button"}
          previousClassName={"pagination-button"}
          nextClassName={"pagination-button"}
          disabledClassName={"disabled"}
        />
                <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </div>
    </div>
    </ChakraProvider>
  );
}

export default ExamsTable;
