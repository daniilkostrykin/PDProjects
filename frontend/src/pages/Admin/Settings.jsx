import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';
import SystemSettings from '@/components/settings/SystemSettings';
// Пользователей переводим на отдельную страницу
import { ADMIN_EMPLOYEES } from '@/utils/consts';

export default function Settings() {
  const { user } = useContext(Context);
  const [activeTab, setActiveTab] = useState('system');
  const navigate = useNavigate();

  // Временно отключаем проверку прав для тестирования
  // if (!user.isAdmin) return <AccessDenied />;

  const tabs = [
    { id: 'system', label: 'Настройки системы', component: SystemSettings },
    { id: 'integrations', label: 'Интеграции', component: IntegrationsSettings },
    { id: 'backup', label: 'Резервное копирование', component: BackupSettings }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SystemSettings;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h2>Настройки системы</h2>
          <p className="page-subtitle">
            Управление параметрами системы, пользователями и интеграциями
          </p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-tabs" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 16
        }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab(tab.id) }}
              className="stat"
              style={{
                cursor: 'pointer',
                borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border)',
                boxShadow: activeTab === tab.id ? '0 0 0 2px rgba(59,130,246,0.15)' : 'var(--shadow)'
              }}
              title={tab.label}
            >
              <div className="statIcon" aria-hidden>
                {tab.id === 'system' ? '⚙️' : tab.id === 'integrations' ? '🔗' : '📦'}
              </div>
              <div className="stat-num" style={{ fontSize: 16, fontWeight: 700 }}>{tab.label}</div>
            </div>
          ))}
        </div>

        <div className="settings-content">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

// Компонент настроек интеграций
function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'КПП Турникет №1',
      type: 'CHECKPOINT',
      status: 'CONNECTED',
      lastSync: '2024-12-20T10:30:00Z',
      endpoint: 'http://192.168.1.100:8080/api'
    },
    {
      id: 2,
      name: 'Система распознавания номеров',
      type: 'LPR',
      status: 'DISCONNECTED',
      lastSync: '2024-12-19T15:20:00Z',
      endpoint: 'http://192.168.1.101:8080/api'
    },
    {
      id: 3,
      name: 'Email сервер',
      type: 'EMAIL',
      status: 'CONNECTED',
      lastSync: '2024-12-20T10:25:00Z',
      endpoint: 'smtp.company.com:587'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const getSyncColor = (isoString) => {
    try {
      const last = new Date(isoString).getTime();
      const now = Date.now();
      const diffMs = now - last;
      const hour = 60 * 60 * 1000;
      const day = 24 * hour;
      const week = 7 * day;
      if (diffMs <= hour) return '#16a34a';          // зелёный
      if (diffMs > week) return '#dc2626';           // красный
      if (diffMs > day) return '#f59e0b';            // жёлтый
      return 'inherit';
    } catch (_) {
      return 'inherit';
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'CONNECTED': { text: 'Подключен', class: 'success' },
      'DISCONNECTED': { text: 'Отключен', class: 'danger' },
      'ERROR': { text: 'Ошибка', class: 'warning' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'default' };
    return <span className={`badge badge--${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const getTypeLabel = (type) => {
    const typeMap = {
      'CHECKPOINT': 'КПП',
      'LPR': 'Распознавание номеров',
      'EMAIL': 'Email',
      'SMS': 'SMS',
      'WEBHOOK': 'Webhook'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Интеграции</h3>
        <button className="btn btn--primary" onClick={() => setShowAddForm(true)}>
          + Добавить интеграцию
        </button>
      </div>

      <div className="integrations-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: 16
      }}>
        {integrations.map(integration => (
          <div
            key={integration.id}
            className="card integration-card"
            style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}
          >
            <div className="integration-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>{integration.name}</h4>
              {getStatusBadge(integration.status)}
            </div>
            <div className="integration-details" style={{ display: 'grid', gap: 8 }}>
              <div className="detail-item" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, alignItems: 'center' }}>
                <label style={{ textAlign: 'right', whiteSpace: 'nowrap', color: 'var(--muted)' }}>Тип:</label>
                <span style={{ textAlign: 'left' }}>{getTypeLabel(integration.type)}</span>
              </div>
              <div className="detail-item" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, alignItems: 'center' }}>
                <label style={{ textAlign: 'right', whiteSpace: 'nowrap', color: 'var(--muted)' }}>Endpoint:</label>
                <span className="endpoint" style={{ textAlign: 'left' }}><code>{integration.endpoint}</code></span>
              </div>
              <div className="detail-item" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, alignItems: 'center' }}>
                <label style={{ textAlign: 'right', whiteSpace: 'nowrap', color: 'var(--muted)' }}>Последняя синхронизация:</label>
                <span style={{ color: getSyncColor(integration.lastSync), fontWeight: 600, textAlign: 'left' }}>
                  {formatDateTime(integration.lastSync)}
                </span>
              </div>
            </div>
            <div className="integration-actions" style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button className="btn btn--sm btn--secondary" title="Проверить подключение">Тест</button>
              <button className="btn btn--sm btn--secondary" title="Редактировать">✏️ Редактировать</button>
              <button
                className="btn btn--sm"
                title="Удалить интеграцию"
                onClick={() => setConfirmDelete(integration)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--danger)',
                  color: 'var(--danger)'
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Удалить интеграцию</h3>
              <button className="btn btn--ghost" onClick={() => setConfirmDelete(null)}>×</button>
            </div>
            <div className="cardBody" style={{ padding: 16 }}>
              <p style={{ margin: 0 }}>
                Вы уверены, что хотите удалить интеграцию "{confirmDelete.name}"? Это действие нельзя будет отменить.
              </p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '0 16px 16px' }}>
              <button className="btn btn--secondary" onClick={() => setConfirmDelete(null)}>Отмена</button>
              <button
                className="btn btn--danger"
                onClick={() => {
                  setIntegrations(prev => prev.filter(i => i.id !== confirmDelete.id));
                  setConfirmDelete(null);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <IntegrationForm
          onSave={() => setShowAddForm(false)}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

// Компонент настроек резервного копирования
function BackupSettings() {
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: 'backup_2024_12_20_10_00.sql',
      size: '2.5 MB',
      createdAt: '2024-12-20T10:00:00Z',
      type: 'AUTO'
    },
    {
      id: 2,
      name: 'backup_2024_12_19_10_00.sql',
      size: '2.4 MB',
      createdAt: '2024-12-19T10:00:00Z',
      type: 'AUTO'
    },
    {
      id: 3,
      name: 'backup_manual_2024_12_18.sql',
      size: '2.3 MB',
      createdAt: '2024-12-18T15:30:00Z',
      type: 'MANUAL'
    }
  ]);

  const [creatingBackup, setCreatingBackup] = useState(false);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const handleCreateBackup = async () => {
    setCreatingBackup(true);
    try {
      // Здесь будет вызов API для создания резервной копии
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Резервная копия создана успешно');
    } catch (error) {
      console.error('Ошибка создания резервной копии:', error);
      alert('Ошибка при создании резервной копии');
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleDownloadBackup = (backup) => {
    // Здесь будет логика скачивания файла
    alert(`Скачивание файла: ${backup.name}`);
  };

  const handleDeleteBackup = (backupId) => {
    if (confirm('Вы уверены, что хотите удалить эту резервную копию?')) {
      setBackups(backups.filter(backup => backup.id !== backupId));
      alert('Резервная копия удалена');
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Резервное копирование</h3>
        <button 
          className="btn btn--primary" 
          onClick={handleCreateBackup}
          disabled={creatingBackup}
        >
          {creatingBackup ? 'Создание...' : '📦 Создать резервную копию'}
        </button>
      </div>

      <div className="backup-info">
        <div className="info-card">
          <h4>Статус резервного копирования</h4>
          <div className="status-indicators">
            <div className="status-item">
              <span className="status-label">Автоматическое копирование:</span>
              <span className="badge badge--success">Включено</span>
            </div>
            <div className="status-item">
              <span className="status-label">Частота:</span>
              <span>Ежедневно в 10:00</span>
            </div>
            <div className="status-item">
              <span className="status-label">Следующее копирование:</span>
              <span>Завтра в 10:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Имя файла</th>
                <th>Размер</th>
                <th>Тип</th>
                <th>Создан</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {backups.map(backup => (
                <tr key={backup.id}>
                  <td>
                    <code className="backup-filename">{backup.name}</code>
                  </td>
                  <td>{backup.size}</td>
                  <td>
                    <span className={`badge badge--${backup.type === 'AUTO' ? 'info' : 'warning'}`}>
                      {backup.type === 'AUTO' ? 'Автоматическое' : 'Ручное'}
                    </span>
                  </td>
                  <td>{formatDateTime(backup.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn--sm btn--primary"
                        onClick={() => handleDownloadBackup(backup)}
                        title="Скачать"
                      >
                        📥
                      </button>
                      <button 
                        className="btn btn--sm btn--danger"
                        onClick={() => handleDeleteBackup(backup.id)}
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Форма добавления интеграции
function IntegrationForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'CHECKPOINT',
    endpoint: '',
    username: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Здесь будет вызов API для добавления интеграции
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave();
    } catch (error) {
      console.error('Ошибка добавления интеграции:', error);
      alert('Ошибка при добавлении интеграции');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Добавить интеграцию</h3>
          <button className="btn btn--ghost" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Название *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Тип интеграции *</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="form-select"
            >
              <option value="CHECKPOINT">КПП</option>
              <option value="LPR">Распознавание номеров</option>
              <option value="EMAIL">Email</option>
              <option value="SMS">SMS</option>
              <option value="WEBHOOK">Webhook</option>
            </select>
          </div>

          <div className="form-group">
            <label>Endpoint *</label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              required
              className="form-input"
              placeholder="http://192.168.1.100:8080/api"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Имя пользователя</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
