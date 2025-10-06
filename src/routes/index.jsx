import AppLayout from '@/components/Layout/AppLayout.jsx';
import Overview from '@/pages/Dashboard/Overview.jsx';

// user
import MyPasses from '@/pages/User/MyPasses.jsx';
import RequestPass from '@/pages/User/RequestPass.jsx';
import Profile from '@/pages/User/Profile.jsx';

// admin
import Employees from '@/pages/Admin/Employees.jsx';
import Reports from '@/pages/Admin/Reports.jsx';
import Settings from '@/pages/Admin/Settings.jsx';

import Auth from '@/pages/Auth/Auth.jsx';
import { LOGIN_ROUTE } from '@/utils/consts';

export const publicRoutes = [
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: '/register', element: <Auth /> },
];

// вложенные приватные
export const authRoutes = [
  {
    path: '/dashboard',
    element: <AppLayout />,
    children: [
      { path: '', element: <Overview /> },

      // user
      { path: 'passes',  element: <MyPasses /> },
      { path: 'request', element: <RequestPass /> },
      { path: 'profile', element: <Profile /> },

      // admin-only
      { path: 'admin/employees', element: <Employees />, adminOnly: true },
      { path: 'admin/reports',   element: <Reports />,   adminOnly: true },
      { path: 'admin/settings',  element: <Settings />,  adminOnly: true },
    ]
  },

  // корень пусть редиректит на дашборд
  { path: '/', element: <Overview /> },
];
