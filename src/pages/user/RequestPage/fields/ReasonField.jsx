export default function ReasonField({ value, onChange }) {
  return (
    <label className="field">
      <span>Основание</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder="Служебная необходимость" />
    </label>
  )
}
