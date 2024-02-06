import React, { createContext, useState, useEffect } from 'react';

export const ExamContext = createContext();
export const ExamProvider = ({ children }) => {
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams');
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

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <ExamContext.Provider value={{ examsData, loading, error, fetchExams }}>
      {children}
    </ExamContext.Provider>
  );
};
