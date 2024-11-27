'use client';
import { useState, useEffect } from 'react';

export default function AssignTask() {
  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch('/api/users/employees');
      const data = await res.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate, assignedTo }),
    });

    if (res.ok) {
      alert('Task Assigned!');
    } else {
      alert('Error assigning task');
    }
  };

  return (
    <form onSubmit={handleAssign} className="flex flex-col gap-4 max-w-sm mx-auto mt-16">
      <h1 className="text-xl font-bold">Assign Task</h1>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2"
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2"
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border p-2"
      >
        <option value="">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Assign Task</button>
    </form>
  );
}
