import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        Result Management System
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
