import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../assets/api';
import { useAuth } from '../dashboard/AuthContext';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'author',       // default role
    author_name: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirm) {
      return toast.error('Please fill all required fields.');
    }
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match.');
    }
    if (form.role === 'author' && !form.author_name.trim()) {
      return toast.error('Author name is required for Author role.');
    }

    try {
      setLoading(true);

      const res = await api.post('/api/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        author_name: form.role === 'author' ? form.author_name : null,
      });

      const { user, access_token } = res.data;
      login(user, access_token);

      toast.success('Registration successful! Redirecting…');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div
        className="container d-flex justify-content-center align-items-center mt-5"
        style={{ minHeight: '80vh' }}
      >
        <div className="card shadow-sm p-4" style={{ maxWidth: 450, width: '100%' }}>
          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="regFullName" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="regFullName"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="regEmail" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="regEmail"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role select */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="author">Author</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>

            {/* Author name (conditional) */}
            {form.role === 'author' && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Author Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="author_name"
                  value={form.author_name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="regPassword" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="regPassword"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm */}
            <div className="mb-4">
              <label htmlFor="regConfirm" className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="regConfirm"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="small text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
