export default function CarBrandField({ value, onChange }) {
  return (
    <label className="field">
      <span>Марка авто</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder="Toyota" />
    </label>
  )
}
