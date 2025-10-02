import s from './AuthUI.module.css';

export function Field({ label, htmlFor, children, error }) {
  return (
    <label htmlFor={htmlFor} className={s.field}>
      <div className={s.label}>{label}</div>
      {children}
      {error && <div className={s.error}>{error}</div>}
    </label>
  );
}

export function Input(props) {
  return <input {...props} className={s.input} />;
}

export function SubmitButton({ loading, children }) {
  return (
    <button type="submit" disabled={loading} className={s.btnPrimary}>
      {loading ? 'Загрузка…' : children}
    </button>
  );
}

export function Banner({ kind, text }) {
  return <div className={`${s.banner} ${kind === 'error' ? s.errorBanner : s.successBanner}`}>{text}</div>;
}
