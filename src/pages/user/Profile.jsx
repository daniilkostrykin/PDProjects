import { useContext, useState } from 'react';
import { Context } from '@/context';
import { validators } from '@/utils/validation';

export default function Profile() {
  const { user } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.user?.fullName || '',
    position: user.user?.position || '',
    phone: user.user?.phone || '',
    email: user.user?.email || '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Валидация ФИО (обязательное поле)
    const fullNameError = validators.fullName(formData.fullName);
    if (fullNameError) {
      newErrors.fullName = fullNameError;
    } else if (!formData.fullName.trim()) {
      newErrors.fullName = "ФИО обязательно для заполнения";
    }
    
    // Валидация должности
    const positionError = validators.position(formData.position);
    if (positionError) {
      newErrors.position = positionError;
    }
    
    // Валидация телефона
    const phoneError = validators.phone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // TODO: Реализовать API для обновления профиля
      console.log('Сохранение профиля:', formData);
      alert('Профиль сохранен (демо)');
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error('Ошибка сохранения профиля:', error);
      alert('Ошибка сохранения профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.user?.fullName || '',
      position: user.user?.position || '',
      phone: user.user?.phone || '',
      email: user.user?.email || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h2>👤 Профиль пользователя</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                {loading ? '⏳ Сохранение...' : '💾 Сохранить'}
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 14
                }}
              >
                ❌ Отмена
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              ✏️ Редактировать
            </button>
          )}
        </div>
      </div>

      <div style={{ 
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        {/* Личные данные */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            color: '#111827', 
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            👤 Личные данные
          </h3>
          
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: 500, 
                color: '#374151', 
                marginBottom: 6 
              }}>
                ФИО *
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Введите ваше полное имя"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${errors.fullName ? '#dc2626' : '#d1d5db'}`,
                      borderRadius: 6,
                      fontSize: 14,
                      background: '#ffffff'
                    }}
                  />
                  {errors.fullName && (
                    <div style={{ 
                      color: '#dc2626', 
                      fontSize: 12, 
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      ⚠️ {errors.fullName}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ 
                  padding: '10px 12px', 
                  background: '#f9fafb', 
                  borderRadius: 6,
                  fontSize: 14,
                  color: formData.fullName ? '#111827' : '#6b7280'
                }}>
                  {formData.fullName || 'Не указано'}
                </div>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: 500, 
                color: '#374151', 
                marginBottom: 6 
              }}>
                Должность
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    placeholder="Введите вашу должность"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${errors.position ? '#dc2626' : '#d1d5db'}`,
                      borderRadius: 6,
                      fontSize: 14,
                      background: '#ffffff'
                    }}
                  />
                  {errors.position && (
                    <div style={{ 
                      color: '#dc2626', 
                      fontSize: 12, 
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      ⚠️ {errors.position}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ 
                  padding: '10px 12px', 
                  background: '#f9fafb', 
                  borderRadius: 6,
                  fontSize: 14,
                  color: formData.position ? '#111827' : '#6b7280'
                }}>
                  {formData.position || 'Не указано'}
                </div>
              )}
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 14, 
                fontWeight: 500, 
                color: '#374151', 
                marginBottom: 6 
              }}>
                Контактный телефон
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${errors.phone ? '#dc2626' : '#d1d5db'}`,
                      borderRadius: 6,
                      fontSize: 14,
                      background: '#ffffff'
                    }}
                  />
                  {errors.phone && (
                    <div style={{ 
                      color: '#dc2626', 
                      fontSize: 12, 
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      ⚠️ {errors.phone}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ 
                  padding: '10px 12px', 
                  background: '#f9fafb', 
                  borderRadius: 6,
                  fontSize: 14,
                  color: formData.phone ? '#111827' : '#6b7280'
                }}>
                  {formData.phone || 'Не указано'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Системная информация */}
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: 24 
        }}>
          <h3 style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            color: '#111827', 
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            ⚙️ Системная информация
          </h3>
          
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 16px',
              background: '#f9fafb',
              borderRadius: 8
            }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Email:</span>
              <span style={{ color: '#111827' }}>{user.user?.email || '—'}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 16px',
              background: '#f9fafb',
              borderRadius: 8
            }}>
              <span style={{ fontWeight: 500, color: '#374151' }}>Роли:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {user.user?.roles?.map(role => (
                  <span
                    key={role}
                    style={{
                      padding: '2px 8px',
                      background: role === 'ADMIN' ? '#dbeafe' : '#f3f4f6',
                      color: role === 'ADMIN' ? '#1e40af' : '#374151',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500
                    }}
                  >
                    {role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                  </span>
                )) || '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
