import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from './logo.png';
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from '../../../hooks/useAuthContext';

function NavBar() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate("/login")
  }

  const handleClick = () => {
    logout()
  }

  const {logout} = useLogout()
  
  const {user} = useAuthContext()
  
  const handleSignOut = () => {
    localStorage.removeItem('token')
    logout()
    navigate('/login')
  }

  function handleRegister() {
    navigate("/register")
  }
  return (
    <nav className="navbar">
      <div className="nav-group">
        <Link to="/exam" className="logo">
          <img src={logo} alt="Logo" style={ {height: '50px' }} />
        </Link>
        <ul>
          <li><Link to="/exam">Exams</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="http://localhost:8000/" target="_blank" rel="noopener noreferrer" >API Doc</Link></li>
          {user && (
          <li className="welcome">
          <span>Welcome, {user.username}</span>
        </li>
        )}  
        </ul>
      </div>
      
      <div className="search-group">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />     
          </div>

        {user && ( <div className="btn" onClick={handleSignOut}>Log Out</div> )} 
        {!user && (<div className="btn" onClick={handleLogin}>Log In</div> )}
        {!user && ( <div className="btn" onClick={handleRegister}>Register</div> )} 
       
      </div>
    </nav>
  );
}

export default NavBar;