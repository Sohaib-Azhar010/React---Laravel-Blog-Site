import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // use Link if you have React Router

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Please fill in both fields.');
      return;
    }

    // TODO: replace with your auth API call
    console.log('Logging in:', credentials);
    setError('');
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              name="email"
              placeholder="name@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="loginPassword"
              className="form-label fw-semibold"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark px-4 py-2 rounded-pill fw-semibold w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="small text-muted">
            Don’t have an account?{' '}
            <Link to="/register" className="text-decoration-none">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
