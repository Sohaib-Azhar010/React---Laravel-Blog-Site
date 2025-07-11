import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import '../assets/css/AdminLayout.css'

const AdminLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const closeSidebar = () => setOpen(false);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className={`d-flex admin-wrapper ${open ? 'sidebar-open' : ''}`}>
            {/* ───────── Sidebar ───────── */}
            <aside className="admin-sidebar bg-white shadow-sm border-end">
                <div className="d-flex flex-column h-100">
                    {/* Brand Header */}
                    <div className="sidebar-header py-4 px-3 text-center border-bottom bg-gradient">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={logo} alt="" width={100} />
                        </div>
                        
                    </div>

                    {/* Navigation */}
                    <div className="flex-grow-1 py-3">
                        <ul className="nav flex-column">
                            {/* Dashboard */}
                            <li className="nav-item mb-1">
                                <Link 
                                    to="/admin/dashboard" 
                                    className="nav-link d-flex align-items-center py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    onClick={closeSidebar}
                                >
                                    <i className="bi bi-speedometer2 me-3 text-primary"></i>
                                    <span className="fw-medium">Dashboard</span>
                                </Link>
                            </li>

                            {/* Blog Management */}
                            <li className="nav-item mb-1">
                                <div 
                                    className="nav-link d-flex align-items-center justify-content-between py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    role="button"
                                    onClick={() => toggleDropdown('blogs')}
                                >
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-journal-text me-3 text-success"></i>
                                        <span className="fw-medium">Blogs</span>
                                    </div>
                                    <i className={`bi bi-chevron-${activeDropdown === 'blogs' ? 'up' : 'down'} small`}></i>
                                </div>
                                <div className={`dropdown-content ${activeDropdown === 'blogs' ? 'show' : ''}`}>
                                    <Link 
                                        to="/admin/blogs/pending" 
                                        className="dropdown-item d-flex align-items-center py-2 px-4 ms-3"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-hourglass-split me-2 text-warning"></i>
                                        <span className="small">Pending Blogs</span>
                                    </Link>
                                    <Link 
                                        to="/admin/blogs/approved" 
                                        className="dropdown-item d-flex align-items-center py-2 px-4 ms-3"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-check2-circle me-2 text-success"></i>
                                        <span className="small">Approved Blogs</span>
                                    </Link>
                                    <Link 
                                        to="/admin/blogs/create" 
                                        className="dropdown-item d-flex align-items-center py-2 px-4 ms-3"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-plus-square me-2 text-primary"></i>
                                        <span className="small">Create Blog</span>
                                    </Link>
                                </div>
                            </li>

                            {/* Category Management */}
                            <li className="nav-item mb-1">
                                <div 
                                    className="nav-link d-flex align-items-center justify-content-between py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    role="button"
                                    onClick={() => toggleDropdown('categories')}
                                >
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-tags me-3 text-info"></i>
                                        <span className="fw-medium">Categories</span>
                                    </div>
                                    <i className={`bi bi-chevron-${activeDropdown === 'categories' ? 'up' : 'down'} small`}></i>
                                </div>
                                <div className={`dropdown-content ${activeDropdown === 'categories' ? 'show' : ''}`}>
                                    <Link 
                                        to="/admin/categories/create" 
                                        className="dropdown-item d-flex align-items-center py-2 px-4 ms-3"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-plus-square me-2 text-primary"></i>
                                        <span className="small">Create Category</span>
                                    </Link>
                                </div>
                            </li>

                            {/* Authors */}
                            <li className="nav-item mb-1">
                                <Link 
                                    to="/admin/authors" 
                                    className="nav-link d-flex align-items-center py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    onClick={closeSidebar}
                                >
                                    <i className="bi bi-people me-3 text-secondary"></i>
                                    <span className="fw-medium">Manage Authors</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logout Button */}
                    <div className="p-3 border-top">
                        <button
                            className="btn btn-outline-none w-100 d-flex align-items-center justify-content-center py-2"
                            onClick={() => {
                                // TODO: Logout logic
                                closeSidebar();
                            }}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            <span className="fw-medium">Logout</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="py-3 text-center border-top bg-light">
                        <small className="text-muted">E‑Blogs © {new Date().getFullYear()}</small>
                    </div>
                </div>
            </aside>

            {/* ───────── Page content ───────── */}
            <div className="flex-grow-1 d-flex flex-column page-area">
                {/* Topbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 border-bottom">
                    <div className="container-fluid">
                        {/* Mobile sidebar toggle */}
                        <button
                            className="btn btn-outline-secondary d-lg-none me-3"
                            onClick={() => setOpen(true)}
                        >
                            <i className="bi bi-list"></i>
                        </button>

                        {/* Page title */}
                        <div className="d-flex align-items-center me-auto">
                            <h5 className="mb-0 fw-semibold text-dark">Admin Panel</h5>
                        </div>

                        {/* User info and actions */}
                        <div className="d-flex align-items-center">
                            <div className="dropdown me-3">
                                <button className="btn btn-light dropdown-toggle border-0" type="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-bell me-1"></i>
                                    <span className="badge bg-danger badge-sm">3</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><h6 className="dropdown-header">Notifications</h6></li>
                                    <li><a className="dropdown-item" href="#">New blog pending approval</a></li>
                                    <li><a className="dropdown-item" href="#">New user registered</a></li>
                                    <li><a className="dropdown-item" href="#">System update available</a></li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button className="btn btn-light dropdown-toggle border-0 d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                                    <div className="bg-primary rounded-circle p-2 me-2">
                                        <i className="bi bi-person-fill text-white"></i>
                                    </div>
                                    <div className="text-start d-none d-md-block">
                                        <div className="fw-semibold small">Admin User</div>
                                        <div className="text-muted small">Administrator</div>
                                    </div>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><h6 className="dropdown-header">Account</h6></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-grow-1 p-4 bg-light">
                    <div className="container-fluid">
                        {children}
                    </div>
                </main>
            </div>

            {/* ───────── Dark overlay (click to close) ───────── */}
            {open && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

        </div>
    );
};

export default AdminLayout;