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
    
    // Настройки интеграций
    enableCheckpointIntegration: true,
    checkpointApiUrl: 'http://localhost:8080/api/checkpoints',
    enableLprIntegration: false,
    lprApiUrl: '',
    
    // Настройки резервного копирования
    autoBackupEnabled: true,
    backupFrequency: 'daily',
    backupRetentionDays: 30
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
        <button 
          className="btn btn--primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>

      {saved && (
        <div className="alert alert--success">
          ✅ Настройки успешно сохранены
        </div>
      )}

      <div className="settings-grid">
        {/* Настройки пропусков */}
        <div className="settings-group">
          <h4>Настройки пропусков</h4>
          <div className="form-group">
            <label>Срок действия пропуска по умолчанию (дни)</label>
            <input
              type="number"
              value={settings.defaultPassValidityDays}
              onChange={(e) => handleChange('defaultPassValidityDays', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="3650"
            />
          </div>
          
          <div className="form-group">
            <label>Максимальный срок действия пропуска (дни)</label>
            <input
              type="number"
              value={settings.maxPassValidityDays}
              onChange={(e) => handleChange('maxPassValidityDays', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="3650"
            />
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.requirePhotoForPass}
                onChange={(e) => handleChange('requirePhotoForPass', e.target.checked)}
              />
              Требовать фотографию для пропуска
            </label>
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

        {/* Настройки уведомлений */}
        <div className="settings-group">
          <h4>Уведомления</h4>
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
              className="form-input"
            />
          </div>
        </div>

        {/* Настройки безопасности */}
        <div className="settings-group">
          <h4>Безопасность</h4>
          <div className="form-group">
            <label>Максимум неудачных попыток входа</label>
            <input
              type="number"
              value={settings.maxFailedAttempts}
              onChange={(e) => handleChange('maxFailedAttempts', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="10"
            />
          </div>
          
          <div className="form-group">
            <label>Таймаут сессии (минуты)</label>
            <input
              type="number"
              value={settings.sessionTimeoutMinutes}
              onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
              className="form-input"
              min="5"
              max="480"
            />
          </div>
          
          <div className="form-group">
            <label>Минимальная длина пароля</label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
              className="form-input"
              min="6"
              max="32"
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

        {/* Настройки интеграций */}
        <div className="settings-group">
          <h4>Интеграции</h4>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.enableCheckpointIntegration}
                onChange={(e) => handleChange('enableCheckpointIntegration', e.target.checked)}
              />
              Интеграция с КПП
            </label>
          </div>
          
          <div className="form-group">
            <label>URL API КПП</label>
            <input
              type="url"
              value={settings.checkpointApiUrl}
              onChange={(e) => handleChange('checkpointApiUrl', e.target.value)}
              className="form-input"
              placeholder="http://localhost:8080/api/checkpoints"
            />
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.enableLprIntegration}
                onChange={(e) => handleChange('enableLprIntegration', e.target.checked)}
              />
              Интеграция с системой распознавания номеров (LPR)
            </label>
          </div>
          
          <div className="form-group">
            <label>URL API LPR</label>
            <input
              type="url"
              value={settings.lprApiUrl}
              onChange={(e) => handleChange('lprApiUrl', e.target.value)}
              className="form-input"
              placeholder="http://localhost:8080/api/lpr"
              disabled={!settings.enableLprIntegration}
            />
          </div>
        </div>

        {/* Настройки резервного копирования */}
        <div className="settings-group">
          <h4>Резервное копирование</h4>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoBackupEnabled}
                onChange={(e) => handleChange('autoBackupEnabled', e.target.checked)}
              />
              Автоматическое резервное копирование
            </label>
          </div>
          
          <div className="form-group">
            <label>Частота резервного копирования</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleChange('backupFrequency', e.target.value)}
              className="form-select"
              disabled={!settings.autoBackupEnabled}
            >
              <option value="hourly">Каждый час</option>
              <option value="daily">Ежедневно</option>
              <option value="weekly">Еженедельно</option>
              <option value="monthly">Ежемесячно</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Срок хранения резервных копий (дни)</label>
            <input
              type="number"
              value={settings.backupRetentionDays}
              onChange={(e) => handleChange('backupRetentionDays', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="365"
              disabled={!settings.autoBackupEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
