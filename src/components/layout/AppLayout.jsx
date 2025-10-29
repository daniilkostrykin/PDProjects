// src/layout/AppLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { Context } from '@/context';
import { LOGIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, ADMIN_QUEUE, ADMIN_APPROVED, ADMIN_EMPLOYEES, ADMIN_REPORTS, ADMIN_SETTINGS, USER_REQUEST, USER_PASSES, USER_PROFILE } from '@/utils/consts';
import MobileTabBar from '../MobileTabBar';
import './AppLayout.css';

export default function AppLayout() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const links = useMemo(() => (
    (user?.isAdmin) // показываем админские только для админов
      ? [
          { to: ADMIN_QUEUE, label: 'Очередь', icon: '📋' },
          { to: ADMIN_APPROVED, label: 'Одобренные', icon: '✅' },
          { to: ADMIN_EMPLOYEES, label: 'Сотрудники', icon: '👥' },
          { to: ADMIN_REPORTS, label: 'Журналы', icon: '📊' },
          { to: ADMIN_SETTINGS, label: 'Настройки', icon: '⚙️' },
        ]
      : [
          { to: USER_REQUEST, label: 'Оформить пропуск', icon: '🎫' },
          { to: USER_PASSES, label: 'Мои пропуска', icon: '📄' },
          { to: USER_PROFILE, label: 'Профиль', icon: '👤' },
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
      {/* Десктопная версия */}
      <header className="topbar desktop-header">
        <div className="topbar__inner container">
          <NavLink to={HOME_ROUTE} className="navBrand">AutoPass</NavLink>

          <nav className="nav">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}
              >
                <span className="nav__icon">{l.icon}</span>
                <span className="nav__text">{l.label}</span>
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

      {/* Мобильная версия - только логотип */}
      <header className="mobile-header">
        <div className="mobile-header__inner">
          <NavLink to={HOME_ROUTE} className="mobile-brand">
            AutoPass
          </NavLink>
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      {/* Мобильная панель навигации */}
      <MobileTabBar />
    </>
  );
}
