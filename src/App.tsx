import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/component/layout/Header';
import Sidebar from '@/component/layout/Sidebar';
import DashboardPage from '@/pages/DashboardPage/DashboardPage';
import EmployeeListPage from '@/pages/Employees/EmployeeListPage';
import PassListPage from '@/pages/Passes/PassListPage';
import NewPassRequestPage from '@/pages/Passes/NewPassRequestPage';
import MyRequestsPage from '@/pages/Passes/MyRequestsPage';
import AccessLogPage from '@/pages/Reports/AccessLogPage';
import ApprovalQueuePage from '@/pages/Admin/ApprovalQueuePage';
import ApprovedListPage from '@/pages/Admin/ApprovedListPage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';


function PrivateRoute({ children }: { children: ReactNode }) {
const { isAuthenticated } = useAuth();
return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}


function AdminRoute({ children }: { children: ReactNode }) {
const { isAuthenticated, isAdmin } = useAuth();
if (!isAuthenticated) return <Navigate to="/login" replace />;
return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
}


export default function App() {
const { isAuthenticated } = useAuth();
const layout = (
<div className="app">
<Sidebar />
<div>
<Header />
<div style={{padding:16}}>
<Routes>
<Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
<Route path="/employees" element={<PrivateRoute><EmployeeListPage /></PrivateRoute>} />
<Route path="/passes" element={<PrivateRoute><PassListPage /></PrivateRoute>} />
<Route path="/passes/new" element={<PrivateRoute><NewPassRequestPage /></PrivateRoute>} />
<Route path="/passes/my" element={<PrivateRoute><MyRequestsPage /></PrivateRoute>} />
<Route path="/reports/access-log" element={<PrivateRoute><AccessLogPage /></PrivateRoute>} />
<Route path="/admin/approval" element={<AdminRoute><ApprovalQueuePage /></AdminRoute>} />
<Route path="/admin/approved" element={<AdminRoute><ApprovedListPage /></AdminRoute>} />
<Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
</Routes>
</div>
</div>
</div>
);


return (
<Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/*" element={layout} />
</Routes>
);
}