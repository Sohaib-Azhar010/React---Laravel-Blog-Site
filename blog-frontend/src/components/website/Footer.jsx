import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row text-center text-lg-start">

                    {/* Column 1: Logo & Slogan */}
                    <div className="col-lg-4 mb-4">
                        <img src={logo} alt="Logo" width="200" className="mb-2" />
                        <h4 className="fw-light">Where Stories Start</h4>
                    </div>

                    {/* Column 2: Pages */}
                    <div className="col-lg-4 mb-4">
                        <h6 className="text-uppercase mb-3">Pages</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/blogs" className="text-white text-decoration-none">Blogs</Link></li>
                            <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Auth Links */}
                    <div className="col-lg-4 mb-4">
                        <h6 className="text-uppercase mb-3">Account</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="text-center mt-3">
                    <small className="text-muted">&copy; {new Date().getFullYear()} BlogSite. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
