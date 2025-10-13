// src/layout/AppLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { Context } from '@/context';
import { LOGIN_ROUTE, DASHBOARD_ROUTE, ADMIN_QUEUE, ADMIN_APPROVED, ADMIN_EMPLOYEES, ADMIN_REPORTS, ADMIN_SETTINGS, USER_REQUEST, USER_PASSES, USER_PROFILE } from '@/utils/consts';

export default function AppLayout() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const links = useMemo(() => (
    (true) // user?.isAdmin — временно показываем админские
      ? [
          { to: ADMIN_QUEUE, label: 'Очередь' },
          { to: ADMIN_APPROVED, label: 'Одобренные' },
          { to: ADMIN_EMPLOYEES, label: 'Сотрудники' },
          { to: ADMIN_REPORTS, label: 'Журналы' },
          { to: ADMIN_SETTINGS, label: 'Настройки' },
        ]
      : [
          { to: USER_REQUEST, label: 'Оформить пропуск' },
          { to: USER_PASSES, label: 'Мои пропуска' },
          { to: USER_PROFILE, label: 'Профиль' },
        ]
  ), [user?.isAdmin]);

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
          <NavLink to={DASHBOARD_ROUTE} className="navBrand">AutoPass</NavLink>

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
            {user?.isMockMode && (
              <div className="mock-indicator" title="Работа в мок-режиме (без бэка)">
                🧪 Мок-режим
              </div>
            )}
            <button className="btn btn--ghost" onClick={() => navigate(ADMIN_REPORTS)}>
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
