import styles from './EmptyState.module.css';

export default function EmptyState({ icon, message }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
}