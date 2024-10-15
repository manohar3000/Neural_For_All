import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        
        <li>
          <NavLink to="/" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active-link">
            LogIn
          </NavLink>
        </li>
        <li>
          <NavLink to="/signUp" activeClassName="active-link">
            SignUp
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
