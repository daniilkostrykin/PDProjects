import styles from './QueueCard.module.css';

export default function QueueCard({
  id,
  date,
  fullName,
  passType,
  createdAt,
  reason,
  carInfo,
  onApprove,
  onReject,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.date}>{date}</span>
        <span className={styles.passType}>{passType}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.fullName}>{fullName}</div>
        {carInfo && <div className={styles.carInfo}>{carInfo}</div>}
        <div className={styles.reason}>{reason}</div>
        <div className={styles.createdAt}>Создана: {createdAt}</div>
      </div>
      <div className={styles.cardActions}>
        <button className={`${styles.button} ${styles.approveButton}`} onClick={() => onApprove(id)}>Одобрить</button>
        <button className={`${styles.button} ${styles.rejectButton}`} onClick={() => onReject(id)}>Отклонить</button>
      </div>
    </div>
  );
}