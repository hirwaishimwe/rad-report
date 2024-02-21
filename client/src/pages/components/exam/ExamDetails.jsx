import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExamContext } from "../../../context/ExamContext";
import PatientExamInfo from "../patientExam/PatientExamInfo";

function ExamDetails() {
    const { examId } = useParams();
    const { examsData } = useContext(ExamContext);

    const exam = examsData.find((exam) => exam._id.toString() === examId);

    if (!exam) {
        return <div>Exam not found</div>;
    }
    return (
        <div>
            <PatientExamInfo exam={exam} />
        </div>
    );
}

export default ExamDetails;
