export default function ApprovedTable({ rows = [] }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr><th>Дата</th><th>ФИО</th><th>Тип</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{fontVariantNumeric:'tabular-nums'}}>{r.date}</td>
              <td>{r.fullName}</td>
              <td>{r.passType}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={3}>
                <div className="muted" style={{padding:'8px 2px'}}>Нет записей</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
