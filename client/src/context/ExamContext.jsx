import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import useApi from "../hooks/useApi";

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sendRequest } = useApi();

  const fetchExams = useCallback(async () => {
      setLoading(true);
      try {
          const data = await sendRequest("users", "GET");
          if (data) {
              setExamsData(data);
          }
      } catch (error) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
  }, [sendRequest]);

  useEffect(() => {
      fetchExams();
  }, []);

  const contextValue = useMemo(
      () => ({
          examsData,
          loading,
          error,
          fetchExams,
      }),
      [examsData, loading, error, fetchExams],
  );

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
      <ExamContext.Provider value={contextValue}>
          {children}
      </ExamContext.Provider>
  );
};
