// src/components/TopNav/TopNav.jsx
import { NavLink } from 'react-router-dom';

export default function TopNav({ onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar__inner container">
        <div className="navBrand">AutoPass</div>

        <nav className="nav">
          <NavLink to="/request" className={({isActive}) => "nav__link" + (isActive ? " is-active" : "")}>
            <span className="nav__icon">🎫</span>
            <span className="nav__text">Оформить пропуск</span>
          </NavLink>
          <NavLink to="/my" className={({isActive}) => "nav__link" + (isActive ? " is-active" : "")}>
            <span className="nav__icon">📄</span>
            <span className="nav__text">Мои пропуска</span>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => "nav__link" + (isActive ? " is-active" : "")}>
            <span className="nav__icon">👤</span>
            <span className="nav__text">Профиль</span>
          </NavLink>
        </nav>

        <div className="spacer" />

        <div className="topbar__search">
          <input className="searchInput" placeholder="Поиск…" />
        </div>

        <div className="topbar__actions">
          {/* если нужен профиль-меню — сюда */}
          <button className="btn btn--ghost">Помощь</button>
          <button className="btn btn--primary" onClick={onLogout}>Выйти</button>
        </div>
      </div>
    </header>
  );
}
