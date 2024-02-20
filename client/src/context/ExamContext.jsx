import React, { createContext, useEffect, useState } from "react";

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

    return (
        <ExamContext.Provider value={{ examsData, loading, error, fetchExams }}>
            {children}
        </ExamContext.Provider>
    );
};
