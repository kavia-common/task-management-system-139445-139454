import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

/**
 * A small interface for the authenticated user payload we keep on client.
 */
const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AuthProvider - wraps children with auth state (token, user) and actions.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // PUBLIC_INTERFACE
  const isAuthenticated = !!token;

  // PUBLIC_INTERFACE
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // PUBLIC_INTERFACE
  async function login(credentials) {
    const res = await apiLogin(credentials);
    // Expect response to include token; optionally include user info if backend provides
    const jwt = res.token || res.accessToken || res.jwt || res.Token;
    if (!jwt) {
      throw new Error('Token missing from login response');
    }
    setToken(jwt);
    setUser({ email: credentials.email, name: res.name || credentials.email });
    return res;
  }

  // PUBLIC_INTERFACE
  async function register(payload) {
    const res = await apiRegister(payload);
    // Some backends might auto-login; if token present, store it
    const jwt = res && (res.token || res.accessToken || res.jwt || res.Token);
    if (jwt) {
      setToken(jwt);
      setUser({ email: payload.email, name: payload.name || payload.email });
    }
    return res;
  }

  const value = useMemo(
    () => ({ token, user, isAuthenticated, login, register, logout }),
    [token, user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useAuth - consumer hook for auth context
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
