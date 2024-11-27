'use client';

import { useEffect, useState } from 'react';

export default function EmployeeDetails({ params }) {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      const res = await fetch(`/api/users/${params.id}`);
      const data = await res.json();
      setEmployee(data);
    }
    fetchEmployee();
  }, [params.id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Employee Details</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <h2 className="text-xl font-bold mt-6">Assigned Tasks</h2>
      <ul className="list-disc ml-6">
        {employee.tasks.map((task) => (
          <li key={task._id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
}
