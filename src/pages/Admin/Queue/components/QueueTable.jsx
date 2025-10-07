function StatusBadge({ status }) {
  const map = { approved: 'Одобрен', pending: 'На рассмотрении', rejected: 'Отклонён' }
  return <span className={`badge badge--${status}`}>{map[status] || status}</span>
}

export default function QueueTable({ rows=[] }) {
  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Дата</th><th>ФИО</th><th>Тип</th><th>Статус</th><th></th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.date}</td><td>{r.fullName}</td>
              <td>{r.passType}</td>
              <td><StatusBadge status={r.status}/></td>
              <td className="row">
                <button className="btn btn--primary">Одобрить</button>
                <button className="btn btn--ghost">Отклонить</button>
              </td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan="5" className="muted">Очередь пуста</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
