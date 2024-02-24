import React, { useContext } from "react";

import { ExamContext } from "../../../context/ExamContext";
import ExamsTable from "../../examTablePage/ExamsTable";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Exams({ exams }) {
    const {user} = useAuthContext()
    const { examsData, loading, error } = useContext(ExamContext);
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
    return <ExamsTable exams={examsData} />;
}

export default Exams;
