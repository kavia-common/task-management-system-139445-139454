import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/forms.css';
import { useAuth } from './state/AuthContext';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**
 * PUBLIC_INTERFACE
 * App - Main application entry. Provides routes and renders the corporate layout.
 * Routes:
 *  - /login        : Login screen
 *  - /register     : Registration screen
 *  - /             : Dashboard (requires auth)
 */
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <small>© {new Date().getFullYear()} Corporate Navy Todos</small>
      </footer>
    </div>
  );
}

export default App;
