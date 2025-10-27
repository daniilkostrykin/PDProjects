import { useState, useEffect } from 'react';
import PassTypeSelect from '../fields/PassTypeSelect';
import DateField from '../fields/DateField';
import FullNameField from '../fields/FullNameField';
import ReasonField from '../fields/ReasonField';
import CarBrandField from '../fields/CarBrandField';
import CarModelField from '../fields/CarModelField';
import CarPlateField from '../fields/CarPlateField';
import { validatePassRequest } from '../../../../utils/validation';

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
  const isFormValid = !hasErrors && v.passType && v.fullName && v.date && v.reason && 
    (v.passType !== 'car' || (v.carBrand && v.carModel && v.carPlate));

  return (
    <form className="card" onSubmit={handleSubmit}>
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
  );
}
