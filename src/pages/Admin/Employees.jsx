import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeFilters from '@/components/employees/EmployeeFilters';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { EmployeesApi } from '@/services/api/employees.api';

export default function Employees() {
  const { user } = useContext(Context);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filters, setFilters] = useState({});

  // Временно отключаем проверку прав для тестирования
  // if (!user.isAdmin) return <AccessDenied />;

  // Загрузка данных
  const loadData = async () => {
    setLoading(true);
    try {
      const [employeesData, departmentsData, statsData] = await Promise.all([
        EmployeesApi.listAll(filters),
        EmployeesApi.getDepartments(),
        EmployeesApi.getStats()
      ]);
      
      setEmployees(employeesData);
      setDepartments(departmentsData);
      setStats(statsData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      alert('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  // Обработчики событий
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await EmployeesApi.delete(employeeId);
      await loadData();
      alert('Сотрудник удален');
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении сотрудника');
    }
  };

  const handleTogglePass = async (employeeId) => {
    try {
      await EmployeesApi.togglePassStatus(employeeId);
      await loadData();
    } catch (error) {
      console.error('Ошибка изменения статуса пропуска:', error);
      alert('Ошибка при изменении статуса пропуска');
    }
  };

  const handleExtendPass = async () => {
    await loadData();
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingEmployee(null);
    loadData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h2>Управление сотрудниками</h2>
          <p className="page-subtitle">
            Добавление, редактирование и управление сотрудниками предприятия
          </p>
        </div>
        <button className="btn btn--primary" onClick={handleAddEmployee}>
          + Добавить сотрудника
        </button>
      </div>

      {/* Статистика */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total || 0}</div>
          <div className="stat-label">Всего сотрудников</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active || 0}</div>
          <div className="stat-label">Активных</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activePasses || 0}</div>
          <div className="stat-label">Активных пропусков</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.blockedPasses || 0}</div>
          <div className="stat-label">Заблокированных</div>
        </div>
      </div>

      {/* Фильтры */}
      <EmployeeFilters 
        onFilterChange={handleFilterChange}
        departments={departments}
      />

      {/* Таблица сотрудников */}
      <EmployeeTable
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        onTogglePass={handleTogglePass}
        onExtendPass={handleExtendPass}
        loading={loading}
      />

      {/* Форма добавления/редактирования */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
