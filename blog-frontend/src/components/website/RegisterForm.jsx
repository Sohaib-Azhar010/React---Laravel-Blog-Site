import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // use <a> if not using React Router

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client‑side validation
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    // TODO: send `form` to your Laravel API
    console.log('Registering user:', form);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <h3 className="text-center mb-4">Create Account</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="regName" className="form-label fw-semibold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="regName"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="regEmail" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="regEmail"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="regPassword" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="regPassword"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="regConfirm"
              className="form-label fw-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="regConfirm"
              name="confirm"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark px-4 py-2 rounded-pill fw-semibold w-100">
            Sign Up
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
  );
};

export default RegisterForm;
