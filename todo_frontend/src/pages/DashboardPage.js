import React from 'react';
import Sidebar from '../components/Sidebar';
import TodoList from '../components/TodoList';

/**
 * PUBLIC_INTERFACE
 * DashboardPage - main authenticated page rendering filters and todo content.
 */
export default function DashboardPage() {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <div className="content">
        <TodoList />
      </div>
    </div>
  );
}
