import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Dashboard from './pages/Dashboard.jsx';

import EmployeeDetails from './pages/EmployeeDetails.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/employee/:id" element={<EmployeeDetails />} />
    </Routes>
  </BrowserRouter>
);
