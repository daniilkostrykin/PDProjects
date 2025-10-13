import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';
import AccessLogsTable from '@/components/reports/AccessLogsTable';
import AccessLogsFilters from '@/components/reports/AccessLogsFilters';
import AccessLogsStats from '@/components/reports/AccessLogsStats';
import { AccessLogsApi } from '@/services/api/access-logs.api';

export default function Reports() {
  const { user } = useContext(Context);
  const [logs, setLogs] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({});

  // Временно отключаем проверку прав для тестирования
  // if (!user.isAdmin) return <AccessDenied />;

  // Загрузка данных
  const loadData = async () => {
    setLoading(true);
    try {
      const [logsData, checkpointsData, statsData] = await Promise.all([
        AccessLogsApi.getLogs(filters),
        AccessLogsApi.getCheckpoints(),
        AccessLogsApi.getStats(filters)
      ]);
      
      setLogs(logsData);
      setCheckpoints(checkpointsData);
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
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const csvData = await AccessLogsApi.exportToCSV(filters);
      
      // Создаем и скачиваем файл
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      
      const now = new Date();
      const filename = `access_logs_${now.toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', filename);
      
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Файл успешно экспортирован');
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      alert('Ошибка при экспорте данных');
    } finally {
      setExporting(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h2>Журнал доступа</h2>
          <p className="page-subtitle">
            Просмотр событий прохода через КПП, статистика и экспорт данных
          </p>
        </div>
       
      </div>

      {/* Статистика */}
      <AccessLogsStats stats={stats} loading={loading} />

      {/* Фильтры */}
      <AccessLogsFilters 
        onFilterChange={handleFilterChange}
        checkpoints={checkpoints}
      />

      {/* Таблица журнала */}
      <AccessLogsTable
        logs={logs}
        loading={loading}
      />

      {/* Информация о количестве записей */}
      {!loading && (
        <div className="table-info">
          <p className="muted">
            Показано {logs.length} записей
            {filters.dateFrom && filters.dateTo && (
              <span> за период с {new Date(filters.dateFrom).toLocaleDateString('ru-RU')} по {new Date(filters.dateTo).toLocaleDateString('ru-RU')}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
