function StatusBadge({ status }) {
  const map = { 
    approved: 'Одобрен', 
    pending: 'На рассмотрении', 
    rejected: 'Отклонён' 
  };
  const statusClass = {
    approved: 'success',
    pending: 'warning', 
    rejected: 'danger'
  };
  
  return (
    <span className={`badge badge--${statusClass[status] || 'default'}`}>
      {map[status] || status}
    </span>
  );
}

export default function QueueTable({ rows = [], loading = false, onApprove, onReject }) {
  return (
    <div className="card">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Дата визита</th>
              <th>ФИО</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Создана</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="spinner"></div>
                  Загрузка...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center muted">
                  Заявки не найдены
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>
                    <div className="pass-info">
                      <div className="pass-name">{row.fullName}</div>
                      {row.carInfo && (
                        <div className="pass-car">{row.carInfo}</div>
                      )}
                      <div className="pass-reason">{row.reason}</div>
                    </div>
                  </td>
                  <td>{row.passType}</td>
                  <td><StatusBadge status={row.status}/></td>
                  <td>{row.createdAt}</td>
                  <td className="row">
                    {row.status === 'pending' && (
                      <>
                        <button 
                          className="btn btn--primary btn--sm"
                          onClick={() => onApprove(row.id)}
                          title="Одобрить"
                        >
                          ✓
                        </button>
                        <button 
                          className="btn btn--danger btn--sm"
                          onClick={() => onReject(row.id)}
                          title="Отклонить"
                        >
                          ✗
                        </button>
                      </>
                    )}
                    {row.status !== 'pending' && (
                      <span className="muted">Обработано</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
