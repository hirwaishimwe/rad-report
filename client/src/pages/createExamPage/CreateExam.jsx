import "./CreateExam.css";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ExamContext } from "../../context/ExamContext";
import useApi from "../../hooks/useApi";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateExam() {
    const { fetchExams } = useContext(ExamContext);
    const navigate = useNavigate();
    const { sendRequest } = useApi();

    const [medicalRecordNumber, setMedicalRecordNumber] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [proNouns, setProNouns] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [latestBmi, setLatestBmi] = useState("");
    const [latestWeight, setLatestWeight] = useState("");
    const [pngFilename, setPngFilename] = useState("");
    const [examId, setExamId] = useState("");
    const [icuAdmit, setIcuAdmit] = useState("");
    const [icuAdmitsCount, setIcuAdmitsCount] = useState("");
    const [mortality, setMortality] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
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
        try{
        const result = await sendRequest("users", "POST", newExam);
        if (result) {
            console.log("Exam created:", result);
            toast.success("Exam created successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "bounce",
              });
              setTimeout(() => {
                navigate("/admin");
                fetchExams();
              }, 1500);
            } else {
                throw new Error("Creation failed");
            } 
    } catch (error) {
        console.error("Failed to create exam:", error);
        toast.error("Failed to create exam", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "bounce",
            });
        }
        setLoading(false);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "medicalRecordNumber":
                setMedicalRecordNumber(value);
                break;
            case "age":
                setAge(value);
                break;
            case "sex":
                setSex(value);
                break;
            case "proNouns":
                setProNouns(value);
                break;
            case "zipCode":
                setZipCode(value);
                break;
            case "latestBmi":
                setLatestBmi(value);
                break;
            case "latestWeight":
                setLatestWeight(value);
                break;
            case "pngFilename":
                setPngFilename(value);
                break;
            case "examId":
                setExamId(value);
                break;
            case "icuAdmit":
                setIcuAdmit(value);
                break;
            case "icuAdmitsCount":
                setIcuAdmitsCount(value);
                break;
            case "mortality":
                setMortality(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="create-exam-container">
            <h2 className="create-exam">Create Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    {/* Column 1 */}
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
                            type="number"
                            maxLength={5}
                            id="zipCode"
                            name="zipCode"
                            value={zipCode}
                            onChange={handleChange}
                        />
                        <label htmlFor="icuAdmitsCount">
                            ICU Admits Count:
                        </label>
                        <input
                            type="number"
                            id="icuAdmitsCount"
                            name="icuAdmitsCount"
                            value={icuAdmitsCount}
                            onChange={handleChange}
                        />

                        <label htmlFor="sex">Sex:</label>
                        <select
                            id="sex"
                            name="sex"
                            value={sex}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>

                        <label htmlFor="proNouns">Pronouns:</label>
                        <select
                            id="proNouns"
                            name="proNouns"
                            value={proNouns}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="He/Him">He/Him</option>
                            <option value="She/Her">She/Her</option>
                            <option value="They/Them">They/Them</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Column 2 */}
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
                        <select
                            id="icuAdmit"
                            name="icuAdmit"
                            value={icuAdmit}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>

                        <label htmlFor="mortality">Mortality:</label>
                        <select
                            id="mortality"
                            name="mortality"
                            value={mortality}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn add-exam-btn">
                        Add Exam
                    </button>
                    <button
                        type="button"
                        className="btn cancel-btn"
                        onClick={() => navigate("/admin")}
                    >
                        Cancel
                    </button>
                    <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
                </div>
            </form>
        </div>
    );
}

export default CreateExam;
