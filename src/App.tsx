import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EmployeeListPage from './pages/Employees/EmployeeListPage';
import PassListPage from './pages/Passes/PassListPage';
import AccessLogPage from './pages/Reports/AccessLogPage';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const isAuthMockEnabled = (
  (import.meta.env.VITE_AUTH_MOCK as string | undefined) ??
  (import.meta.env.MODE === 'development' ? 'true' : 'false')
) === 'true';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isAuthMockEnabled) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
            {children}
          </main>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><EmployeeListPage /></PrivateRoute>} />
        <Route path="/passes" element={<PrivateRoute><PassListPage /></PrivateRoute>} />
        <Route path="/logs" element={<PrivateRoute><AccessLogPage /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;