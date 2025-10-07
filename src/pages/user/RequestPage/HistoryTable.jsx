// Если у тебя уже есть StatusBadge компонент — можешь заменить на него.
function StatusBadge({ status }) {
  const map = { approved: 'Одобрен', pending: 'На рассмотрении', rejected: 'Отклонён' }
  return <span className={`badge badge--${status}`}>{map[status] || status}</span>
}

export default function HistoryTable({ rows=[] }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr><th>Дата</th><th>Тип</th><th>Основание</th><th>Статус</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.passType === 'car' ? 'Авто' : 'Пешеходный'}</td>
              <td>{r.reason}</td>
              <td><StatusBadge status={r.status} /></td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan="4" className="muted">Пока пусто</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
