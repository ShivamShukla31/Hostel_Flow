import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProblems from '../pages/student/StudentProblems';
import RectorDashboard from '../pages/rector/RectorDashboard';
import RectorAssignments from '../pages/rector/RectorAssignments';
import RectorProfile from '../pages/rector/RectorProfile';
import WorkerDashboard from '../pages/worker/WorkerDashboard';
import WorkerTasks from '../pages/worker/WorkerTasks';
import WorkerProfile from '../pages/worker/WorkerProfile';
import AnalyticsPage from '../pages/AnalyticsPage';
import ComplaintDetails from '../pages/ComplaintDetails';
import Profile from '../pages/Profile';
import RectorComplaints from '../pages/rector/RectorComplaints';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints/:id"
        element={
          <ProtectedRoute>
            <ComplaintDetails />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/problems"
        element={
          <ProtectedRoute>
            <StudentProblems />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rector/dashboard"
        element={
          <ProtectedRoute>
            <RectorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rector/complaints"
        element={
          <ProtectedRoute>
            <RectorComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rector/assignments"
        element={
          <ProtectedRoute>
            <RectorAssignments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rector/profile"
        element={
          <ProtectedRoute>
            <RectorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/dashboard"
        element={
          <ProtectedRoute>
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/tasks"
        element={
          <ProtectedRoute>
            <WorkerTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/profile"
        element={
          <ProtectedRoute>
            <WorkerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
