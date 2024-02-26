import ExamsTable from '../components/examsTable/ExamsTable'
import React, { useContext } from 'react';
import { ExamContext } from '../../context/ExamContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Exams.css'

function Exams({ exams }) {
    const {user} = useAuthContext()
    const { examsData, loading, error } = useContext(ExamContext);
    if(!user){
        return ( <div className="access"> <div> Access Denied  
        <div> Please Log In</div>
        </div></div>
       )
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
        <ExamsTable exams={examsData} />
    )
}

export default Exams;