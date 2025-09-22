import { apiRequest } from './client';

/**
 * PUBLIC_INTERFACE
 * listTodos - GET /api/todos with filters
 */
export function listTodos({ token, completed, search, priority } = {}) {
  const params = new URLSearchParams();
  if (completed !== undefined) params.set('completed', String(completed));
  if (search) params.set('search', String(search));
  if (priority) params.set('priority', String(priority));
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest({ method: 'GET', path: `/api/todos${query}`, token });
}

/**
 * PUBLIC_INTERFACE
 * createTodo - POST /api/todos
 */
export function createTodo({ token, todo }) {
  return apiRequest({ method: 'POST', path: '/api/todos', body: todo, token });
}

/**
 * PUBLIC_INTERFACE
 * updateTodo - PUT /api/todos/{id}
 */
export function updateTodo({ token, id, updates }) {
  return apiRequest({ method: 'PUT', path: `/api/todos/${id}`, body: updates, token });
}

/**
 * PUBLIC_INTERFACE
 * deleteTodo - DELETE /api/todos/{id}
 */
export function destroyTodo({ token, id }) {
  return apiRequest({ method: 'DELETE', path: `/api/todos/${id}`, token });
}
