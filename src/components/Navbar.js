import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication
import '../Navbar.css';
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Check if user is authenticated and get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears user session
    navigate('/login'); // Redirects to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Car Management
        </Link>
        
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/add-car" className="navbar-link">Add Car</Link>
              <Link to="/update-car" className="navbar-link">Update Car</Link>
              <button onClick={handleLogout} className="navbar-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
            <Link
          to="/add-car"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Car
        </Link>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
