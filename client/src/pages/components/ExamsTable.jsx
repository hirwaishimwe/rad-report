import "./ExamsTable.css"; // Import CSS file here

import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";

import { ExamContext } from "../../context/ExamContext";
import useApi from "../../hooks/useApi";

function ExamsTable({ exams, isAdmin }) {
    const { fetchExams } = useContext(ExamContext);
    const navigate = useNavigate();
    const { sendRequest } = useApi();

    function handleUpdate(id) {
        navigate(`/update-exam/${id}`);
    }

    async function handleDelete(id) {
        const response = await sendRequest(`users/${id}`, "DELETE");
        if (response) {
            fetchExams();
        }
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
                        <th>Zip Code</th>
                        <th>Mortality</th>
                        <th>ICU Admit</th>
                        <th>ICU Admits</th>
                        {isAdmin && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {exams.map((exam, index) => {
                        if (!exam) {
                            console.warn(`Exam at index ${index} is`, exam);
                            return null;
                        }

                        const {
                            medical_record_number,
                            exam_id,
                            png_filename,
                            age,
                            sex,
                            latest_bmi,
                            latest_weight,
                            zip_code,
                            mortality,
                            icu_admit,
                            icu_admits_count,
                            _id,
                        } = exam;

                        return (
                            <tr key={_id}>
                                <td className="patient_id">
                                    <Link
                                        to={`/patient/${medical_record_number}`}
                                    >
                                        {medical_record_number}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/exam/${_id}`}>{exam_id}</Link>
                                </td>
                                <td>
                                    <img
                                        src={png_filename}
                                        alt={`Exam for ${medical_record_number}`}
                                        className="exam-image"
                                    />
                                </td>
                                <td>{age}</td>
                                <td>{sex.toUpperCase()}</td>
                                <td>{latest_bmi}</td>
                                <td>{latest_weight}</td>
                                <td>{zip_code}</td>
                                <td>{mortality}</td>
                                <td>{icu_admit}</td>
                                <td>{icu_admits_count}</td>
                                {isAdmin && (
                                    <td>
                                        <button
                                            className="btn update-btn"
                                            onClick={() => handleUpdate(_id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn delete-btn"
                                            onClick={() => handleDelete(_id)}
                                        >
                                            Delete
                                        </button>
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
