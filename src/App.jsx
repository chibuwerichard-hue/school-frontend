import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import SportsDashboard from './pages/SportsDashboard';

function ProtectedRoute({ children, requiredRole }) {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher Dashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute requiredRole="TEACHER">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Finance Dashboard */}
        <Route
          path="/finance-dashboard"
          element={
            <ProtectedRoute requiredRole="FINANCE_OFFICER">
              <FinanceDashboard />
            </ProtectedRoute>
          }
        />

        {/* Sports Dashboard */}
        <Route
          path="/sports-dashboard"
          element={
            <ProtectedRoute requiredRole="SPORTS_COORDINATOR">
              <SportsDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;