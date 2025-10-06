import styles from './SubmitButton.module.css';

export default function SubmitButton({ isLoading, children }) {
  return (
    <button className={styles.btn} type="submit" disabled={isLoading}>
      {isLoading ? 'Загрузка…' : children}
    </button>
  );
}
