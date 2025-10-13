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
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px',
        fontFamily: '"Montserrat", sans-serif'
      }}>Статистика по журналу доступа</h3>
      
      <div className="grid4" style={{marginBottom: '24px'}}>
        <div className="stat">
          <div className="statIcon" aria-hidden>📋</div>
          <div className="stat-num">{stats.total || 0}</div>
          <div className="stat-label">Всего событий</div>
        </div>
        
        <div className="stat">
          <div className="statIcon" aria-hidden>✅</div>
          <div className="stat-num">{stats.granted || 0}</div>
          <div className="stat-label">Разрешено</div>
        </div>
        
        <div className="stat">
          <div className="statIcon" aria-hidden>❌</div>
          <div className="stat-num">{stats.denied || 0}</div>
          <div className="stat-label">Отказано</div>
        </div>
        
        <div className="stat">
          <div className="statIcon" aria-hidden>📊</div>
          <div className="stat-num">{formatPercentage(stats.successRate || 0)}</div>
          <div className="stat-label">Процент успеха</div>
        </div>
      </div>

      {/* Статистика по КПП */}
      {stats.checkpointStats && Object.keys(stats.checkpointStats).length > 0 && (
        <div className="chart-section" style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: '"Montserrat", sans-serif'
          }}>События по КПП</h4>
          <div className="chart-container" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {Object.entries(stats.checkpointStats).map(([checkpoint, count]) => (
              <div key={checkpoint} className="chart-bar" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div className="chart-bar-label" style={{
                  minWidth: '120px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  fontFamily: '"Montserrat", sans-serif'
                }}>{checkpoint}</div>
                <div className="chart-bar-track" style={{
                  flex: 1,
                  height: '20px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div 
                    className="chart-bar-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(stats.checkpointStats))) * 100}%`,
                      height: '100%',
                      backgroundColor: '#3b82f6',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>
                <div className="chart-bar-value" style={{
                  minWidth: '40px',
                  textAlign: 'right',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  fontFamily: '"Montserrat", sans-serif'
                }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Статистика по причинам отказа */}
      {stats.denialStats && Object.keys(stats.denialStats).length > 0 && (
        <div className="chart-section" style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: '"Montserrat", sans-serif'
          }}>Причины отказа</h4>
          <div className="denial-reasons" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {Object.entries(stats.denialStats).map(([reason, count]) => {
              // Переводим системные названия на человеческий язык
              const reasonLabels = {
                'PASS_NOT_FOUND': 'Пропуск не найден',
                'PASS_EXPIRED': 'Пропуск просрочен',
                'PASS_BLOCKED': 'Пропуск заблокирован',
                'INVALID_TIME': 'Неверное время доступа',
                'ACCESS_DENIED': 'Доступ запрещён',
                'UNKNOWN_ERROR': 'Неизвестная ошибка'
              };
              
              const displayReason = reasonLabels[reason] || reason;
              
              return (
                <div key={reason} className="denial-reason-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '6px',
                  border: '1px solid #fecaca'
                }}>
                  <span className="denial-reason-name" style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#dc2626',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>{displayReason}</span>
                  <span className="denial-reason-count" style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#dc2626',
                    backgroundColor: '#fee2e2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Пиковые часы */}
      {stats.hourlyStats && Object.keys(stats.hourlyStats).length > 0 && (
        <div className="chart-section" style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: '"Montserrat", sans-serif'
          }}>Активность по часам</h4>
          <div className="hourly-chart" style={{
            display: 'flex',
            alignItems: 'end',
            gap: '4px',
            height: '200px',
            padding: '16px 0',
            borderBottom: '1px solid #e5e7eb',
            borderLeft: '1px solid #e5e7eb'
          }}>
            {Object.entries(stats.hourlyStats)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([hour, count]) => {
                const maxCount = Math.max(...Object.values(stats.hourlyStats));
                const height = (count / maxCount) * 160; // 160px максимальная высота
                const isPeak = count === maxCount;
                const isNight = parseInt(hour) >= 22 || parseInt(hour) <= 6;
                
                return (
                  <div key={hour} className="hourly-bar" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    minWidth: '30px'
                  }}>
                    <div className="hourly-label" style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '8px',
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: '500'
                    }}>{hour}:00</div>
                    <div className="hourly-track" style={{
                      width: '100%',
                      height: '160px',
                      display: 'flex',
                      alignItems: 'end',
                      position: 'relative'
                    }}>
                      <div 
                        className="hourly-fill"
                        style={{ 
                          width: '100%',
                          height: `${height}px`,
                          backgroundColor: isNight ? '#f59e0b' : (isPeak ? '#10b981' : '#3b82f6'),
                          borderRadius: '2px 2px 0 0',
                          transition: 'all 0.3s ease',
                          position: 'relative'
                        }}
                        title={`${hour}:00 - ${count} событий`}
                      ></div>
                    </div>
                    <div className="hourly-value" style={{
                      fontSize: '11px',
                      color: '#374151',
                      marginTop: '4px',
                      fontWeight: '600',
                      fontFamily: '"Montserrat", sans-serif'
                    }}>{count}</div>
                  </div>
                );
              })}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            fontSize: '12px',
            color: '#6b7280',
            fontFamily: '"Montserrat", sans-serif'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px'}}></div>
              <span>Обычная активность</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px'}}></div>
              <span>Пиковая активность</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '2px'}}></div>
              <span>Ночная активность</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
