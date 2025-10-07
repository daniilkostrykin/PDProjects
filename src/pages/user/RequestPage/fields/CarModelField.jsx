export default function CarModelField({ value, onChange }) {
  return (
    <label className="field">
      <span>Модель</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder="Camry" />
    </label>
  )
}
