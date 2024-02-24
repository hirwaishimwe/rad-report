import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../../context/ExamContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApi from '../../hooks/useApi';
import './CreateExam.css';

function CreateExam() {
    const { fetchExams } = useContext(ExamContext);
    const navigate = useNavigate();
    const { sendRequest } = useApi();

    const [medicalRecordNumber, setMedicalRecordNumber] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [proNouns, setProNouns] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [latestBmi, setLatestBmi] = useState('');
    const [latestWeight, setLatestWeight] = useState('');
    const [pngFilename, setPngFilename] = useState('');
    const [examId, setExamId] = useState('');
    const [icuAdmit, setIcuAdmit] = useState('');
    const [icuAdmitsCount, setIcuAdmitsCount] = useState('');
    const [mortality, setMortality] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        const newExam = {
            medical_record_number: medicalRecordNumber,
            age: age,
            sex: sex,
            pro_nouns: proNouns,
            zip_code: zipCode,
            latest_bmi: latestBmi,
            latest_weight: latestWeight,
            png_filename: pngFilename,
            exam_id: examId,
            icu_admit: icuAdmit,
            icu_admits_count: icuAdmitsCount,
            mortality: mortality,
        };
        try {
            const result = await sendRequest('users', 'POST', newExam);
            if (result) {
                toast.success('Exam created successfully!');
                setTimeout(() => {
                    navigate('/admin');
                    fetchExams();
                }, 2000);
            } else {
                throw new Error('Creation failed');
            }
        } catch (error) {
            console.error('Failed to create exam:', error);
            toast.error('Exam could not be created!');
        }
        setLoading(false);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case 'medicalRecordNumber':
                setMedicalRecordNumber(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'sex':
                setSex(value);
                break;
            case 'proNouns':
                setProNouns(value);
                break;
            case 'zipCode':
                setZipCode(value);
                break;
            case 'latestBmi':
                setLatestBmi(value);
                break;
            case 'latestWeight':
                setLatestWeight(value);
                break;
            case 'pngFilename':
                setPngFilename(value);
                break;
            case 'examId':
                setExamId(value);
                break;
            case 'icuAdmit':
                setIcuAdmit(value);
                break;
            case 'icuAdmitsCount':
                setIcuAdmitsCount(value);
                break;
            case 'mortality':
                setMortality(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="create-exam-container">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <h2 className="create-exam">Create Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">

                    <div className="form-column">
                        <label htmlFor="medicalRecordNumber">Patient ID:</label>
                        <input
                            type="text"
                            id="medicalRecordNumber"
                            name="medicalRecordNumber"
                            value={medicalRecordNumber}
                            onChange={handleChange}
                        />

                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={age}
                            onChange={handleChange}
                        />

                        <label htmlFor="zipCode">Zip Code:</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={zipCode}
                            onChange={handleChange}
                        />
                        <label htmlFor="icuAdmitsCount">ICU Admits Count:</label>
                        <input
                            type="number"
                            id="icuAdmitsCount"
                            name="icuAdmitsCount"
                            value={icuAdmitsCount}
                            onChange={handleChange}
                        />

                        <label htmlFor="sex">Sex:</label>
                        <select id="sex" name="sex" value={sex} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>

                        <label htmlFor="proNouns">Pronouns:</label>
                        <select id="proNouns" name="proNouns" value={proNouns} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="He/Him">He/Him</option>
                            <option value="She/Her">She/Her</option>
                            <option value="They/Them">They/Them</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-column">
                        <label htmlFor="examId">Exam ID:</label>
                        <input
                            type="text"
                            id="examId"
                            name="examId"
                            value={examId}
                            onChange={handleChange}
                        />
                        <label htmlFor="latestBmi">BMI:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="latestBmi"
                            name="latestBmi"
                            value={latestBmi}
                            onChange={handleChange}
                        />

                        <label htmlFor="latestWeight">Weight:</label>
                        <input
                            type="number"
                            id="latestWeight"
                            name="latestWeight"
                            value={latestWeight}
                            onChange={handleChange}
                        />

                        <label htmlFor="pngFilename">Image:</label>
                        <input
                            type="text"
                            id="pngFilename"
                            name="pngFilename"
                            value={pngFilename}
                            onChange={handleChange}
                        />

                        <label htmlFor="icuAdmit">ICU Admit:</label>
                        <select id="icuAdmit" name="icuAdmit" value={icuAdmit} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>

                        <label htmlFor="mortality">Mortality:</label>
                        <select id="mortality" name="mortality" value={mortality} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn add-exam-btn" disabled={loading}>Add Exam</button>
                    <button type="button" className="btn cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateExam;
