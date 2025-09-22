import { apiRequest } from './client';

/**
 * PUBLIC_INTERFACE
 * login - performs POST /api/auth/login
 */
export function login({ email, password }) {
  return apiRequest({
    method: 'POST',
    path: '/api/auth/login',
    body: { email, password },
  });
}

/**
 * PUBLIC_INTERFACE
 * register - performs POST /api/auth/register
 */
export function register({ email, password, name }) {
  return apiRequest({
    method: 'POST',
    path: '/api/auth/register',
    body: { email, password, name },
  });
}
