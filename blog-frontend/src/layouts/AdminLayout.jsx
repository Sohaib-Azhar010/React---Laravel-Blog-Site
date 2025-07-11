import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/AdminLayout.css';
import { useAuth } from '../components/dashboard/AuthContext';

const AdminLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const closeSidebar = () => setOpen(false);
    const toggleDropdown = (d) => setActiveDropdown(activeDropdown === d ? null : d);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const displayName = user?.name || 'Admin';
    const roleLabel = user?.role?.toUpperCase() || 'ADMIN';

    return (
        <div className={`d-flex admin-wrapper ${open ? 'sidebar-open' : ''}`}>
            {/* ───────── Sidebar ───────── */}
            <aside className="admin-sidebar bg-white shadow-sm border-end">
                <div className="d-flex flex-column h-100">
                    {/* Brand Header */}
                    <div className="sidebar-header py-4 px-3 text-center border-bottom bg-gradient">
                        <img src={logo} alt="E‑Blogs" width={100} />
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
                                    <i className="bi bi-speedometer2 me-3 text-primary" />
                                    <span className="fw-medium">Dashboard</span>
                                </Link>
                            </li>


                            {/* Categories */}
                            <li className="nav-item mb-1">
                                <div
                                    className="nav-link d-flex align-items-center justify-content-between py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    role="button"
                                    onClick={() => toggleDropdown('categories')}
                                >
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-tags me-3 text-info" />
                                        <span className="fw-medium">Categories</span>
                                    </div>
                                    <i className={`bi bi-chevron-${activeDropdown === 'categories' ? 'up' : 'down'} small`} />
                                </div>

                                <div className={`dropdown-content ${activeDropdown === 'categories' ? 'show' : ''}`}>
                                    {/* All Categories */}
                                    <Link
                                        to="/admin/categories/show"
                                        className="dropdown-item d-flex align-items-center py-2 px-4"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-list-ul me-2 text-info" />
                                        <span className="small">All Categories</span>
                                    </Link>

                                    {/* Create Category */}
                                    <Link
                                        to="/admin/categories/create"
                                        className="dropdown-item d-flex align-items-center py-2 px-4"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-plus-square me-2 text-primary" />
                                        <span className="small">Create Category</span>
                                    </Link>
                                </div>
                            </li>


                            {/* Blog Management */}
                            <li className="nav-item mb-1">
                                <div
                                    className="nav-link d-flex align-items-center justify-content-between py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                                    role="button"
                                    onClick={() => toggleDropdown('blogs')}
                                >
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-journal-text me-3 text-success" />
                                        <span className="fw-medium">Blogs</span>
                                    </div>
                                    <i className={`bi bi-chevron-${activeDropdown === 'blogs' ? 'up' : 'down'} small`} />
                                </div>

                                <div className={`dropdown-content ${activeDropdown === 'blogs' ? 'show' : ''}`}>
                                    {/* All Blogs */}
                                    <Link
                                        to="/admin/blogs"
                                        className="dropdown-item d-flex align-items-center py-2 px-4"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-list-ul me-2 text-primary" />
                                        <span className="small">All Blogs</span>
                                    </Link>

                                    {/* Pending Blogs */}
                                    <Link
                                        to="/admin/blogs/pending"
                                        className="dropdown-item d-flex align-items-center py-2 px-4"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-hourglass-split me-2 text-warning" />
                                        <span className="small">Pending Blogs</span>
                                    </Link>

                                    {/* Approved Blogs */}
                                    <Link
                                        to="/admin/blogs/approved"
                                        className="dropdown-item d-flex align-items-center py-2 px-4"
                                        onClick={closeSidebar}
                                    >
                                        <i className="bi bi-check2-circle me-2 text-success" />
                                        <span className="small">Approved Blogs</span>
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
                                    <i className="bi bi-people me-3 text-secondary" />
                                    <span className="fw-medium">Manage Authors</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logout Button */}
                    <div className="p-3 border-top">
                        <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2" /> Logout
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
                    <button className="btn btn-outline-secondary d-lg-none me-3" onClick={() => setOpen(true)}>
                        <i className="bi bi-list" />
                    </button>

                    <h5 className="mb-0 fw-semibold me-auto">ADMIN DASHBOARD</h5>

                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle border-0 d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                            <div className="bg-dark rounded-circle p-2 me-2">
                                <i className="bi bi-person-fill text-white" />
                            </div>
                            <div className="text-start d-none d-md-block">
                                <div className="fw-semibold small">{displayName}</div>
                                <div className="text-muted small">{roleLabel}</div>
                            </div>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><h6 className="dropdown-header">Account</h6></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2" /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-grow-1 p-4 bg-light">
                    <div className="container-fluid bg-white rounded p-3 border">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile overlay */}
            {open && <div className="sidebar-overlay" onClick={closeSidebar} />}
        </div>
    );
};

export default AdminLayout;
