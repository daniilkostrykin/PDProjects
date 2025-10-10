// src/components/settings/UserManagement.jsx
import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin@local',
      email: 'admin@local',
      fullName: 'Администратор системы',
      roles: ['ADMIN', 'USER'],
      status: 'ACTIVE',
      lastLogin: '2024-12-20T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 2,
      username: 'security@company.com',
      email: 'security@company.com',
      fullName: 'Специалист СБ',
      roles: ['USER'],
      status: 'ACTIVE',
      lastLogin: '2024-12-20T09:15:00Z',
      createdAt: '2024-02-15T14:20:00Z'
    },
    {
      id: 3,
      username: 'hr@company.com',
      email: 'hr@company.com',
      fullName: 'Менеджер HR',
      roles: ['USER'],
      status: 'INACTIVE',
      lastLogin: '2024-12-18T16:45:00Z',
      createdAt: '2024-03-10T11:30:00Z'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleDeleteUser = async (userId) => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setLoading(true);
      try {
        // Здесь будет вызов API для удаления пользователя
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(users.filter(user => user.id !== userId));
        alert('Пользователь удален');
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка при удалении пользователя');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStatus = async (userId) => {
    setLoading(true);
    try {
      // Здесь будет вызов API для изменения статуса
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : user
      ));
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
      alert('Ошибка при изменении статуса пользователя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <h3>Управление пользователями</h3>
        <button className="btn btn--primary" onClick={handleAddUser}>
          + Добавить пользователя
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Роли</th>
                <th>Статус</th>
                <th>Последний вход</th>
                <th>Создан</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-name">{user.fullName}</div>
                      <div className="user-username">@{user.username}</div>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="link">
                      {user.email}
                    </a>
                  </td>
                  <td>
                    <div className="roles">
                      {user.roles.map(role => (
                        <span key={role} className="role-badge">
                          {role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge--${user.status === 'ACTIVE' ? 'success' : 'danger'}`}>
                      {user.status === 'ACTIVE' ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td>{formatDateTime(user.lastLogin)}</td>
                  <td>{formatDateTime(user.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn--sm btn--primary"
                        onClick={() => handleEditUser(user)}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      
                      <button 
                        className={`btn btn--sm ${user.status === 'ACTIVE' ? 'btn--warning' : 'btn--success'}`}
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === 'ACTIVE' ? 'Деактивировать' : 'Активировать'}
                        disabled={loading}
                      >
                        {user.status === 'ACTIVE' ? '🔒' : '🔓'}
                      </button>
                      
                      <button 
                        className="btn btn--sm btn--danger"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Удалить"
                        disabled={loading || user.username === 'admin@local'}
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

      {/* Форма добавления/редактирования пользователя */}
      {showAddForm && (
        <UserForm
          user={editingUser}
          onSave={() => {
            setShowAddForm(false);
            setEditingUser(null);
            // Здесь будет перезагрузка данных
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

// Компонент формы пользователя
function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    roles: ['USER'],
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        password: '',
        roles: user.roles || ['USER'],
        status: user.status || 'ACTIVE'
      });
    }
  }, [user]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, role]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.filter(r => r !== role)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Здесь будет вызов API для сохранения пользователя
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении пользователя');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{user ? 'Редактировать пользователя' : 'Добавить пользователя'}</h3>
          <button className="btn btn--ghost" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Имя пользователя *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Полное имя *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>{user ? 'Новый пароль' : 'Пароль *'}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required={!user}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Роли</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.roles.includes('USER')}
                  onChange={(e) => handleRoleChange('USER', e.target.checked)}
                />
                Пользователь
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.roles.includes('ADMIN')}
                  onChange={(e) => handleRoleChange('ADMIN', e.target.checked)}
                />
                Администратор
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Статус</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="form-select"
            >
              <option value="ACTIVE">Активен</option>
              <option value="INACTIVE">Неактивен</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {user ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
