import ExamsTable from './components/ExamsTable'
import React, { useEffect, useState } from 'react';
export function Exams() {
    const [examsData, setExamsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch(`https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setExamsData(data.exams);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

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