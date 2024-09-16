import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/recipe-search">Recipe Search</Link>
              </li>
              <li>
                <Link to="/nutrition-info">Nutrition Info</Link>
              </li>
              <li>
                <Link to="/reminder">Expiration Reminder</Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <div className="navbar-login-signup">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
