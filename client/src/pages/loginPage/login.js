import {useState} from 'react'
import './login.css'
import { useLogin } from '../../hooks/useLogin'
import {useNavigate} from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
        if (!error) {
            navigate('/exam')
          }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
        <div className="title"> <h3>Login</h3> </div>
    
        <label>Username:</label>
        <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Please enter a valid username"
        />

        <label>Password:</label>
        <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Please enter a valid password"
        />
       <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
       
        </form>
    )
} 

export default Login