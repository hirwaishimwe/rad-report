import React, { createContext, useEffect, useMemo, useState } from "react";

import useApi from "../hooks/useApi"; // Adjust the path as necessary

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
    const [examsData, setExamsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { sendRequest } = useApi();

    const fetchExams = async () => {
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
    };

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

    return (
        <ExamContext.Provider value={contextValue}>
            {children}
        </ExamContext.Provider>
    );
};
