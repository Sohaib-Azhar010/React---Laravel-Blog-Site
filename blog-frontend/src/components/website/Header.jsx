import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/css/Header.css'

const Header = () => {
  return (

    <>
      <header className="top-header bg-dark text-white text-center py-2">
        <small className="m-0 fw-light">Where Stories Start</small>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <img src={logo} alt="logo" width={150} />
          </Link>

          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{marginRight:'160px'}} to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-dark">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </>

  );
};

export default Header;
