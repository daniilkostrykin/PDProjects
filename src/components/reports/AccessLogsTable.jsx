// src/components/reports/AccessLogsTable.jsx
import { useState } from 'react';

function EventTypeBadge({ eventType }) {
  const typeMap = {
    'ENTRY': { text: 'Вход', class: 'success', borderColor: '#bbf7d0', textColor: '#10b981' },
    'EXIT': { text: 'Выход', class: 'danger', borderColor: '#fecaca', textColor: '#dc2626' }
  };
  
  const typeInfo = typeMap[eventType] || { text: eventType, class: 'default', borderColor: '#6b7280', textColor: '#6b7280' };
  return (
    <span 
      className={`badge badge--${typeInfo.class}`}
      style={{
        backgroundColor: 'transparent',
        border: `2px solid ${typeInfo.borderColor}`,
        color: typeInfo.textColor,
        fontWeight: '600'
      }}
    >
      {typeInfo.text}
    </span>
  );
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
  
  const reasonText = reasonMap[denialReason] || 'Неизвестная причина';
  return <span className="badge badge--danger" title={reasonText}>Отказано</span>;
}

export default function AccessLogsTable({ logs, loading = false }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedRowRef, setSelectedRowRef] = useState(null);

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

  // Перевод системных кодов причин отказа на человеческий язык
  const getHumanReadableDenialReason = (reason) => {
    const reasonMap = {
      'EMPLOYEE_FIRED': 'Сотрудник уволен',
      'PASS_BLOCKED': 'Пропуск заблокирован',
      'PASS_NOT_FOUND': 'Пропуск не найден в системе',
      'PASS_EXPIRED': 'Пропуск просрочен',
      'EMPLOYEE_INACTIVE': 'Сотрудник неактивен',
      'ACCESS_DENIED': 'Доступ запрещен',
      'INVALID_PASS': 'Недействительный пропуск',
      'TIME_RESTRICTION': 'Ограничение по времени',
      'AREA_RESTRICTION': 'Ограничение по зоне',
      'SECURITY_ALERT': 'Сигнал безопасности'
    };
    return reasonMap[reason] || reason;
  };

  // Получение описания причины отказа
  const getDenialDescription = (reason) => {
    const descriptionMap = {
      'EMPLOYEE_FIRED': 'Пропуск данного сотрудника был аннулирован.',
      'PASS_BLOCKED': 'Пропуск временно заблокирован администратором.',
      'PASS_NOT_FOUND': 'Пропуск не зарегистрирован в системе.',
      'PASS_EXPIRED': 'Срок действия пропуска истек.',
      'EMPLOYEE_INACTIVE': 'Учетная запись сотрудника деактивирована.',
      'ACCESS_DENIED': 'Доступ запрещен по политике безопасности.',
      'INVALID_PASS': 'Пропуск поврежден или подделан.',
      'TIME_RESTRICTION': 'Доступ разрешен только в определенное время.',
      'AREA_RESTRICTION': 'Доступ к данной зоне запрещен.',
      'SECURITY_ALERT': 'Сработала система безопасности.'
    };
    return descriptionMap[reason] || 'Причина отказа не указана.';
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
              logs.map(log => {
                // Определяем аномалии для выделения
                const isUnknownEmployee = log.employeeName === 'Неизвестный' || log.employeeName === 'Unknown';
                
                return (
                  <tr 
                    key={log.id} 
                    className={isUnknownEmployee ? 'row--anomaly row--unknown' : ''}
                    style={{
                      borderLeft: isUnknownEmployee ? '4px solid #dc2626' : '4px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
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
                          <div className="employee-name" style={{
                            color: isUnknownEmployee ? '#dc2626' : 'inherit',
                            fontWeight: isUnknownEmployee ? '600' : 'normal'
                          }}>
                            {log.employeeName}
                            {isUnknownEmployee && <span style={{marginLeft: '8px', fontSize: '12px'}}>⚠️</span>}
                          </div>
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
                      {log.accessStatus === 'DENIED' && log.denialReason && (
                        <button 
                          className="btn btn--sm btn--info"
                          onClick={(e) => {
                            setSelectedLog(log);
                            setSelectedRowRef(e.target.closest('tr'));
                          }}
                          title="Подробности отказа"
                        >
                          👁️
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Боковое окно с причиной отказа */}
      {selectedLog && selectedLog.denialReason && selectedRowRef && (
        <div className="side-panel-overlay" onClick={() => {
          setSelectedLog(null);
          setSelectedRowRef(null);
        }}>
          <div 
            className="side-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000
            }}
          >
            <div className="denial-callout">
              <div className="denial-callout-header">
                <span className="denial-icon">🚫</span>
                <span className="denial-title">Доступ запрещен</span>
              </div>
              <div className="denial-reason">
                {getHumanReadableDenialReason(selectedLog.denialReason)}
              </div>
              <div className="denial-description">
                {getDenialDescription(selectedLog.denialReason)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
