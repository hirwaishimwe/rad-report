import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './logo.png'; 

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
      <ul>
        <li><Link to="/">Exams</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
}

export default NavBar;