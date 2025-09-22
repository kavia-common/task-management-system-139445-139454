import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createTodo, destroyTodo, listTodos, updateTodo } from '../api/todos';
import { useAuth } from './AuthContext';

const TodoContext = createContext(null);

/**
 * Filter shape:
 *  - search?: string
 *  - completed?: boolean
 *  - priority?: 'low'|'normal'|'high'|undefined
 */

/**
 * PUBLIC_INTERFACE
 * TodoProvider - provides todo list state, filters, and CRUD actions.
 */
export function TodoProvider({ children }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', completed: undefined, priority: '' });
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listTodos({
        token,
        completed: filters.completed === '' ? undefined : filters.completed,
        search: filters.search || undefined,
        priority: filters.priority || undefined,
      });
      setItems(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // PUBLIC_INTERFACE
  async function addTodo(todo) {
    const res = await createTodo({ token, todo });
    await fetchTodos();
    return res;
  }

  // PUBLIC_INTERFACE
  async function editTodo(id, updates) {
    const res = await updateTodo({ token, id, updates });
    await fetchTodos();
    return res;
  }

  // PUBLIC_INTERFACE
  async function removeTodo(id) {
    await destroyTodo({ token, id });
    await fetchTodos();
  }

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      filters,
      setFilters,
      fetchTodos,
      addTodo,
      editTodo,
      removeTodo,
    }),
    [items, loading, error, filters, fetchTodos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useTodos - consumer hook
 */
export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within TodoProvider');
  return ctx;
}
