export default function DateField({ value, onChange, label='Дата' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className="input" type="date" value={value} onChange={e=>onChange(e.target.value)} />
    </label>
  )
}
