// src/components/employees/EmployeeFilters.jsx
import { useState } from 'react';

export default function EmployeeFilters({ onFilterChange, departments = [] }) {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    passStatus: ''
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      status: '',
      passStatus: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="filters-card">
      <div className="filters-header">
        <h4>Фильтры</h4>
        {hasActiveFilters && (
          <button className="btn btn--sm btn--ghost" onClick={clearFilters}>
            Очистить
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="form-group">
          <label>Поиск</label>
          <input
            type="text"
            placeholder="ФИО, email, код пропуска..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Отдел</label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="form-select"
          >
            <option value="">Все отделы</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Статус сотрудника</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-select"
          >
            <option value="">Все статусы</option>
            <option value="ACTIVE">Активен</option>
            <option value="ON_LEAVE">В отпуске</option>
            <option value="FIRED">Уволен</option>
          </select>
        </div>

        <div className="form-group">
          <label>Статус пропуска</label>
          <select
            value={filters.passStatus}
            onChange={(e) => handleFilterChange('passStatus', e.target.value)}
            className="form-select"
          >
            <option value="">Все статусы</option>
            <option value="ACTIVE">Активен</option>
            <option value="BLOCKED">Заблокирован</option>
            <option value="EXPIRED">Просрочен</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Активные фильтры:</span>
          {filters.search && (
            <span className="filter-tag">
              Поиск: "{filters.search}"
              <button onClick={() => handleFilterChange('search', '')}>×</button>
            </span>
          )}
          {filters.department && (
            <span className="filter-tag">
              Отдел: {filters.department}
              <button onClick={() => handleFilterChange('department', '')}>×</button>
            </span>
          )}
          {filters.status && (
            <span className="filter-tag">
              Статус: {filters.status}
              <button onClick={() => handleFilterChange('status', '')}>×</button>
            </span>
          )}
          {filters.passStatus && (
            <span className="filter-tag">
              Пропуск: {filters.passStatus}
              <button onClick={() => handleFilterChange('passStatus', '')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
