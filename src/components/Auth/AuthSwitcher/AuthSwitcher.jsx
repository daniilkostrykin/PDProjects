import { NavLink } from 'react-router-dom';
import styles from './AuthSwitcher.module.css';

export default function AuthSwitcher({ to, children }) {
  return (
    <div className={styles.switcher}>
      <NavLink to={to} className={styles.link}>
        {children}
      </NavLink>
    </div>
  );
}
