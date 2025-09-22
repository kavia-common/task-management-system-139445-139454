import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { useTodos } from '../state/TodoContext';

/**
 * PUBLIC_INTERFACE
 * TodoItem - displays a single todo with inline edit capability.
 */
export default function TodoItem({ todo }) {
  const { editTodo, removeTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [working, setWorking] = useState(false);

  async function toggleCompleted() {
    setWorking(true);
    try {
      await editTodo(todo.id || todo._id || todo.uuid, { completed: !todo.completed });
    } finally {
      setWorking(false);
    }
  }

  async function onDelete() {
    if (!window.confirm('Delete this todo?')) return;
    setWorking(true);
    try {
      await removeTodo(todo.id || todo._id || todo.uuid);
    } finally {
      setWorking(false);
    }
  }

  function badgeForPriority(priority) {
    if (priority === 'high') return <span className="badge red">High</span>;
    if (priority === 'low') return <span className="badge green">Low</span>;
    return <span className="badge gold">Normal</span>;
  }

  if (editing) {
    return (
      <div className="todo-item">
        <div />
        <div>
          <TodoForm
            initial={todo}
            onSubmit={async (payload) => {
              setWorking(true);
              try {
                await editTodo(todo.id || todo._id || todo.uuid, payload);
                setEditing(false);
              } finally {
                setWorking(false);
              }
            }}
            onCancel={() => setEditing(false)}
          />
        </div>
        <div />
      </div>
    );
  }

  const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={toggleCompleted}
        disabled={working}
      />
      <div>
        <div className="todo-title">
          {todo.title}
          {' '}
          {badgeForPriority(todo.priority)}
        </div>
        <div className="todo-meta">
          {todo.description || ''}
          {dueDate && (
            <> • Due {dueDate.toLocaleDateString()}</>
          )}
          {todo.completed ? ' • Completed' : ''}
        </div>
      </div>
      <div className="todo-actions">
        <button className="btn ghost" onClick={() => setEditing(true)} disabled={working}>
          Edit
        </button>
        <button className="btn danger" onClick={onDelete} disabled={working}>
          Delete
        </button>
      </div>
    </div>
  );
}
