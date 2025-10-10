// src/components/reports/AccessLogsTable.jsx
import { useState } from 'react';

function EventTypeBadge({ eventType }) {
  const typeMap = {
    'ENTRY': { text: 'Вход', class: 'success' },
    'EXIT': { text: 'Выход', class: 'info' }
  };
  
  const typeInfo = typeMap[eventType] || { text: eventType, class: 'default' };
  return <span className={`badge badge--${typeInfo.class}`}>{typeInfo.text}</span>;
}

function AccessStatusBadge({ status, denialReason }) {
  if (status === 'GRANTED') {
    return <span className="badge badge--success">Разрешен</span>;
  }
  
  const reasonMap = {
    'PASS_BLOCKED': 'Пропуск заблокирован',
    'PASS_EXPIRED': 'Пропуск просрочен',
    'PASS_NOT_FOUND': 'Пропуск не найден',
    'EMPLOYEE_FIRED': 'Сотрудник уволен',
    'EMPLOYEE_ON_LEAVE': 'Сотрудник в отпуске',
    'ACCESS_DENIED': 'Доступ запрещен',
    'TIME_RESTRICTION': 'Время доступа ограничено'
  };
  
  const reasonText = reasonMap[denialReason] || denialReason || 'Неизвестная причина';
  return <span className="badge badge--danger" title={reasonText}>Отказано</span>;
}

export default function AccessLogsTable({ logs, loading = false }) {
  const [selectedLog, setSelectedLog] = useState(null);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="card">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Время</th>
              <th>КПП</th>
              <th>Сотрудник</th>
              <th>Код пропуска</th>
              <th>Тип события</th>
              <th>Статус доступа</th>
              <th>Отдел</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="spinner"></div>
                  Загрузка...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center muted">
                  Записи не найдены
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className={log.accessStatus === 'DENIED' ? 'row--warning' : ''}>
                  <td>
                    <div className="datetime-cell">
                      <div className="datetime-date">
                        {new Date(log.timestamp).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="datetime-time">
                        {formatTime(log.timestamp)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="checkpoint-name">{log.checkpointName}</span>
                  </td>
                  <td>
                    <div className="employee-info">
                      {log.photoUrl && (
                        <img 
                          src={log.photoUrl} 
                          alt={log.employeeName}
                          className="employee-photo employee-photo--sm"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <div>
                        <div className="employee-name">{log.employeeName}</div>
                        {log.department && (
                          <div className="employee-department">{log.department}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="pass-code">{log.passCode}</code>
                  </td>
                  <td>
                    <EventTypeBadge eventType={log.eventType} />
                  </td>
                  <td>
                    <AccessStatusBadge 
                      status={log.accessStatus} 
                      denialReason={log.denialReason}
                    />
                  </td>
                  <td>
                    {log.department || '-'}
                  </td>
                  <td>
                    <button 
                      className="btn btn--sm btn--info"
                      onClick={() => setSelectedLog(log)}
                      title="Подробности"
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Модальное окно с подробностями */}
      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal modal--sm">
            <div className="modal-header">
              <h3>Подробности события</h3>
              <button 
                className="btn btn--ghost" 
                onClick={() => setSelectedLog(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Время события:</label>
                  <span>{formatDateTime(selectedLog.timestamp)}</span>
                </div>
                <div className="detail-item">
                  <label>КПП:</label>
                  <span>{selectedLog.checkpointName}</span>
                </div>
                <div className="detail-item">
                  <label>Сотрудник:</label>
                  <span>{selectedLog.employeeName}</span>
                </div>
                <div className="detail-item">
                  <label>Код пропуска:</label>
                  <span><code>{selectedLog.passCode}</code></span>
                </div>
                <div className="detail-item">
                  <label>Тип события:</label>
                  <span>
                    <EventTypeBadge eventType={selectedLog.eventType} />
                  </span>
                </div>
                <div className="detail-item">
                  <label>Статус доступа:</label>
                  <span>
                    <AccessStatusBadge 
                      status={selectedLog.accessStatus} 
                      denialReason={selectedLog.denialReason}
                    />
                  </span>
                </div>
                {selectedLog.denialReason && (
                  <div className="detail-item">
                    <label>Причина отказа:</label>
                    <span className="denial-reason">{selectedLog.denialReason}</span>
                  </div>
                )}
                <div className="detail-item">
                  <label>Отдел:</label>
                  <span>{selectedLog.department || '-'}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn--primary" 
                onClick={() => setSelectedLog(null)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
