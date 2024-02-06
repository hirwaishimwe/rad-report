import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ExamContext } from '../contexts/ExamContext';
import './UpdateExam.css';

function UpdateExam() {
    const { examsData, fetchExams } = useContext(ExamContext);
    const { examId } = useParams(); //'examId' is the URL param
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        patientId: '',
        age: '',
        sex: '',
        bmi: '',
        zipCode: '',
        examId: '',
        imageURL: '',
        date: '',
        keyFindings: '',
    });
    async function getExamData(examId) {
        const exam = examsData.find(exam => exam._id.toString() === examId);
    
        // Placeholder function to simulate fetching exam data
        // Replace this with actual data fetching logic
        return {
            patientId: exam.patientId,
            age: exam.age,
            sex: exam.sex,
            bmi: exam.bmi,
            zipCode: exam.bmi,
            examId: exam.examId,
            imageURL: exam.imageURL,
            date: exam.date,
            keyFindings: exam.keyFindings,
        };
    }
    
    /*******NEEDS TO BE UPDATED *****/
    useEffect(() => {
        // fetch the exam data from your backend using the examId or take the exams from examData context
        const fetchExamData = async () => {
            // Replace this with a real fetch request
            const data = await getExamData(examId);
            setExamData(data);
        };
        fetchExamData();
    }, [examId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    /*******NEEDS TO BE UPDATED *****/
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated exam data:', examData);
        // Send the update to the backend
        fetchExams()
        navigate('/admin'); // Redirect to admin or confirmation page
    };

    return (
        <div className="update-exam-container">
            <h2>Update Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    <div className="form-column">
                        {/* Patient Info Fields with pre-filled values */}
                        <label htmlFor="patientId">Patient ID:</label>
                        <input type="text" id="patientId" name="patientId" value={examData.patientId} onChange={handleChange} />

                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" value={examData.age} onChange={handleChange} />

                        <label htmlFor="sex">Sex:</label>
                        <select id="sex" name="sex" value={examData.sex} onChange={handleChange}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>

                        <label htmlFor="bmi">BMI:</label>
                        <input type="text" id="bmi" name="bmi" value={examData.bmi} onChange={handleChange} />

                        <label htmlFor="zipCode">Zip Code:</label>
                        <input type="text" id="zipCode" name="zipCode" value={examData.zipCode} onChange={handleChange} />
                    </div>

                    <div className="form-column">
                        <label htmlFor="examId">Exam ID:</label>
                        <input type="text" id="examId" name="examId" value={examData.examId} onChange={handleChange} />

                        <label htmlFor="imageURL">Image URL:</label>
                        <input type="text" id="imageURL" name="imageURL" value={examData.imageURL} onChange={handleChange} />

                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" value={examData.date} onChange={handleChange} />

                        <label htmlFor="keyFindings">Key Findings:</label>
                        <textarea id="keyFindings" name="keyFindings" value={examData.keyFindings} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn update-exam-btn">Update Exam</button>
                    <button type="button" className="btn cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}


export default UpdateExam;
