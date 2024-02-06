import { useParams } from 'react-router-dom';
import ExamsTable from './components/ExamsTable';
import { useContext } from 'react';
import { ExamContext } from '../contexts/ExamContext';
import './PatientDetails.css'

function PatientDetails() {
    const { patientId } = useParams();
    const { examsData } = useContext(ExamContext);
    const exam = examsData.find(exam => exam.patientId === patientId);
    const patientExams = examsData.filter(exam => exam && exam.patientId === patientId);

    if (patientExams.length === 0) {
        return <div>Patient Exams not found</div>;
    }

    return (
        <>
            <div className="info-section patient-info">
                <h2>Patient Info</h2>
                <div class="container">
                    <p class="inline"><strong>Patient ID:</strong> {exam.patientId}</p>
                    <p class="inline"><strong>Age:</strong> {exam.age}</p>
                    <p class="inline"><strong>Sex:</strong> {exam.sex}</p>
                    <p class="inline"><strong>BMI:</strong> {exam.bmi}</p>
                    <p class="inline"><strong>ZipCode:</strong> {exam.zipCode}</p>
                </div>
            </div>
            <div>
                <h1>All Patient Exams for {patientId}</h1>
                <ExamsTable exams={patientExams} />
            </div>
        </>
    );
}

export default PatientDetails;
