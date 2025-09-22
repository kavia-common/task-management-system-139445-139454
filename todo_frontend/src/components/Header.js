import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Header - Top navigation with brand and auth actions.
 */
export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function onLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">TN</div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Corporate Todos
        </Link>
      </div>
      <div className="nav-actions">
        <button
          className="btn ghost"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {isAuthenticated ? (
          <>
            <div className="user-pill">
              <span>👤</span>
              <span>{user?.name || user?.email}</span>
            </div>
            <button className="btn secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
