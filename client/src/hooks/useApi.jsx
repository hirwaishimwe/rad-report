import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useApi = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const sendRequest = async (path, method, body = null) => {
        try {
            if (!user || !user.token) {
                console.log("User is not authenticated or token is missing.");
                return;
            }
            const url = `${process.env.REACT_APP_API_URL}/${path}`;
            const options = {
                method: method,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: body ? JSON.stringify(body) : null,
            };
            const res = await fetch(url, options);
            const data = await res.json();
            setResponse(data);
            return data;
        } catch (err) {
            setError(err);
            console.error("Error:", err);
            return err; // Return the error
        }
    };
    
    return { sendRequest, response, error };
};

export default useApi;
