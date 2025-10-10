// src/components/reports/AccessLogsStats.jsx
export default function AccessLogsStats({ stats, loading = false }) {
  if (loading) {
    return (
      <div className="stats-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="stat-card">
            <div className="stat-number">-</div>
            <div className="stat-label">Загрузка...</div>
          </div>
        ))}
      </div>
    );
  }

  const formatPercentage = (value) => `${value}%`;

  return (
    <div className="stats-section">
      <h3>Статистика по журналу доступа</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total || 0}</div>
          <div className="stat-label">Всего событий</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.granted || 0}</div>
          <div className="stat-label">Разрешено</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.denied || 0}</div>
          <div className="stat-label">Отказано</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{formatPercentage(stats.successRate || 0)}</div>
          <div className="stat-label">Процент успеха</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.entryCount || 0}</div>
          <div className="stat-label">Входов</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.exitCount || 0}</div>
          <div className="stat-label">Выходов</div>
        </div>
      </div>

      {/* Статистика по КПП */}
      {stats.checkpointStats && Object.keys(stats.checkpointStats).length > 0 && (
        <div className="chart-section">
          <h4>События по КПП</h4>
          <div className="chart-container">
            {Object.entries(stats.checkpointStats).map(([checkpoint, count]) => (
              <div key={checkpoint} className="chart-bar">
                <div className="chart-bar-label">{checkpoint}</div>
                <div className="chart-bar-track">
                  <div 
                    className="chart-bar-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(stats.checkpointStats))) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="chart-bar-value">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Статистика по причинам отказа */}
      {stats.denialStats && Object.keys(stats.denialStats).length > 0 && (
        <div className="chart-section">
          <h4>Причины отказа</h4>
          <div className="denial-reasons">
            {Object.entries(stats.denialStats).map(([reason, count]) => (
              <div key={reason} className="denial-reason-item">
                <span className="denial-reason-name">{reason}</span>
                <span className="denial-reason-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Пиковые часы */}
      {stats.hourlyStats && Object.keys(stats.hourlyStats).length > 0 && (
        <div className="chart-section">
          <h4>Активность по часам</h4>
          <div className="hourly-chart">
            {Object.entries(stats.hourlyStats)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([hour, count]) => (
                <div key={hour} className="hourly-bar">
                  <div className="hourly-label">{hour}:00</div>
                  <div className="hourly-track">
                    <div 
                      className="hourly-fill"
                      style={{ 
                        height: `${(count / Math.max(...Object.values(stats.hourlyStats))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="hourly-value">{count}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
