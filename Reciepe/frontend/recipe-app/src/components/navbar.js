import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');    
     onLogout(); 
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Home</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/recipe/create">Create Recipe</Link></li>
          <li><Link to="/recipe/filter">Filter Recipe</Link></li>
          {isLoggedIn ? (
            <>
              <li><button onClick={handleLogout} className="btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
