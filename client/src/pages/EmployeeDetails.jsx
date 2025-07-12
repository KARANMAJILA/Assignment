import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        console.error('Failed to fetch employee:', err);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-blue-600 text-xl">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6 max-w-3xl mx-auto">
      <Link to="/dashboard" className="text-blue-500 underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <div className="bg-gray-100 p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">{employee.name}</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Location:</strong> {employee.location}</p>
        <p><strong>Status:</strong> {employee.status}</p>
        <p><strong>Joined:</strong> {new Date(employee.joinDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
