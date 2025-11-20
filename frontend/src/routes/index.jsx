// Импорты страниц и layout
import AppLayout from '@/components/layout/AppLayout'
import RoleRedirect from '@/pages/Dashboard/RoleRedirect'
import Auth from '@/pages/Auth/Auth'
import HomePage from '@/pages/HomePage'

// user
import RequestPage from '@/pages/user/RequestPage/RequestPage'
import MyPasses from '@/pages/user/MyPasses'
import Profile from '@/pages/user/Profile'

// admin
import AdminHome from '@/pages/Admin/Home/AdminHome'
import AdminQueue from '@/pages/Admin/Queue/AdminQueue'
import AdminApproved from '@/pages/Admin/Approved/AdminApproved'
import Employees from '@/pages/Admin/Employees'
import Reports from '@/pages/Admin/Reports'
import Settings from '@/pages/Admin/Settings'
import AdminMenu from '@/pages/Admin/Menu/AdminMenu'

// константы путей
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  DASHBOARD_ROUTE,
  USER_REQUEST,
  USER_PASSES,
  USER_PROFILE,
  ADMIN_HOME,
  ADMIN_QUEUE,
  ADMIN_APPROVED,
  ADMIN_EMPLOYEES,
  ADMIN_REPORTS,
  ADMIN_SETTINGS,
  ADMIN_MENU,
} from '@/utils/consts'

// Публичные маршруты (доступны, когда пользователь НЕ авторизован)
export const publicRoutes = [
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: REGISTRATION_ROUTE, element: <Auth /> },
]

// Защищённые маршруты. Можно вкладывать children для nested routes внутри дашборда
export const authRoutes = [
  {
    path: DASHBOARD_ROUTE,
    element: <AppLayout />,
    children: [
      // index перенаправляет согласно роли
      { path: '', element: <RoleRedirect /> },
      // главная страница
      { path: 'home', element: <HomePage /> },

      // user
      { path: USER_REQUEST.replace(`${DASHBOARD_ROUTE}/`, ''), element: <RequestPage /> },
      { path: USER_PASSES.replace(`${DASHBOARD_ROUTE}/`, ''), element: <MyPasses /> },
      { path: USER_PROFILE.replace(`${DASHBOARD_ROUTE}/`, ''), element: <Profile /> },

      // admin
      { path: ADMIN_HOME.replace(`${DASHBOARD_ROUTE}/`, ''), element: <AdminHome />, adminOnly: true },
      { path: ADMIN_QUEUE.replace(`${DASHBOARD_ROUTE}/`, ''), element: <AdminQueue />, adminOnly: true },
      { path: ADMIN_APPROVED.replace(`${DASHBOARD_ROUTE}/`, ''), element: <AdminApproved />, adminOnly: true },
      { path: ADMIN_EMPLOYEES.replace(`${DASHBOARD_ROUTE}/`, ''), element: <Employees />, adminOnly: true },
      { path: ADMIN_REPORTS.replace(`${DASHBOARD_ROUTE}/`, ''), element: <Reports />, adminOnly: true },
      { path: ADMIN_SETTINGS.replace(`${DASHBOARD_ROUTE}/`, ''), element: <Settings />, adminOnly: true },
      { path: ADMIN_MENU.replace(`${DASHBOARD_ROUTE}/`, ''), element: <AdminMenu />, adminOnly: true },
    ],
  },
]

export default { publicRoutes, authRoutes }
