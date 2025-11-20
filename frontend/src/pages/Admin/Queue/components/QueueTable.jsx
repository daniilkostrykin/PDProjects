import { useState } from 'react';

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

export default function QueueTable({ rows = [], loading = false, onApprove, onReject, selectable=false, onToggleSelect, isSelected=()=>false, onToggleSelectAll }) {
  const [expanded, setExpanded] = useState(new Set());

  const toggleRow = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  return (
    <div className="card">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input type="checkbox" onChange={(e)=> onToggleSelectAll?.(e.target.checked)} />
                </th>
              )}
              <th>Дата визита</th>
              <th>ФИО</th>
              <th>Тип</th>
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
                <td colSpan={selectable ? 6 : 5} className="text-center muted">
                  Заявки не найдены
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <>
                  <tr key={row.id} onClick={()=>toggleRow(row.id)} style={{cursor:'pointer'}}>
                    {selectable && (
                      <td>
                        <input type="checkbox" checked={isSelected(row.id)} onChange={(e)=> { e.stopPropagation(); onToggleSelect?.(row.id, e.target.checked); }} />
                      </td>
                    )}
                    <td>{row.date}</td>
                    <td>
                      <div className="pass-info">
                        <div className="pass-name">{row.fullName}</div>
                        {/* Цель перенесена только в раскрытие */}
                      </div>
                    </td>
                    <td>{row.passType}</td>
                    <td>{row.createdAt}</td>
                    <td className="row">
                      {row.status === 'pending' && (
                        <>
                          <button 
                            className="btn btn--primary btn--sm"
                            onClick={(e) => { e.stopPropagation(); onApprove(row.id); }}
                            title="Одобрить"
                          >
                            ✓
                          </button>
                          <button 
                            className="btn btn--danger btn--sm"
                            onClick={(e) => { e.stopPropagation(); onReject(row.id); }}
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
                  {expanded.has(row.id) && (
                  <tr>
                    <td colSpan={selectable ? 5 : 4}>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
                        <div className="card" style={{padding:12}}>
                          <div className="muted" style={{fontSize:12, marginBottom:4}}>Пригласивший</div>
                          <div style={{fontWeight:600}}>{row.invitedBy || '—'}</div>
                        </div>
                        <div className="card" style={{padding:12}}>
                          <div className="muted" style={{fontSize:12, marginBottom:4}}>Период</div>
                          <div style={{fontWeight:600}}>{row.period || '—'}</div>
                        </div>
                        <div className="card" style={{padding:12}}>
                          <div className="muted" style={{fontSize:12, marginBottom:4}}>Авто</div>
                          <div style={{fontWeight:600}}>{row.carInfo || '—'}</div>
                        </div>
                        {row.reason && (
                          <div className="card" style={{padding:12, gridColumn:'1 / -1'}}>
                            <div className="muted" style={{fontSize:12, marginBottom:4}}>Цель визита</div>
                            <div style={{fontWeight:600}}>{row.reason}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
