import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { useAuthContext } from "../hooks/useAuthContext"; // Import the useAuthContext hook
  import useApi from "../hooks/useApi";
  
  export const ExamContext = createContext();
  
  export const ExamProvider = ({ children }) => {
    const [examsData, setExamsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext(); // Get the user from the auth context
    const { sendRequest } = useApi();
  
    const fetchExams = useCallback(async () => {
      if (user) { // Check if the user is authenticated
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
      }
    }, [sendRequest, user]); // Add user as a dependency
  
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
      [examsData, loading, error, fetchExams]
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