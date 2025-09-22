const API_BASE = process.env.REACT_APP_API_BASE || ''; // e.g., http://localhost:3001

/**
 * PUBLIC_INTERFACE
 * apiRequest - small wrapper for fetch with JSON, auth header, and error handling.
 * - method: HTTP method
 * - path: API path beginning with /
 * - body: optional object body
 * - token: optional bearer token
 */
export async function apiRequest({ method = 'GET', path, body, token }) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Try to parse JSON; some endpoints may return no content
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * PUBLIC_INTERFACE
 * setApiBase - configure the base URL at runtime if necessary.
 */
export function setApiBase(url) {
  // Note: for simplicity, we rely on REACT_APP_API_BASE; this method left for future extension.
  console.warn('setApiBase called but REACT_APP_API_BASE is preferred via .env');
}

/**
 * PUBLIC_INTERFACE
 * getHealth - check backend health
 */
export function getHealth() {
  return apiRequest({ path: '/', method: 'GET' });
}
