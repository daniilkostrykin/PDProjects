export default function HistoryFilters({ value, onChange }) {
  const set = (k)=> (val)=> onChange({ ...value, [k]: val })
  return (
    <div className="card row">
      <select className="input" value={value.status} onChange={e=>set('status')(e.target.value)}>
        <option value="">Все статусы</option>
        <option value="pending">На рассмотрении</option>
        <option value="approved">Одобрен</option>
        <option value="rejected">Отклонён</option>
      </select>
      <input className="input" placeholder="Поиск" value={value.q} onChange={e=>set('q')(e.target.value)} />
    </div>
  )
}
