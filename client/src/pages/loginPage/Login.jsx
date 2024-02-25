import {useState} from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../hooks/useAuthContext';



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();
    const {user} = useAuthContext();
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    
    if(user){
        navigate('/exam')
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