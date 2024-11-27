'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch all tasks created by the manager
      const tasksRes = await fetch('/api/tasks/manager-tasks');
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      // Fetch all employees
      const employeesRes = await fetch('/api/users/employees');
      const employeesData = await employeesRes.json();
      setEmployees(employeesData);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      {/* Section: Employees */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Employees</h2>
        <div className="grid grid-cols-2 gap-4">
          {employees.map((employee) => (
            <div key={employee._id} className="p-4 border rounded">
              <h3 className="font-semibold">{employee.name}</h3>
              <p>Email: {employee.email}</p>
              <p>Tasks: {employee.tasks?.length || 0}</p>
              <Link href={`/dashboard/manager/employee/${employee._id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Tasks */}
      <section>
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Title</th>
              <th className="border border-gray-200 px-4 py-2">Assigned To</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border border-gray-200 px-4 py-2">{task.title}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {task.assignedTo?.name || 'Unassigned'}
                </td>
                <td className="border border-gray-200 px-4 py-2">{task.status}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <Link href={`/dashboard/manager/task/${task._id}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
