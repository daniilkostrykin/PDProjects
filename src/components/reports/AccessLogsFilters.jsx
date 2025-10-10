// src/components/reports/AccessLogsFilters.jsx
import { useState } from 'react';

export default function AccessLogsFilters({ onFilterChange, checkpoints = [] }) {
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    checkpoint: '',
    eventType: '',
    accessStatus: '',
    department: ''
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      dateFrom: '',
      dateTo: '',
      checkpoint: '',
      eventType: '',
      accessStatus: '',
      department: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Установить фильтр "сегодня"
  const setTodayFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    const newFilters = { ...filters, dateFrom: today, dateTo: today };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Установить фильтр "вчера"
  const setYesterdayFilter = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const newFilters = { ...filters, dateFrom: yesterdayStr, dateTo: yesterdayStr };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Установить фильтр "последние 7 дней"
  const setLastWeekFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    const newFilters = { ...filters, dateFrom: weekAgoStr, dateTo: today };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-card">
      <div className="filters-header">
        <h4>Фильтры журнала доступа</h4>
        <div className="filters-actions">
          <div className="quick-filters">
            <button className="btn btn--sm btn--ghost" onClick={setTodayFilter}>
              Сегодня
            </button>
            <button className="btn btn--sm btn--ghost" onClick={setYesterdayFilter}>
              Вчера
            </button>
            <button className="btn btn--sm btn--ghost" onClick={setLastWeekFilter}>
              Неделя
            </button>
          </div>
          {hasActiveFilters && (
            <button className="btn btn--sm btn--ghost" onClick={clearFilters}>
              Очистить все
            </button>
          )}
        </div>
      </div>

      <div className="filters-grid">
        <div className="form-group">
          <label>Поиск</label>
          <input
            type="text"
            placeholder="ФИО, код пропуска, КПП..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Дата от</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Дата до</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>КПП</label>
          <select
            value={filters.checkpoint}
            onChange={(e) => handleFilterChange('checkpoint', e.target.value)}
            className="form-select"
          >
            <option value="">Все КПП</option>
            {checkpoints.map(checkpoint => (
              <option key={checkpoint} value={checkpoint}>{checkpoint}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Тип события</label>
          <select
            value={filters.eventType}
            onChange={(e) => handleFilterChange('eventType', e.target.value)}
            className="form-select"
          >
            <option value="">Все события</option>
            <option value="ENTRY">Вход</option>
            <option value="EXIT">Выход</option>
          </select>
        </div>

        <div className="form-group">
          <label>Статус доступа</label>
          <select
            value={filters.accessStatus}
            onChange={(e) => handleFilterChange('accessStatus', e.target.value)}
            className="form-select"
          >
            <option value="">Все статусы</option>
            <option value="GRANTED">Разрешен</option>
            <option value="DENIED">Отказано</option>
          </select>
        </div>

        <div className="form-group">
          <label>Отдел</label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="form-select"
          >
            <option value="">Все отделы</option>
            <option value="IT-отдел">IT-отдел</option>
            <option value="Бухгалтерия">Бухгалтерия</option>
            <option value="Склад">Склад</option>
            <option value="HR">HR</option>
            <option value="Маркетинг">Маркетинг</option>
            <option value="Продажи">Продажи</option>
            <option value="Производство">Производство</option>
            <option value="СБ">СБ</option>
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
          {filters.dateFrom && (
            <span className="filter-tag">
              От: {new Date(filters.dateFrom).toLocaleDateString('ru-RU')}
              <button onClick={() => handleFilterChange('dateFrom', '')}>×</button>
            </span>
          )}
          {filters.dateTo && (
            <span className="filter-tag">
              До: {new Date(filters.dateTo).toLocaleDateString('ru-RU')}
              <button onClick={() => handleFilterChange('dateTo', '')}>×</button>
            </span>
          )}
          {filters.checkpoint && (
            <span className="filter-tag">
              КПП: {filters.checkpoint}
              <button onClick={() => handleFilterChange('checkpoint', '')}>×</button>
            </span>
          )}
          {filters.eventType && (
            <span className="filter-tag">
              Событие: {filters.eventType === 'ENTRY' ? 'Вход' : 'Выход'}
              <button onClick={() => handleFilterChange('eventType', '')}>×</button>
            </span>
          )}
          {filters.accessStatus && (
            <span className="filter-tag">
              Статус: {filters.accessStatus === 'GRANTED' ? 'Разрешен' : 'Отказано'}
              <button onClick={() => handleFilterChange('accessStatus', '')}>×</button>
            </span>
          )}
          {filters.department && (
            <span className="filter-tag">
              Отдел: {filters.department}
              <button onClick={() => handleFilterChange('department', '')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
