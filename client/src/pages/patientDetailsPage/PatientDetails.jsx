import "./PatientDetails.css";

import React, { useContext } from "react";

import { useParams } from "react-router-dom";
import { ExamContext } from "../../context/ExamContext";
import ExamsTable from "../../pages/examTablePage/ExamsTable";

function PatientDetails() {
    const { patientId } = useParams();
    const { examsData } = useContext(ExamContext);

    const exam = examsData.find(
        (exam) => exam.medical_record_number === patientId,
    );

    const patientExams = examsData.filter(
        (exam) => exam && exam.medical_record_number === patientId,
    );

    if (patientExams.length === 0) {
        return <div>Patient Exams not found</div>;
    }

    return (
        <div className="container mx-auto mt-9">
            <div className="info-section patient-info">
                <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="ID" value={exam.medical_record_number} />
                    <InfoItem label="Age" value={exam.age} />
                    <InfoItem label="Sex" value={exam.sex} />
                    <InfoItem label="Weight" value={exam.latest_weight} />
                    <InfoItem label="BMI" value={exam.latest_bmi} />
                    <InfoItem
                        label="ICU Admits"
                        value={exam.icu_admits_count}
                    />
                    <InfoItem label="ZipCode" value={exam.zip_code} />
                </div>
            </div>
            <div className="mt-8">
                <p className="text-md md:text-lg  font-bold mb-4">
                    All Exam data for: {patientId}
                </p>
                <ExamsTable exams={patientExams} />
            </div>
        </div>
    );
}

const InfoItem = ({ label, value }) => (
    <div>
        <p className="font-semibold">{label}:</p>
        <p className="text-md">{value}</p>
    </div>
);

export default PatientDetails;
