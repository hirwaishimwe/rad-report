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


  const {logout} = useLogout()
  const {user} = useAuthContext()
  const handleClick = () => {
    logout()
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  function handleRegister() {
    navigate("/signup")
  }
  return (
    <nav className="navbar">
      <div className="nav-group">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" style={ {height: '50px' }} />
        </Link>
        <ul>
          <li><Link to="/">Exams</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="http://localhost:8000/" target="_blank" rel="noopener noreferrer" >API Doc</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <div className="search-group">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        {!user && (
          <div>
          <button className="btn login-btn" onClick={() => handleLogin()}>Log In</button>
          <button className="btn register-btn" onClick={() => handleRegister()}>Register</button>
          </div>
          )}
        {user && (
          <div>
          <span>{user.username}</span>
        <button className= "btn " onClick={handleClick}>Log Out</button>
        </div>
        )}      
      </div>
    </nav>
  );
}


export default NavBar;