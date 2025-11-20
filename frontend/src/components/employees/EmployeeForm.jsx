// src/components/employees/EmployeeForm.jsx
import { useState, useEffect } from 'react';
import { EmployeesApi } from '@/services/api/employees.api';

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
    passExpiryDate: ''
  });

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Загружаем справочники
    Promise.all([
      EmployeesApi.getDepartments(),
      EmployeesApi.getPositions()
    ]).then(([depts, pos]) => {
      setDepartments(depts);
      setPositions(pos);
    });

    // Если редактируем существующего сотрудника
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        middleName: employee.middleName || '',
        department: employee.department || '',
        position: employee.position || '',
        email: employee.email || '',
        phone: employee.phone || '',
        status: employee.status || 'ACTIVE',
        passExpiryDate: employee.passExpiryDate || ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (employee) {
        await EmployeesApi.update(employee.id, formData);
      } else {
        await EmployeesApi.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении сотрудника');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal" style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="modal-header" style={{
          padding: '24px 24px 0 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            fontFamily: '"Montserrat", sans-serif'
          }}>
            {employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
          </h3>
          <button 
            className="btn btn--ghost" 
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form" style={{padding: '24px'}}>
          <div className="form-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px'}}>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Фамилия *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Имя *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Отчество</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <div className="form-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Отдел *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="form-select"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">Выберите отдел</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Должность *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="form-select"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">Выберите должность</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+7 (999) 123-45-67"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <div className="form-row" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Статус</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="ACTIVE">Активен</option>
                <option value="ON_LEAVE">В отпуске</option>
                <option value="FIRED">Уволен</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px',
                fontFamily: '"Montserrat", sans-serif'
              }}>Срок действия пропуска</label>
              <input
                type="date"
                name="passExpiryDate"
                value={formData.passExpiryDate}
                onChange={handleChange}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: '"Montserrat", sans-serif',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <div className="form-actions" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            marginTop: '24px'
          }}>
            <button 
              type="button" 
              className="btn btn--ghost" 
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '500'
              }}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="btn btn--primary" 
              disabled={loading}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '500',
                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Сохранение...' : (employee ? 'Сохранить' : 'Добавить')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
