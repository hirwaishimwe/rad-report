import React, { createContext, useState, useEffect } from 'react';

export const ExamContext = createContext();
export const ExamProvider = ({ children }) => {
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExamsData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      fetchExams();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <ExamContext.Provider value={{ examsData, loading, error, fetchExams, deleteUser}}>
      {children}
    </ExamContext.Provider>
  );
};
