import PatientExamInfo from './components/PatientExamInfo'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ExamDetails() {
  const { examId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch(`https://czi-covid-lypkrzry4q-uc.a.run.app/api/exam/${examId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExamDetails(data.exam);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching exam details: {error}</div>;
  }

  if (!examDetails) {
    return <div>No exam details found</div>;
  }

  return (
    <>
      <PatientExamInfo exam={examDetails} />
    </>

  );
}

export default ExamDetails;