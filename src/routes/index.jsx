// импортируем layout и редирект
import AppLayout from '../components/layout/AppLayout'
import RoleRedirect from '../pages/Dashboard/RoleRedirect'

// user страницы
import RequestPage from '../pages/user/RequestPage/RequestPage'
import MyPasses from '../pages/user/MyPasses'
import Profile from '../pages/user/Profile'

// admin страницы
import AdminHome from '../pages/Admin/Home/AdminHome'
import AdminQueue from '../pages/Admin/Queue/AdminQueue'
import AdminApproved from '../pages/Admin/Approved/AdminApproved'
import Employees from '../pages/Admin/Employees'
import Reports from '../pages/Admin/Reports'
import Settings from '../pages/Admin/Settings'

// …внутри <Routes>:
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<AppLayout />}>
    <Route index element={<RoleRedirect />} />

    {/* user */}
    <Route path="/dashboard/request" element={<RequestPage />} />
    <Route path="/dashboard/passes" element={<MyPasses />} />
    <Route path="/dashboard/profile" element={<Profile />} />

    {/* admin */}
    <Route path="/dashboard/admin" element={<AdminHome />} />
    <Route path="/dashboard/admin/queue" element={<AdminQueue />} />
    <Route path="/dashboard/admin/approved" element={<AdminApproved />} />
    <Route path="/dashboard/admin/employees" element={<Employees />} />
    <Route path="/dashboard/admin/reports" element={<Reports />} />
    <Route path="/dashboard/admin/settings" element={<Settings />} />
  </Route>
</Route>
