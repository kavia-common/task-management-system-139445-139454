import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

/**
 * PUBLIC_INTERFACE
 * RegisterPage - registration form that calls /api/auth/register
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const resp = await register({ name, email, password });
      // If backend does not auto login, redirect to login page
      const hasToken = resp && (resp.token || resp.accessToken || resp.jwt || resp.Token);
      navigate(hasToken ? '/' : '/login');
    } catch (err) {
      setError(err?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="card centered">
      <h1 className="page-title">Create your account</h1>
      <div className="page-subtitle">Start organizing your work</div>
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create account'}
          </button>
          <div className="helper">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </form>
    </section>
  );
}
