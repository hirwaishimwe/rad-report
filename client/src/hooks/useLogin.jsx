import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ username, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            // Update loading state
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
