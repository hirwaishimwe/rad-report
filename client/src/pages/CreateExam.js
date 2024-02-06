import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateExam.css';
import { ExamContext } from '../contexts/ExamContext';

function CreateExam() {
    const { fetchExams } = useContext(ExamContext);
    // State for each input field
    const [patientId, setPatientId] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bmi, setBmi] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [examId, setExamId] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [date, setDate] = useState('');
    const [keyFindings, setKeyFindings] = useState('');
    const navigate = useNavigate();

    /*******NEEDS TO BE UPDATED *****/
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Construct the exam object
        const newExam = {
            patientId,
            age,
            sex,
            bmi,
            zipCode,
            examId,
            imageURL,
            date,
            keyFindings,
        };
        console.log(newExam);
        fetchExams()
        // Submit logic here
        navigate('/admin');
    };

    return (
        <div className="create-exam-container">
            <h2 class="create-exam">Create Exam</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-content">
                    <div className="form-column">
                        <div className="form-section patient-info">
                            <label htmlFor="patientId">Patient ID:</label>
                            <input type="text" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />

                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

                            <label htmlFor="sex">Sex:</label>
                            <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                                <option value="">Select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>

                            <label htmlFor="bmi">BMI:</label>
                            <input type="number" step="0.01" id="bmi" value={bmi} onChange={(e) => setBmi(e.target.value)} />

                            <label htmlFor="zipCode">Zip Code:</label>
                            <input type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="form-section exam-info">
                            <label htmlFor="examId">Exam ID:</label>
                            <input type="text" id="examId" value={examId} onChange={(e) => setExamId(e.target.value)} />

                            <label htmlFor="imageURL">Image URL:</label>
                            <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />

                            <label htmlFor="keyFindings">Key Findings:</label>
                            <textarea id="keyFindings" value={keyFindings} onChange={(e) => setKeyFindings(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button class="add-exam-btn" type="submit">Add Exam</button>
                    <button class="cancel-btn" type="button" onClick={() => navigate('/admin')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateExam;
