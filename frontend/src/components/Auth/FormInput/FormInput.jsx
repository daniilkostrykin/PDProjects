import styles from './FormInput.module.css';

export default function FormInput({ value, onChange, type='text', placeholder, containerStyle }) {
  return (
    <div className={styles.container} style={containerStyle}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
