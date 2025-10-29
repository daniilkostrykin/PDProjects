import { NavLink } from 'react-router-dom';
import styles from './AdminMenu.module.css';
import { ADMIN_EMPLOYEES, ADMIN_REPORTS, ADMIN_SETTINGS, USER_PROFILE } from '@/utils/consts';
import AdminMobileShell from '@/components/layout/AdminMobileShell';

const menuItems = [
  { to: ADMIN_EMPLOYEES, label: 'Сотрудники', icon: '👥' },
  { to: ADMIN_REPORTS, label: 'Журналы', icon: '📊' },
  { to: ADMIN_SETTINGS, label: 'Настройки', icon: '⚙️' },
  { to: USER_PROFILE, label: 'Профиль', icon: '👤' },
];

export default function AdminMenu() {
  return (
    <AdminMobileShell title="Меню">
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </AdminMobileShell>
  );
}