import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="logo">Task Manager</h2>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/login" ? "active" : ""}>
          <Link to="/login">Login</Link>
        </li>
        <li className={location.pathname === "/register" ? "active" : ""}>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
