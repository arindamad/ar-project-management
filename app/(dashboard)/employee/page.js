'use client';
import { useState, useEffect } from 'react';

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks/my-tasks');
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-xl font-bold">Today's Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 mb-4">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
