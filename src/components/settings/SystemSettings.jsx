// src/components/settings/SystemSettings.jsx
import { useState } from 'react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // Настройки пропусков
    defaultPassValidityDays: 365,
    maxPassValidityDays: 730,
    requirePhotoForPass: true,
    autoBlockExpiredPasses: true,
    
    // Настройки уведомлений
    emailNotifications: true,
    smsNotifications: false,
    notificationEmail: 'admin@company.com',
    
    // Настройки безопасности
    maxFailedAttempts: 3,
    sessionTimeoutMinutes: 30,
    requirePasswordChange: false,
    passwordMinLength: 8,
    
    // Прочее
    // Интеграции и Резервные копии вынесены в отдельные вкладки
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Здесь будет вызов API для сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация API
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
      alert('Ошибка при сохранении настроек');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Настройки системы</h3>
      </div>

      {saved && (
        <div className="alert alert--success">
          ✅ Настройки успешно сохранены
        </div>
      )}

      <div className="settings-grid">
        {/* Настройки пропусков */}
      <div className="card" style={{ marginBottom: 16 }}>
          <div className="cardHeader"><div className="cardTitle">Настройки пропусков</div></div>
          <div className="cardBody">
          <div className="form-group">
            <label>Срок действия пропуска по умолчанию (дни)</label>
            <input
              type="number"
              value={settings.defaultPassValidityDays}
              onChange={(e) => handleChange('defaultPassValidityDays', parseInt(e.target.value))}
              className="input"
              min="1"
              max="3650"
              style={{ maxWidth: 480 }}
            />
          </div>
          <div className="form-group">
            <label>Максимальный срок действия пропуска (дни)</label>
            <input
              type="number"
              value={settings.maxPassValidityDays}
              onChange={(e) => handleChange('maxPassValidityDays', parseInt(e.target.value))}
              className="input"
              min="1"
              max="3650"
              style={{ maxWidth: 480 }}
            />
          </div>

       
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoBlockExpiredPasses}
                onChange={(e) => handleChange('autoBlockExpiredPasses', e.target.checked)}
              />
              Автоматически блокировать просроченные пропуска
            </label>
          </div>
          </div>
        </div>

        {/* Настройки уведомлений */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="cardHeader"><div className="cardTitle">Уведомления</div></div>
          <div className="cardBody">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              Email уведомления
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleChange('smsNotifications', e.target.checked)}
              />
              SMS уведомления
            </label>
          </div>
          
          <div className="form-group">
            <label>Email для уведомлений</label>
            <input
              type="email"
              value={settings.notificationEmail}
              onChange={(e) => handleChange('notificationEmail', e.target.value)}
              className="input"
              style={{ maxWidth: 480 }}
              disabled={!settings.emailNotifications}
            />
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>
              Уведомления отправляются на этот адрес. Поле доступно, когда включены Email-уведомления.
            </div>
          </div>
          </div>
        </div>

        {/* Настройки безопасности */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="cardHeader"><div className="cardTitle">Безопасность</div></div>
          <div className="cardBody">
          <div className="form-group">
            <label>Максимум неудачных попыток входа</label>
            <input
              type="number"
              value={settings.maxFailedAttempts}
              onChange={(e) => handleChange('maxFailedAttempts', parseInt(e.target.value))}
              className="input"
              min="1"
              max="10"
              style={{ maxWidth: 480 }}
            />
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>
              После превышения лимита учётная запись будет временно заблокирована.
            </div>
          </div>
          
          <div className="form-group">
            <label>Таймаут сессии (минуты)</label>
            <input
              type="number"
              value={settings.sessionTimeoutMinutes}
              onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
              className="input"
              min="5"
              max="480"
              style={{ maxWidth: 480 }}
            />
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>
              Пользователь будет автоматически выведен из системы после периода бездействия.
            </div>
          </div>
          
          <div className="form-group">
            <label>Минимальная длина пароля</label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
              className="input"
              min="6"
              max="32"
              style={{ maxWidth: 480 }}
            />
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.requirePasswordChange}
                onChange={(e) => handleChange('requirePasswordChange', e.target.checked)}
              />
              Требовать смену пароля при первом входе
            </label>
          </div>
          </div>
        </div>

        {/* Интеграции и Резервное копирование показаны на отдельных вкладках */}
      </div>

      {/* Липкий футер с действиями (внизу) */}
      <div className="card" style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
        padding: '8px 0',
        marginTop: 12,
        background: 'transparent',
        boxShadow: 'none',
        border: 'none'
      }}>
        <button 
          type="button"
          className="btn btn--secondary"
          onClick={() => window.location.reload()}
          disabled={loading}
        >
          Отменить
        </button>
        <button 
          className="btn btn--primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}
