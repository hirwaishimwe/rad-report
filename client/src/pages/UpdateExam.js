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

    const handleUpdateAndNavigate = async () => {
        await fetchExams(); // Wait for this to complete
        navigate('/admin'); // Then navigate
      };
    /*******NEEDS TO BE UPDATED *****/
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/api/users/${examId}`, {
            method: 'PATCH', // Specify the PUT method
            headers: {
                'Content-Type': 'application/json', // Indicate JSON content type
            },
            body: JSON.stringify(examData) // Convert the JavaScript object to a JSON string
        })
            .then(response => response.json()) // Parsing the JSON response body
            .then(updatedResource => {
                console.log('Success:', updatedResource); // Handling the response with the updated resource
            })
            .catch(error => {
                console.error('Error:', error); // Handling any errors
            });
        console.log('Updated exam data:', examData);
        // Send the update to the backend
        handleUpdateAndNavigate()
    };

    return (
        <div className="update-exam-container">
            <h2>Update Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    <div className="form-column">
                        {/* Patient Info Fields with pre-filled values */}
                        <label htmlFor="patientId">Patient ID:</label>
                        <input type="text" id="patientId" name="medical_record_number" value={examData.medical_record_number} onChange={handleChange} />

                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" value={examData.age} onChange={handleChange} />

                        <label htmlFor="zipCode">Zip Code:</label>
                        <input type="text" id="zipCode" name="zip_code" value={examData.zip_code} onChange={handleChange} />

                        <label htmlFor="IcuAdmitCount">ICU Admit Count:</label>
                        <input type="number" id="IcuAdmitCount" name="icu_admits_count" value={examData.icu_admits_count} onChange={handleChange} />
                        
                        <label htmlFor="sex">Sex:</label>
                        <select id="sex" name="sex" value={examData.sex} onChange={handleChange}>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>    
                        <label htmlFor="sex">Pronouns:</label>
                        <select id="pronouns" name="pro_nouns" value={examData.pro_nouns} onChange={handleChange}>
                            <option value="He/Him">He/Him</option>
                            <option value="She/Her">She/Her</option>
                            <option value="They/Them">They/Them</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                
                    <div className="form-column">
                        <label htmlFor="examId">Exam ID:</label>
                        <input type="text" id="examId" name="exam_id" value={examData.exam_id} onChange={handleChange} />

                        <label htmlFor="imageURL">Image URL:</label>
                        <input type="text" id="imageURL" name="png_filename" value={examData.png_filename} onChange={handleChange} />
                        <label htmlFor="bmi">BMI:</label>
                        <input type="text" id="bmi" name="latest_bmi" value={examData.latest_bmi} onChange={handleChange} />

                        <label htmlFor="weight">Weight:</label>
                        <input type="number" id="weight" name="latest_weight" value={examData.latest_weight} onChange={handleChange} />

                        <label htmlFor="IcuAdmit">ICU Admit:</label>
                        <select id="IcuAdmit" name="icu_admit" value={examData.icu_admit} onChange={handleChange} >
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
