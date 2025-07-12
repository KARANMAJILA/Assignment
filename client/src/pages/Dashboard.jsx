import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Users, Mail, MapPin,
  Briefcase, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FilterPanel = ({ filters, onFilterChange }) => {
  const options = {
    department: ['Engineering', 'Design', 'Marketing', 'Finance', 'Operations', 'HR'],
    status: ['Active', 'Inactive'],
    location: ['New York', 'San Francisco', 'Chicago', 'Boston', 'Seattle', 'Austin', 'Miami', 'Denver']
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center mb-3">
        <Filter className="h-4 w-4 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">Filters</h3>
      </div>
      <div className="space-y-4">
        {Object.keys(filters).map((key, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
            <select
              value={filters[key]}
              onChange={(e) => onFilterChange(key, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All {key}s</option>
              {options[key].map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <input
      type="text"
      placeholder="Search users by name, email, or role..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const UserCard = ({ user }) => {
  const statusColor = user.status === 'Active'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  return (
    <Link to={`/employee/${user.id}`}>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center"><Mail className="h-4 w-4 mr-2" /> {user.email}</div>
                <div className="flex items-center"><Briefcase className="h-4 w-4 mr-2" /> {user.role} • {user.department}</div>
                <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {user.location}</div>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> Joined {new Date(user.joinDate).toLocaleDateString()}</div>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{user.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ department: '', status: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch from local Express API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employees');
        const data = await res.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.department) result = result.filter(u => u.department === filters.department);
    if (filters.status) result = result.filter(u => u.status === filters.status);
    if (filters.location) result = result.filter(u => u.location === filters.location);
    setFilteredUsers(result);
  }, [users, searchTerm, filters]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({ department: '', status: '', location: '' });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error loading users: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            <button
              onClick={clearFilters}
              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Clear All Filters
            </button>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {searchTerm || Object.values(filters).some(Boolean)
                    ? "Try adjusting your search or filters"
                    : "No users available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
