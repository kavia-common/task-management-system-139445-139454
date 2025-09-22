import React, { useEffect, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoForm - Controlled form for creating/updating a todo.
 * Props:
 *  - initial?: initial todo object
 *  - onSubmit: function(todoPayload)
 *  - onCancel?: function()
 */
export default function TodoForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'normal');
  const [dueDate, setDueDate] = useState(() => {
    if (initial?.dueDate) return initial.dueDate.slice(0, 10);
    return '';
  });
  const [completed, setCompleted] = useState(Boolean(initial?.completed));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setPriority(initial?.priority || 'normal');
    setDueDate(initial?.dueDate ? initial.dueDate.slice(0, 10) : '');
    setCompleted(Boolean(initial?.completed));
  }, [initial]);

  const payload = useMemo(() => {
    const p = { title, description, priority, completed };
    if (dueDate) {
      // Prepare ISO date (at noon to avoid TZ shifts)
      p.dueDate = new Date(dueDate + 'T12:00:00').toISOString();
    }
    return p;
  }, [title, description, priority, completed, dueDate]);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (title.length > 200) e.title = 'Title is too long';
    if (description.length > 2000) e.description = 'Description is too long';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(payload);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="label" htmlFor="title">Title</label>
        <input
          id="title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Prepare Q4 report"
          required
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      <div className="form-row">
        <label className="label" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details, links, etc."
        />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>

      <div className="split">
        <div className="form-row" style={{ minWidth: 160, flex: 1 }}>
          <label className="label" htmlFor="priority">Priority</label>
          <select
            id="priority"
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-row" style={{ minWidth: 160, flex: 1 }}>
          <label className="label" htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            className="input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-row" style={{ minWidth: 160, display: 'flex', alignItems: 'end' }}>
          <label className="label" htmlFor="completed" style={{ marginRight: 8 }}>Completed</label>
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">{initial ? 'Save changes' : 'Add todo'}</button>
        {onCancel && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
