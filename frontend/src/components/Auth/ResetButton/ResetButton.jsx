import { NavLink } from 'react-router-dom';
import styles from './ResetButton.module.css';

export default function ResetButton() {
  return (
    <NavLink to="/reset" className={styles.reset}>Забыли пароль?</NavLink>
  );
}
