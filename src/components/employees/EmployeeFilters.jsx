// src/components/employees/EmployeeFilters.jsx
import { useState } from 'react';

export default function EmployeeFilters({ onFilterChange, departments = [] }) {
  // Черновик фильтров — изменения применяются по кнопке
  const [draft, setDraft] = useState({
    search: '',
    department: '',
    status: '',
    passStatus: ''
  });
  const [applied, setApplied] = useState(draft);

  const handleDraftChange = (name, value) => {
    const next = { ...draft, [name]: value };
    setDraft(next);
  };

  const applyFilters = () => {
    setApplied(draft);
    onFilterChange(draft);
  };

  const clearFilters = () => {
    const cleared = { search: '', department: '', status: '', passStatus: '' };
    setDraft(cleared);
    setApplied(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters = Object.values(applied).some(value => value !== '');

  return (
    <div className="filters-card">
      <div className="filters-layout">
        <div className="filters-left">
          <div className="form-group">
            <label>Поиск</label>
            <input
              type="text"
              placeholder="ФИО, email, код пропуска..."
              value={draft.search}
              onChange={(e) => handleDraftChange('search', e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Отдел</label>
            <select
              value={draft.department}
              onChange={(e) => handleDraftChange('department', e.target.value)}
              className="select"
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
              value={draft.status}
              onChange={(e) => handleDraftChange('status', e.target.value)}
              className="select"
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
              value={draft.passStatus}
              onChange={(e) => handleDraftChange('passStatus', e.target.value)}
              className="select"
            >
              <option value="">Все пропуска</option>
              <option value="ACTIVE">Активен</option>
              <option value="BLOCKED">Заблокирован</option>
              <option value="EXPIRED">Просрочен</option>
            </select>
          </div>
        </div>
        <div className="filters-actions">
          <button className="btn btn--primary" onClick={applyFilters}>Применить</button>
          <button className="btn" onClick={clearFilters}>Сбросить</button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Активные фильтры:</span>
          {applied.search && (
            <span className="filter-tag">
              Поиск: "{applied.search}"
              <button onClick={() => { setDraft({ ...draft, search: '' }); applyFilters({ ...applied, search: '' }); }}>×</button>
            </span>
          )}
          {applied.department && (
            <span className="filter-tag">
              Отдел: {applied.department}
              <button onClick={() => { setDraft({ ...draft, department: '' }); applyFilters({ ...applied, department: '' }); }}>×</button>
            </span>
          )}
          {applied.status && (
            <span className="filter-tag">
              Статус: {applied.status}
              <button onClick={() => { setDraft({ ...draft, status: '' }); applyFilters({ ...applied, status: '' }); }}>×</button>
            </span>
          )}
          {applied.passStatus && (
            <span className="filter-tag">
              Пропуск: {applied.passStatus}
              <button onClick={() => { setDraft({ ...draft, passStatus: '' }); applyFilters({ ...applied, passStatus: '' }); }}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
