import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { Context } from '@/context';

import Sidebar from './Sidebar';
import Header from './Header';


export default function AppLayout() {
  const { user } = useContext(Context);
  const location = useLocation();

  const nav = useMemo(() => {
    const common = [
      { to: '/dashboard', label: 'Дашборд' },
    ];
    const userNav = [
      { to: '/dashboard/passes', label: 'Мои пропуска' },
      { to: '/dashboard/request', label: 'Оформить пропуск' },
      { to: '/dashboard/profile', label: 'Профиль' },
    ];
    const adminNav = [
      { to: '/dashboard/admin/employees', label: 'Сотрудники' },
      { to: '/dashboard/admin/reports',   label: 'Журналы/Отчёты' },
      { to: '/dashboard/admin/settings',  label: 'Настройки' },
    ];
    return user.isAdmin ? [...common, ...adminNav] : [...common, ...userNav];
  }, [user.isAdmin]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <Sidebar nav={nav} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />
        <main style={{ padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
