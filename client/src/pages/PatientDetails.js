import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExamsTable from './components/ExamsTable';

function PatientDetails() {
    const { patientId } = useParams();
    const [patientExams, setPatientExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientExams = async () => {
            try {
                const response = await fetch(`https://czi-covid-lypkrzry4q-uc.a.run.app/api/patient/${patientId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success && data.exams) {
                    setPatientExams(data.exams);
                } else {
                    throw new Error('No exams found.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientExams();
    }, [patientId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching patient exams: {error}</div>;
    }

    return (
        <div>
            <h1>Patient Exams for {patientId}</h1>
            <ExamsTable exams={patientExams} />
        </div>
    );
}

export default PatientDetails;
