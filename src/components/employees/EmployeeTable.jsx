// src/components/employees/EmployeeTable.jsx
import { useState } from 'react';
import { EmployeesApi } from '@/services/api/employees.api';

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

  return (
    <div className="card">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Отдел</th>
              <th>Должность</th>
              <th>Email</th>
              <th>Код пропуска</th>
              <th>Статус сотрудника</th>
              <th>Статус пропуска</th>
              <th>Срок действия</th>
              <th>Обновлен</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center">
                  <div className="spinner"></div>
                  Загрузка...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center muted">
                  Сотрудники не найдены
                </td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee.id}>
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
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <a href={`mailto:${employee.email}`} className="link">
                      {employee.email}
                    </a>
                  </td>
                  <td>
                    <code className="pass-code">{employee.passCode}</code>
                  </td>
                  <td>
                    <StatusBadge status={employee.status} />
                  </td>
                  <td>
                    <PassStatusBadge status={employee.passStatus} />
                  </td>
                  <td>{formatDate(employee.passExpiryDate)}</td>
                  <td>{formatDateTime(employee.updatedAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn--sm btn--primary"
                        onClick={() => onEdit(employee)}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      
                      <button 
                        className={`btn btn--sm ${employee.passStatus === 'ACTIVE' ? 'btn--warning' : 'btn--success'}`}
                        onClick={() => onTogglePass(employee.id)}
                        title={employee.passStatus === 'ACTIVE' ? 'Заблокировать пропуск' : 'Разблокировать пропуск'}
                      >
                        {employee.passStatus === 'ACTIVE' ? '🔒' : '🔓'}
                      </button>
                      
                      <button 
                        className="btn btn--sm btn--info"
                        onClick={() => setExtendingPass(employee.id)}
                        title="Продлить пропуск"
                      >
                        📅
                      </button>
                      
                      <button 
                        className="btn btn--sm btn--danger"
                        onClick={() => {
                          if (confirm(`Удалить сотрудника ${employee.firstName} ${employee.lastName}?`)) {
                            onDelete(employee.id);
                          }
                        }}
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
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
