import styles from './Brand.module.css';

export default function Brand() {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>🛂</div>
      <div className={styles.name}>AutoPass</div>
    </div>
  );
}
