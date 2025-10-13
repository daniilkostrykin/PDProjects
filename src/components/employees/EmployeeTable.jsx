// src/components/employees/EmployeeTable.jsx
import { EmployeesApi } from '@/services/api/employees.api';
import { useState, useEffect, useRef } from 'react'; 

function StatusBadge({ status }) {
  const statusMap = {
    'ACTIVE': { text: 'Активен', class: 'success' },
    'ON_LEAVE': { text: 'В отпуске', class: 'warning' },
    'FIRED': { text: 'Уволен', class: 'danger' }
  };
  
  const statusInfo = statusMap[status] || { text: status, class: 'default' };
  return <span className={`badge badge--${statusInfo.class}`}>{statusInfo.text}</span>;
}

function PassStatusBadge({ status }) {
  const statusMap = {
    'ACTIVE': { text: 'Активен', class: 'success' },
    'BLOCKED': { text: 'Заблокирован', class: 'danger' },
    'EXPIRED': { text: 'Просрочен', class: 'warning' }
  };
  
  const statusInfo = statusMap[status] || { text: status, class: 'default' };
  return <span className={`badge badge--${statusInfo.class}`}>{statusInfo.text}</span>;
}

export default function EmployeeTable({ 
  employees, 
  onEdit, 
  onDelete, 
  onTogglePass, 
  onExtendPass,
  loading = false 
}) {

  const [extendingPass, setExtendingPass] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleExtendPass = async (employeeId) => {
    if (!newExpiryDate) return;
    
    try {
      await EmployeesApi.extendPass(employeeId, newExpiryDate);
      onExtendPass();
      setExtendingPass(null);
      setNewExpiryDate('');
    } catch (error) {
      console.error('Ошибка продления пропуска:', error);
      alert('Ошибка при продлении пропуска');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ru-RU');
  };

  // Закрытие dropdown при клике вне его
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setOpenDropdown(null);
    }
  };

  // Переключение раскрытия строки
  const toggleRowExpansion = (employeeId) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(employeeId)) {
        next.delete(employeeId);
      } else {
        next.add(employeeId);
      }
      return next;
    });
  };

  return (
    <div className="card" onClick={handleClickOutside}>
      <div className="table-container">
        <table className="table table--compact">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Статус сотрудника</th>
              <th>Статус пропуска</th>
              <th>Срок действия</th>
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
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center muted">
                  Сотрудники не найдены
                </td>
              </tr>
            ) : (
              employees.map(employee => (
                <>
                  <tr 
                    key={employee.id} 
                    onClick={() => toggleRowExpansion(employee.id)}
                    style={{cursor: 'pointer'}}
                  >
                    <td>
                      <div className="employee-info">
                        {employee.photoUrl && (
                          <img 
                            src={employee.photoUrl} 
                            alt={employee.firstName}
                            className="employee-photo"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        <div>
                          <div className="employee-name">
                            {employee.lastName} {employee.firstName} {employee.middleName}
                          </div>
                          {employee.phone && (
                            <div className="employee-phone">{employee.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{employee.position}</td>
                    <td>
                      <StatusBadge status={employee.status} />
                    </td>
                    <td>
                      <PassStatusBadge status={employee.passStatus} />
                    </td>
                    <td>{formatDate(employee.passExpiryDate)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons" style={{display:'flex',alignItems:'center',gap:6}}>
                        <button 
                          className="btn btn--sm btn--primary"
                          onClick={() => onEdit(employee)}
                          title="Редактировать"
                        >
                          ✏️
                        </button>
                        <div className="dropdown" style={{position:'relative'}}>
                          <button 
                            className="btn btn--sm"
                            onClick={() => setOpenDropdown(openDropdown === employee.id ? null : employee.id)}
                          >
                            ⋮
                          </button>
                          {openDropdown === employee.id && (
                            <div 
                              className="dropdown-menu" 
                              style={{
                                position:'absolute', 
                                right:0, 
                                top:'100%', 
                                background:'#fff', 
                                border:'1px solid var(--border)', 
                                borderRadius:8, 
                                boxShadow:'var(--shadow)', 
                                padding:6,
                                zIndex: 10,
                                minWidth: '150px'
                              }}
                            >
                              <button 
                                className="btn btn--sm" 
                                style={{width: '100%', marginBottom: 4}}
                                onClick={() => {
                                  onTogglePass(employee.id);
                                  setOpenDropdown(null);
                                }}
                              >
                                {employee.passStatus === 'ACTIVE' ? 'Заблокировать' : 'Разблокировать'}
                              </button>
                              <button 
                                className="btn btn--sm" 
                                style={{width: '100%', marginBottom: 4}}
                                onClick={() => {
                                  setExtendingPass(employee.id);
                                  setOpenDropdown(null);
                                }}
                              >
                                Продлить пропуск
                              </button>
                              <button 
                                className="btn btn--sm btn--danger" 
                                style={{width: '100%'}}
                                onClick={() => { 
                                  if (confirm(`Удалить сотрудника ${employee.firstName} ${employee.lastName}?`)) {
                                    onDelete(employee.id);
                                    setOpenDropdown(null);
                                  }
                                }}
                              >
                                Удалить
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.has(employee.id) && (
                    <tr>
                      <td colSpan="6" style={{padding: 0}}>
                        <div className="employee-details" style={{
                          background: '#f8fafc',
                          padding: '16px',
                          borderTop: '1px solid var(--border)'
                        }}>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
                            <div>
                              <div style={{fontWeight: 600, marginBottom: '8px', color: '#374151'}}>Контактная информация</div>
                              <div style={{marginBottom: '4px'}}>
                                <strong>Email:</strong> 
                                <a href={`mailto:${employee.email}`} className="link" style={{marginLeft: '8px'}}>
                                  {employee.email}
                                </a>
                              </div>
                              <div style={{marginBottom: '4px'}}>
                                <strong>Телефон:</strong> {employee.phone || '—'}
                              </div>
                              <div>
                                <strong>Отдел:</strong> {employee.department}
                              </div>
                            </div>
                            <div>
                              <div style={{fontWeight: 600, marginBottom: '8px', color: '#374151'}}>Пропуск</div>
                              <div style={{marginBottom: '4px'}}>
                                <strong>Код пропуска:</strong> 
                                <code className="pass-code" style={{marginLeft: '8px'}}>{employee.passCode}</code>
                              </div>
                              <div>
                                <strong>Обновлен:</strong> {formatDateTime(employee.updatedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Модальное окно для продления пропуска */}
      {extendingPass && (
        <div className="modal-overlay">
          <div className="modal modal--sm">
            <div className="modal-header">
              <h3>Продлить пропуск</h3>
              <button 
                className="btn btn--ghost" 
                onClick={() => {
                  setExtendingPass(null);
                  setNewExpiryDate('');
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Новая дата окончания действия</label>
                <input
                  type="date"
                  value={newExpiryDate}
                  onChange={(e) => setNewExpiryDate(e.target.value)}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn--ghost" 
                onClick={() => {
                  setExtendingPass(null);
                  setNewExpiryDate('');
                }}
              >
                Отмена
              </button>
              <button 
                className="btn btn--primary"
                onClick={() => handleExtendPass(extendingPass)}
                disabled={!newExpiryDate}
              >
                Продлить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
