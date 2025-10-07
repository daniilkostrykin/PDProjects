export default function FullNameField({ value, onChange }) {
  return (
    <label className="field">
      <span>ФИО</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder="Иванов Иван" />
    </label>
  )
}
