import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { ExamContext } from "../../context/ExamContext";
import ExamsTable from "../../pages/examTablePage/ExamsTable";
import { useAuthContext } from "../../hooks/useAuthContext";

function Admin() {
    const { examsData, loading, error } = useContext(ExamContext);
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const handleCreateNewExam = () => {
        navigate("/create-exam");
    };
    if(!user){
        return ( <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-100">
        <div className="max-w-xl mx-auto px-6 overflow-hidden">
            <div className="flex items-center">
                <div className="px-4 text-lg text-slate-900  border-r border-gray-400 tracking-wider">
                    Access Denied
                </div>
                <div className="ml-4 text-lg text-slate-900 tracking-wider">
                    Please Log In
                </div>
            </div>
        </div>
    </div>)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching exams: {error}</div>;
    }

    if (!examsData) {
        return <div>No exams found</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleCreateNewExam}
                type="button"
                className="inline-flex items-center my-5 px-7 py-2.5 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Create Exam
            </button>
            <ExamsTable exams={examsData} isAdmin={true} />
        </div>
    );
}

export default Admin;
