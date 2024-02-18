import { useState } from 'react';

const useApi = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const sendRequest = async (path, method, body = null) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/${path}`;
            console.log(`Sending request to ${url} with method ${method}`);
            console.log('API URL:', process.env.REACT_APP_API_URL);
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
            };
            const res = await fetch(url, options);
            const data = await res.json();
            console.log('Response:', data);
            setResponse(data);
            return data;
        } catch (err) {
            setError(err);
            console.error('Error:', err);
        }
    };

    return { sendRequest, response, error };
};

export default useApi;
