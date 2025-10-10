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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h3>
          <button className="btn btn--ghost" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Фамилия *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Имя *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Отчество</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Отдел *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Выберите отдел</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Должность *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Выберите должность</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Статус</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="ACTIVE">Активен</option>
                <option value="ON_LEAVE">В отпуске</option>
                <option value="FIRED">Уволен</option>
              </select>
            </div>
            <div className="form-group">
              <label>Срок действия пропуска</label>
              <input
                type="date"
                name="passExpiryDate"
                value={formData.passExpiryDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Сохранение...' : (employee ? 'Сохранить' : 'Добавить')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
