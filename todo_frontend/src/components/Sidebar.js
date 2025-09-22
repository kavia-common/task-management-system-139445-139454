import React from 'react';
import { useTodos } from '../state/TodoContext';

/**
 * PUBLIC_INTERFACE
 * Sidebar - displays filter controls for todos.
 */
export default function Sidebar() {
  const { filters, setFilters, fetchTodos } = useTodos();

  function updateField(field, value) {
    setFilters((f) => ({ ...f, [field]: value }));
  }

  return (
    <aside className="sidebar card">
      <h3>Filters</h3>

      <div className="section">
        <label className="label">Search</label>
        <input
          className="input"
          value={filters.search || ''}
          onChange={(e) => updateField('search', e.target.value)}
          placeholder="Search by title or description"
        />
      </div>

      <div className="section">
        <label className="label">Status</label>
        <select
          className="select"
          value={filters.completed === undefined ? '' : String(filters.completed)}
          onChange={(e) => {
            const val = e.target.value;
            updateField('completed', val === '' ? undefined : val === 'true');
          }}
        >
          <option value="">All</option>
          <option value="false">Open</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="section">
        <label className="label">Priority</label>
        <select
          className="select"
          value={filters.priority || ''}
          onChange={(e) => updateField('priority', e.target.value)}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="section" style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={fetchTodos}>Apply</button>
        <button
          className="btn ghost"
          onClick={() => {
            setFilters({ search: '', completed: undefined, priority: '' });
            fetchTodos();
          }}
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
