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

  const [pendingFilters, setPendingFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    checkpoint: '',
    eventType: '',
    accessStatus: '',
    department: ''
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...pendingFilters, [name]: value };
    setPendingFilters(newFilters);
  };

  const applyFilters = () => {
    setFilters(pendingFilters);
    onFilterChange(pendingFilters);
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
    setPendingFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const hasPendingChanges = JSON.stringify(filters) !== JSON.stringify(pendingFilters);

  // Установить фильтр "сегодня"
  const setTodayFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    const newFilters = { ...pendingFilters, dateFrom: today, dateTo: today };
    setPendingFilters(newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Установить фильтр "вчера"
  const setYesterdayFilter = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const newFilters = { ...pendingFilters, dateFrom: yesterdayStr, dateTo: yesterdayStr };
    setPendingFilters(newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Установить фильтр "последние 7 дней"
  const setLastWeekFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    const newFilters = { ...pendingFilters, dateFrom: weekAgoStr, dateTo: today };
    setPendingFilters(newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-card">
      <div className="filters-layout">
        <div className="filters-left">
          <div className="form-group">
            <label>Поиск</label>
            <input
              type="text"
              placeholder="ФИО, код пропуска, КПП..."
              value={pendingFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Дата от</label>
            <input
              type="date"
              value={pendingFilters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Дата до</label>
            <input
              type="date"
              value={pendingFilters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>КПП</label>
            <select
              value={pendingFilters.checkpoint}
              onChange={(e) => handleFilterChange('checkpoint', e.target.value)}
              className="select"
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
              value={pendingFilters.eventType}
              onChange={(e) => handleFilterChange('eventType', e.target.value)}
              className="select"
            >
              <option value="">Все события</option>
              <option value="ENTRY">Вход</option>
              <option value="EXIT">Выход</option>
            </select>
          </div>
          <div className="form-group">
            <label>Статус доступа</label>
            <select
              value={pendingFilters.accessStatus}
              onChange={(e) => handleFilterChange('accessStatus', e.target.value)}
              className="select"
            >
              <option value="">Все статусы</option>
              <option value="GRANTED">Разрешен</option>
              <option value="DENIED">Отказано</option>
            </select>
          </div>
          <div className="form-group">
            <label>Отдел</label>
            <select
              value={pendingFilters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="select"
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
        <div className="filters-actions">
          <div className="quick-filters" style={{ marginBottom: '16px' }}>
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
          <button className="btn btn--primary" onClick={applyFilters}>Применить</button>
          <button className="btn" onClick={clearFilters}>Сбросить</button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Активные фильтры:</span>
          {filters.search && (
            <span className="filter-tag">
              Поиск: "{filters.search}"
              <button onClick={() => {
                const newFilters = { ...filters, search: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, search: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.dateFrom && (
            <span className="filter-tag">
              От: {new Date(filters.dateFrom).toLocaleDateString('ru-RU')}
              <button onClick={() => {
                const newFilters = { ...filters, dateFrom: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, dateFrom: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.dateTo && (
            <span className="filter-tag">
              До: {new Date(filters.dateTo).toLocaleDateString('ru-RU')}
              <button onClick={() => {
                const newFilters = { ...filters, dateTo: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, dateTo: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.checkpoint && (
            <span className="filter-tag">
              КПП: {filters.checkpoint}
              <button onClick={() => {
                const newFilters = { ...filters, checkpoint: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, checkpoint: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.eventType && (
            <span className="filter-tag">
              Событие: {filters.eventType === 'ENTRY' ? 'Вход' : 'Выход'}
              <button onClick={() => {
                const newFilters = { ...filters, eventType: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, eventType: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.accessStatus && (
            <span className="filter-tag">
              Статус: {filters.accessStatus === 'GRANTED' ? 'Разрешен' : 'Отказано'}
              <button onClick={() => {
                const newFilters = { ...filters, accessStatus: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, accessStatus: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
          {filters.department && (
            <span className="filter-tag">
              Отдел: {filters.department}
              <button onClick={() => {
                const newFilters = { ...filters, department: '' };
                setFilters(newFilters);
                setPendingFilters({ ...pendingFilters, department: '' });
                onFilterChange(newFilters);
              }}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
