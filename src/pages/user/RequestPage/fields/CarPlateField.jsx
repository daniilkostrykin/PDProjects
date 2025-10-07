export default function CarPlateField({ value, onChange }) {
  return (
    <label className="field">
      <span>Госномер</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder="A000AA77" />
    </label>
  )
}
