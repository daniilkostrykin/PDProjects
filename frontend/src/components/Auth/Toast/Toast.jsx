import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type='error', duration=3000 }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setTimeout(()=>setShow(false), duration);
    return () => clearTimeout(id);
  }, [duration]);

  if (!show) return null;
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}
