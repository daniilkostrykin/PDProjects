export default function ApprovedTable({ rows=[] }) {
  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Дата</th><th>ФИО</th><th>Тип</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}><td>{r.date}</td><td>{r.fullName}</td><td>{r.passType}</td></tr>
          ))}
          {!rows.length && <tr><td colSpan="3" className="muted">Нет записей</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
