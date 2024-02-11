import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ExamContext } from '../contexts/ExamContext';
import './UpdateExam.css';

function UpdateExam() {
    const { examsData, fetchExams } = useContext(ExamContext);
    const { examId } = useParams(); 
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        medical_record_number: '',
        age: '',
        sex: '',
        pro_nouns: '',
        zip_code: '',
        latest_bmi: '',
        latest_weight: '',
        png_filename: '',
        exam_id: '',
        icu_admit: '',
        icu_admits_count: '',
        mortality: ''
    });
    async function getExamData(examId) {
        const exam = examsData.find(exam => exam._id.toString() === examId);

        // Placeholder function to simulate fetching exam data
        // Replace this with actual data fetching logic
        return {
            medical_record_number: exam.medical_record_number,
            age: exam.age,
            sex: exam.sex,
            pro_nouns: exam.pro_nouns,
            zip_code: exam.zip_code,
            latest_bmi: exam.latest_bmi,
            latest_weight: exam.latest_weight,
            png_filename: exam.png_filename,
            exam_id: exam.exam_id,
            icu_admit: exam.icu_admit,
            icu_admits_count: exam.icu_admits_count,
            mortality: exam.mortality,
        };
    }

    useEffect(() => {
        const fetchExamData = async () => {
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
                        <input type="text" id="patientId" name="patientId" value={examData.medical_record_number} onChange={handleChange} />

                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" value={examData.age} onChange={handleChange} />

                        <label htmlFor="sex">Sex:</label>
                        <select id="sex" name="sex" value={examData.sex} onChange={handleChange}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>    
                        <label htmlFor="sex">Pronouns:</label>
                        <select id="pronouns" name="pronouns" value={examData.pro_nouns} onChange={handleChange}>
                            <option value="He/Him">He/Him</option>
                            <option value="She/Her">Female</option>
                            <option value="They/Them">They/Them</option>
                            <option value="Other">Other</option>
                        </select>

                        <label htmlFor="zipCode">Zip Code:</label>
                        <input type="text" id="zipCode" name="zipCode" value={examData.zip_code} onChange={handleChange} />

                        <label htmlFor="IcuAdmitCount">ICU Admit Count:</label>
                        <input type="number" id="IcuAdmitCount" name="IcuAdmitCount" value={examData.icu_admit} onChange={handleChange} />
                        
                    </div>
                
                    <div className="form-column">
                        <label htmlFor="examId">Exam ID:</label>
                        <input type="text" id="examId" name="examId" value={examData.exam_id} onChange={handleChange} />

                        <label htmlFor="imageURL">Image URL:</label>
                        <input type="text" id="imageURL" name="imageURL" value={examData.png_filename} onChange={handleChange} />
                        <label htmlFor="bmi">BMI:</label>
                        <input type="text" id="bmi" name="bmi" value={examData.latest_bmi} onChange={handleChange} />

                        <label htmlFor="weight">Weight:</label>
                        <input type="number" id="weight" name="weight" value={examData.latest_weight} onChange={handleChange} />

                        <label htmlFor="IcuAdmit">ICU Admit:</label>
                        <select id="IcuAdmit" name="IcuAdmit" value={examData.icu_admit} onChange={handleChange} >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>
                        <label htmlFor="mortality">Mortality:</label>
                        <select id="mortality" name="mortality" value={examData.mortality} onChange={handleChange} >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>                    
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
