import React, { useState } from 'react';
import { useTodos } from '../state/TodoContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList - renders toolbar, add form, and list of todos.
 */
export default function TodoList() {
  const { items, loading, error, addTodo, fetchTodos, filters, setFilters } = useTodos();
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);

  async function handleAdd(payload) {
    setAdding(true);
    try {
      await addTodo(payload);
      setShowAdd(false);
    } finally {
      setAdding(false);
    }
  }

  return (
    <section className="card" style={{ padding: 20 }}>
      <div className="toolbar">
        <div className="searchbar">
          <input
            className="input"
            placeholder="Search todos..."
            value={filters.search || ''}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && fetchTodos()}
          />
          <button className="btn ghost" onClick={fetchTodos}>Search</button>
        </div>
        <div>
          <button className="btn" onClick={() => setShowAdd((s) => !s)}>
            {showAdd ? 'Close' : 'Add Todo'}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="card" style={{ padding: 16, marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Add new todo</h3>
          <TodoForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
          {adding && <div className="helper">Creating...</div>}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        {loading && <div className="helper">Loading todos...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && items?.length === 0 && <div className="helper">No todos found.</div>}
        <div className="todo-list">
          {items?.map((t) => (
            <TodoItem key={t.id || t._id || t.uuid || t.title + Math.random()} todo={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
