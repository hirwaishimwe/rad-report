import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { user } = useAuthContext()

  const register = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const token = user?.token; // Optional chaining to safely access token property
    const headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}
