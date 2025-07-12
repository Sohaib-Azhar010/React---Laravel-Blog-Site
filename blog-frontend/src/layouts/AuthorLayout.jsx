import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/AdminLayout.css';
import { useAuth } from '../components/dashboard/AuthContext';

const AuthorLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeSidebar = () => setOpen(false);
  const toggleDropdown = (d) => setActiveDropdown(activeDropdown === d ? null : d);

  const handleLogout = async () => {
    await logout();                      // revoke + clear local storage
    navigate('/login', { replace: true });
  };

  const displayName = user?.name || user?.name || 'Author';
  const roleLabel = user?.role?.toUpperCase() || 'AUTHOR';

  return (
    <div className={`d-flex admin-wrapper ${open ? 'sidebar-open' : ''}`}>
      {/* ───────── Sidebar ───────── */}
      <aside className="admin-sidebar bg-white shadow-sm border-end">
        <div className="d-flex flex-column h-100">

          {/* Brand */}
          <div className="sidebar-header py-4 px-3 text-center border-bottom bg-gradient">
            <img src={logo} alt="E‑Blogs" width={100} />
          </div>

          {/* Navigation */}
          <div className="flex-grow-1 py-3">
            <ul className="nav flex-column">

              {/* Dashboard */}
              <li className="nav-item mb-1">
                <Link
                  to="/author/dashboard"
                  className="nav-link d-flex align-items-center py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-speedometer2 me-3 text-primary" />
                  <span className="fw-medium">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="/author/cetegories/show"
                  className="nav-link d-flex align-items-center py-3 px-3 rounded-0 border-start border-3 border-transparent hover-item"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-list-ul me-3 text-info" />
                  <span className="fw-medium">Categories</span>
                </Link>
                
              </li>



              {/* Blogs dropdown */}
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

                {/* Author dropdown items */}
                <div className={`dropdown-content ${activeDropdown === 'blogs' ? 'show' : ''}`}>
                  <Link
                    to="/author/blogs/show"
                    className="dropdown-item d-flex align-items-center py-2 px-4"
                    onClick={closeSidebar}
                  >
                    <i className="bi bi-list-ul me-2 text-primary" />
                    <span className="small">My Blogs</span>
                  </Link>
                  <Link
                    to="/author/blogs/create"
                    className="dropdown-item d-flex align-items-center py-2 px-4"
                    onClick={closeSidebar}
                  >
                    <i className="bi bi-plus-square me-2 text-success" />
                    <span className="small">Create Blog</span>
                  </Link>
                </div>
              </li>


            </ul>
          </div>

          {/* Logout */}
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

          <h5 className="mb-0 fw-semibold me-auto">AUTHOR DASHBOARD</h5>

          {/* User dropdown */}
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle border-0 d-flex align-items-center" type="button" data-bs-toggle="dropdown">
              <div className="bg-dark rounded-circle px-2 py-2 me-2">
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

        {/* Main */}
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

export default AuthorLayout;
