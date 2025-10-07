export default function PassTypeSelect({ value, onChange }) {
  return (
    <label className="field">
      <span>Тип пропуска</span>
      <select className="input" value={value} onChange={e=>onChange(e.target.value)}>
        <option value="car">Автомобиль</option>
        <option value="psh">Пешеходный</option>
      </select>
    </label>
  )
}
