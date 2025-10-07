// src/layout/AppLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { Context } from '@/context';
import { LOGIN_ROUTE } from '@/utils/consts';

export default function AppLayout() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const links = useMemo(
    () =>
      user?.isAdmin
        ? [
            { to: '/admin/queue', label: 'Очередь' },
            { to: '/admin/approved', label: 'Одобренные' },
            { to: '/admin/employees', label: 'Сотрудники' },
            { to: '/admin/reports', label: 'Журналы' },
            { to: '/admin/settings', label: 'Настройки' },
          ]
        : [
            { to: '/request', label: 'Оформить пропуск' },
            { to: '/my', label: 'Мои пропуска' },
            { to: '/profile', label: 'Профиль' },
          ],
    [user?.isAdmin]
  );

  const onLogout = async () => {
    try {
      await user?.logout?.();
    } finally {
      navigate(LOGIN_ROUTE || '/login', { replace: true });
    }
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner container">
          <div className="navBrand">AutoPass</div>

          <nav className="nav">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="spacer" />

          <div className="topbar__search">
            <input className="searchInput" placeholder="Поиск…" />
          </div>

          <div className="topbar__actions">
            <button className="btn btn--ghost" onClick={() => navigate('/help')}>
              Помощь
            </button>
            <button className="btn btn--primary" onClick={onLogout}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
