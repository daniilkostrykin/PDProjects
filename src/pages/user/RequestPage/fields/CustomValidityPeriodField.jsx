import { useState } from 'react';
import FormField from '@/components/common/FormField';
import { validators } from '@/utils/validation';

const CUSTOM_PERIOD_OPTIONS = [
  { label: "Выберите срок", value: "" },
  { label: "1 час", value: "1h" },
  { label: "2 часа", value: "2h" },
  { label: "4 часа", value: "4h" },
  { label: "8 часов", value: "8h" },
  { label: "1 день", value: "1d" },
  { label: "3 дня", value: "3d" },
  { label: "1 неделя", value: "1w" },
  { label: "1 месяц", value: "1m" },
  { label: "Свой срок", value: "custom" },
];

export default function CustomValidityPeriodField({ value, onChange, resetTrigger }) {
  const [isCustom, setIsCustom] = useState(value && !CUSTOM_PERIOD_OPTIONS.some(opt => opt.value === value));
  const [customValue, setCustomValue] = useState(isCustom ? value : '');

  const handleSelectChange = (selectedValue) => {
    if (selectedValue === 'custom') {
      setIsCustom(true);
      onChange(customValue || '');
    } else {
      setIsCustom(false);
      setCustomValue('');
      onChange(selectedValue);
    }
  };

  const handleCustomChange = (customVal) => {
    setCustomValue(customVal);
    onChange(customVal);
  };

  return (
    <div>
      <FormField
        label="Срок действия пропуска"
        value={isCustom ? 'custom' : value}
        onChange={handleSelectChange}
        type="select"
        required
        validators={[validators.required]}
        resetTrigger={resetTrigger}
      >
        {CUSTOM_PERIOD_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormField>
      
      {isCustom && (
        <div style={{ marginTop: 12 }}>
          <FormField
            label="Введите свой срок"
            value={customValue}
            onChange={handleCustomChange}
            type="text"
            placeholder="Например: 2d 5h, 30m, 1w 2d"
            required
            validators={[validators.required, validators.customValidityPeriod]}
            resetTrigger={resetTrigger}
          />
          <div style={{ 
            fontSize: 12, 
            color: '#6b7280', 
            marginTop: 4,
            lineHeight: 1.4
          }}>
            Форматы: 30m (минуты), 2h (часы), 1d (дни), 1w (недели), 1m (месяцы)<br/>
            Можно комбинировать: 2d 5h, 1w 3d
          </div>
        </div>
      )}
    </div>
  );
}
