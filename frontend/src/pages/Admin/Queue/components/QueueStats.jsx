import styles from './QueueStats.module.css';

export default function QueueStats({ total, today, pending }) {
  return (
    <div className={styles.statsCard}>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>Всего заявок:</div>
        <div className={styles.statValue}>{total}</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>На сегодня:</div>
        <div className={styles.statValue}>{today}</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statLabel}>Ожидают:</div>
        <div className={styles.statValue}>{pending}</div>
      </div>
    </div>
  );
}