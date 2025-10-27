import { useState, useEffect } from 'react';
import PassTypeSelect from '../fields/PassTypeSelect';
import DateField from '../fields/DateField';
import FullNameField from '../fields/FullNameField';
import ReasonField from '../fields/ReasonField';
import CarBrandField from '../fields/CarBrandField';
import CarModelField from '../fields/CarModelField';
import CarPlateField from '../fields/CarPlateField';
import ValidityPeriodField from '../fields/ValidityPeriodField';
import { validatePassRequest } from '../../../../utils/validation';
import './mobile.css';

// Мобильные компоненты
const MobilePassTypeSelector = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ 
        display: 'block', 
        fontSize: 16, 
        fontWeight: 600, 
        color: '#111827', 
        marginBottom: 12 
      }}>
        Тип пропуска
      </label>
      <div style={{ 
        display: 'flex', 
        gap: 8,
        background: '#f3f4f6',
        padding: 4,
        borderRadius: 12
      }}>
        <button
          type="button"
          onClick={() => onChange('psh')}
          style={{
            flex: 1,
            padding: '16px 20px',
            border: 'none',
            borderRadius: 8,
            background: value === 'psh' ? '#ffffff' : 'transparent',
            color: value === 'psh' ? '#111827' : '#6b7280',
            fontSize: 16,
            fontWeight: value === 'psh' ? 600 : 500,
            cursor: 'pointer',
            boxShadow: value === 'psh' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          🚶 Пеший
        </button>
        <button
          type="button"
          onClick={() => onChange('car')}
          style={{
            flex: 1,
            padding: '16px 20px',
            border: 'none',
            borderRadius: 8,
            background: value === 'car' ? '#ffffff' : 'transparent',
            color: value === 'car' ? '#111827' : '#6b7280',
            fontSize: 16,
            fontWeight: value === 'car' ? 600 : 500,
            cursor: 'pointer',
            boxShadow: value === 'car' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          🚗 Авто
        </button>
      </div>
    </div>
  );
};

const MobileDatePeriodBlock = ({ date, validityPeriod, onDateChange, onPeriodChange }) => {
  const validityOptions = [
    { label: "1 час", value: "1h", icon: "⏰" },
    { label: "2 часа", value: "2h", icon: "⏰" },
    { label: "4 часа", value: "4h", icon: "⏰" },
    { label: "8 часов", value: "8h", icon: "⏰" },
    { label: "1 день", value: "1d", icon: "📅" },
    { label: "3 дня", value: "3d", icon: "📅" },
    { label: "1 неделя", value: "1w", icon: "📅" },
    { label: "1 месяц", value: "1m", icon: "📅" },
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ 
        fontSize: 18, 
        fontWeight: 600, 
        color: '#111827', 
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        📅 Период визита
      </h3>
      
      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          fontSize: 14, 
          fontWeight: 500, 
          color: '#374151', 
          marginBottom: 8 
        }}>
          Дата визита
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="mobile-input"
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: 12,
            fontSize: 16,
            background: '#ffffff',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

      <div>
        <label style={{ 
          display: 'block', 
          fontSize: 14, 
          fontWeight: 500, 
          color: '#374151', 
          marginBottom: 12 
        }}>
          Срок действия
        </label>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 8 
        }}>
          {validityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onPeriodChange(option.value)}
              style={{
                padding: '12px 16px',
                border: validityPeriod === option.value ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                borderRadius: 12,
                background: validityPeriod === option.value ? '#eff6ff' : '#ffffff',
                color: validityPeriod === option.value ? '#1e40af' : '#374151',
                fontSize: 14,
                fontWeight: validityPeriod === option.value ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileCarFields = ({ carBrand, carModel, carPlate, onBrandChange, onModelChange, onPlateChange, isVisible }) => {
  return (
    <div style={{
      overflow: 'hidden',
      maxHeight: isVisible ? '500px' : '0',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease',
      marginBottom: 24
    }}>
      <div style={{ padding: '0 4px' }}>
        <h3 style={{ 
          fontSize: 18, 
          fontWeight: 600, 
          color: '#111827', 
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          🚗 Данные автомобиля
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: 8 
            }}>
              Марка автомобиля
            </label>
            <input
              type="text"
              value={carBrand}
              onChange={(e) => onBrandChange(e.target.value)}
              placeholder="Toyota, BMW, Mercedes..."
              className="mobile-input"
              style={{
                width: '100%',
                padding: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                background: '#ffffff',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: 8 
            }}>
              Модель автомобиля
            </label>
            <input
              type="text"
              value={carModel}
              onChange={(e) => onModelChange(e.target.value)}
              placeholder="Camry, X5, E-Class..."
              className="mobile-input"
              style={{
                width: '100%',
                padding: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                background: '#ffffff',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: 8 
            }}>
              Госномер
            </label>
            <input
              type="text"
              value={carPlate}
              onChange={(e) => onPlateChange(e.target.value)}
              placeholder="А123БВ777"
              className="mobile-input"
              style={{
                width: '100%',
                padding: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                background: '#ffffff',
                fontFamily: 'monospace',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileReasonField = ({ value, onChange }) => {
  const quickReasons = [
    "Деловая встреча",
    "Техническое обслуживание", 
    "Поставка материалов",
    "Консультация",
    "Служебная необходимость"
  ];

  const handleQuickReason = (reason) => {
    onChange(reason);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ 
        display: 'block', 
        fontSize: 16, 
        fontWeight: 600, 
        color: '#111827', 
        marginBottom: 12 
      }}>
        Основание для пропуска
      </label>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Опишите цель визита..."
        rows={4}
        className="mobile-input"
        style={{
          width: '100%',
          padding: '16px',
          border: '2px solid #e5e7eb',
          borderRadius: 12,
          fontSize: 16,
          background: '#ffffff',
          resize: 'vertical',
          minHeight: '100px',
          transition: 'border-color 0.2s ease',
          fontFamily: 'inherit'
        }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
      />
      
      <div style={{ marginTop: 12 }}>
        <div style={{ 
          fontSize: 14, 
          fontWeight: 500, 
          color: '#6b7280', 
          marginBottom: 8 
        }}>
          Быстрый выбор:
        </div>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 8 
        }}>
          {quickReasons.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => handleQuickReason(reason)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: 20,
                background: '#ffffff',
                color: '#374151',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              {reason}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function RequestForm({ value, onChange, onSubmit, submitting }) {
  const [formErrors, setFormErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Сбрасываем ошибки при сбросе формы
  useEffect(() => {
    const isFormEmpty = !value.passType && !value.fullName && !value.date && !value.reason && 
                       !value.carBrand && !value.carModel && !value.carPlate;
    
    if (isFormEmpty) {
      setFormErrors({});
      setShowErrors(false);
    }
  }, [value]);

  const v = value;
  const set = (k) => (val) => {
    onChange({ ...v, [k]: val });
    // Очищаем ошибку при изменении поля
    if (formErrors[k]) {
      setFormErrors(prev => ({ ...prev, [k]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидируем всю форму
    const validation = validatePassRequest(v);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setShowErrors(true);
      return;
    }

    // Если валидация прошла успешно, отправляем форму
    try {
      await onSubmit?.();
      // Сбрасываем ошибки и состояние полей только после успешной отправки
      setFormErrors({});
      setShowErrors(false);
      setResetTrigger(prev => prev + 1);
    } catch (error) {
      // В случае ошибки отправки не сбрасываем состояние
      console.error('Ошибка отправки формы:', error);
    }
  };

  const hasErrors = Object.values(formErrors).some(error => error);
  const isFormValid = !hasErrors && v.passType && v.fullName && v.date && v.reason && v.validityPeriod &&
    (v.passType !== 'car' || (v.carBrand && v.carModel && v.carPlate));

  return (
    <>
      {/* Десктопная версия */}
      <form className="card" onSubmit={handleSubmit} style={{ display: 'block' }}>
        <div className="cardHeader">
          <h2 className="cardTitle">🎫 Оформление пропуска</h2>
          {showErrors && hasErrors && (
            <div className="form-summary-error">
              <span className="form-summary-error__icon">⚠️</span>
              <span>Исправьте ошибки в форме</span>
            </div>
          )}
        </div>

        <div className="cardBody">
          <div className="grid2">
            <PassTypeSelect value={v.passType} onChange={set('passType')} resetTrigger={resetTrigger} />
            <DateField value={v.date} onChange={set('date')} resetTrigger={resetTrigger} />

            <FullNameField value={v.fullName} onChange={set('fullName')} resetTrigger={resetTrigger} />
            <ValidityPeriodField value={v.validityPeriod} onChange={set('validityPeriod')} resetTrigger={resetTrigger} />

            <ReasonField value={v.reason} onChange={set('reason')} resetTrigger={resetTrigger} />

            {v.passType === 'car' && (
              <>
                <CarBrandField value={v.carBrand} onChange={set('carBrand')} resetTrigger={resetTrigger} />
                <CarModelField value={v.carModel} onChange={set('carModel')} resetTrigger={resetTrigger} />
                <CarPlateField value={v.carPlate} onChange={set('carPlate')} resetTrigger={resetTrigger} />
              </>
            )}
          </div>

          <div className="form-actions">
            <button 
              className="btn btn--primary" 
              type="submit" 
              disabled={submitting || !isFormValid}
            >
              {submitting ? '⏳ Отправка...' : '✅ Подать заявку'}
            </button>
            
            <button 
              className="btn btn--ghost" 
              type="button"
              onClick={() => {
                onChange({
                  passType: '',
                  date: '',
                  fullName: '',
                  reason: '',
                  validityPeriod: '',
                  carBrand: '',
                  carModel: '',
                  carPlate: ''
                });
                setFormErrors({});
                setShowErrors(false);
                setResetTrigger(prev => prev + 1);
              }}
            >
              🔄 Сбросить
            </button>
          </div>
        </div>
      </form>

      {/* Мобильная версия */}
      <div className="mobile-form-container" style={{ display: 'none' }}>
        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          margin: '0 auto',
          maxWidth: '100%'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h2 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: '#111827',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}>
              🎫 Оформление пропуска
            </h2>
            {showErrors && hasErrors && (
              <div style={{
                marginTop: 12,
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 8,
                color: '#dc2626',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span>⚠️</span>
                <span>Исправьте ошибки в форме</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Тип пропуска */}
            <MobilePassTypeSelector value={v.passType} onChange={set('passType')} />

            {/* ФИО */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ 
                display: 'block', 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#111827', 
                marginBottom: 12 
              }}>
                ФИО *
              </label>
              <input
                type="text"
                value={v.fullName}
                onChange={(e) => set('fullName')(e.target.value)}
                placeholder="Введите ваше полное имя"
                className="mobile-input"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: 12,
                  fontSize: 16,
                  background: '#ffffff',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Период визита */}
            <MobileDatePeriodBlock 
              date={v.date} 
              validityPeriod={v.validityPeriod}
              onDateChange={set('date')}
              onPeriodChange={set('validityPeriod')}
            />

            {/* Основание */}
            <MobileReasonField value={v.reason} onChange={set('reason')} />

            {/* Автомобильные поля с анимацией */}
            <div className={`mobile-car-fields ${v.passType === 'car' ? 'visible' : 'hidden'}`}>
              <MobileCarFields
                carBrand={v.carBrand}
                carModel={v.carModel}
                carPlate={v.carPlate}
                onBrandChange={set('carBrand')}
                onModelChange={set('carModel')}
                onPlateChange={set('carPlate')}
                isVisible={v.passType === 'car'}
              />
            </div>
          </div>

          {/* Кнопки действий */}
          <div style={{ 
            marginTop: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <button 
              type="submit" 
              disabled={submitting || !isFormValid}
              className="mobile-button"
              style={{
                width: '100%',
                padding: '18px 24px',
                background: isFormValid ? '#3b82f6' : '#9ca3af',
                color: '#ffffff',
                border: 'none',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 600,
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              {submitting ? '⏳ Отправка...' : '✅ Подать заявку'}
            </button>
            
            <button 
              type="button"
              className="mobile-button"
              onClick={() => {
                onChange({
                  passType: '',
                  date: '',
                  fullName: '',
                  reason: '',
                  validityPeriod: '',
                  carBrand: '',
                  carModel: '',
                  carPlate: ''
                });
                setFormErrors({});
                setShowErrors(false);
                setResetTrigger(prev => prev + 1);
              }}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'transparent',
                color: '#6b7280',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              🔄 Сбросить форму
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
