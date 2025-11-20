import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PassesApi } from '@/services/api/passes.api';
import { EmployeesApi } from '@/services/api/employees.api';
import { AccessLogsApi } from '@/services/api/access-logs.api';

export default function AdminKpis() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pendingPasses: 0,
    totalPasses: 0,
    approvalRate: 0,
    totalEmployees: 0,
    activePasses: 0,
    todayEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [passStats, employeeStats, recentEvents] = await Promise.all([
          PassesApi.stats(),
          EmployeesApi.getStats(),
          AccessLogsApi.getRecentEvents(1)
        ]);

        // Фильтруем события за сегодня
        const today = new Date().toDateString();
        const todayEvents = recentEvents.filter(event => 
          new Date(event.timestamp).toDateString() === today
        ).length;

        setStats({
          pendingPasses: passStats.pending || 0,
          totalPasses: passStats.pending + passStats.approved + passStats.rejected,
          approvalRate: passStats.total > 0 ? Math.round((passStats.approved / passStats.total) * 100) : 0,
          totalEmployees: employeeStats.total || 0,
          activePasses: employeeStats.activePasses || 0,
          todayEvents: todayEvents
        });
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Обновляем статистику каждые 30 секунд
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="stat">
            <div className="stat-num">-</div>
            <div className="stat-label">Загрузка...</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid3">
      <button
        type="button"
        className={"stat stat--clickable" + (stats.pendingPasses > 0 ? " stat--highlight" : "")}
        onClick={() => navigate('/dashboard/admin/queue')}
        title="Перейти в очередь"
      >
        <div className="statIcon" aria-hidden>🕔</div>
        <div className="stat-num">{stats.pendingPasses}</div>
        <div className="stat-label">На рассмотрении</div>
        <div className="statHint">нажмите, чтобы перейти</div>
      </button>

      <button
        type="button"
        className="stat stat--clickable"
        onClick={() => navigate('/dashboard/admin/employees')}
        title="Список сотрудников"
      >
        <div className="statIcon" aria-hidden>👥</div>
        <div className="stat-num">{stats.totalEmployees}</div>
        <div className="stat-label">Сотрудников</div>
        <div className="statHint">открыть раздел</div>
      </button>

      <div className="stat">
        <div className="statIcon" aria-hidden>✅</div>
        <div className="stat-num">{stats.approvalRate}%</div>
        <div className="stat-label">Одобрено <span className="muted">(за период)</span></div>
      </div>

      <button
        type="button"
        className="stat stat--clickable"
        onClick={() => navigate('/dashboard/admin/employees?filter=activePasses')}
        title="Сотрудники с активными пропусками"
      >
        <div className="statIcon" aria-hidden>🎫</div>
        <div className="stat-num">{stats.activePasses}</div>
        <div className="stat-label">Активных пропусков</div>
        <div className="statHint">показать список</div>
      </button>

      <div className="stat">
        <div className="statIcon" aria-hidden>📅</div>
        <div className="stat-num">{stats.todayEvents}</div>
        <div className="stat-label">Событий <span className="muted">(сегодня)</span></div>
      </div>

      <button
        type="button"
        className="stat stat--clickable"
        onClick={() => navigate('/dashboard/admin/reports')}
        title="Журналы и отчёты"
      >
        <div className="statIcon" aria-hidden>📊</div>
        <div className="stat-num">{stats.totalPasses}</div>
        <div className="stat-label">Всего заявок <span className="muted">(за период)</span></div>
        <div className="statHint">перейти к журналам</div>
      </button>
    </div>
  );
}
