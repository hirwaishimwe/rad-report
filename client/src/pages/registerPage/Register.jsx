import { useState, useEffect } from "react"
import "./Register.css"
import { useRegister } from "../../hooks/useRegister"
import {useNavigate} from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";




const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {register, error, isLoading} = useRegister()
  const {user} = useAuthContext()
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(username, password) 
  }

  if(user){
    navigate('/exam')
} 
  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="title"><h3>Register</h3></div>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
        placeholder="Username must be unique"
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Password must be secure"
      />

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    
    </form>
  )
}

export default Register