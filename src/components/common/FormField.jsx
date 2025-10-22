import { useState, useEffect } from 'react';

// Простая функция валидации без хука
const validateField = (value, validators) => {
  if (!validators || validators.length === 0) return null;
  
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

export default function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  validators = [],
  required = false,
  className = '',
  ...props 
}) {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Валидация при изменении значения
  useEffect(() => {
    if (touched) {
      const validationError = validateField(value, validators);
      setError(validationError);
    }
  }, [value, touched, validators]);

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
    const validationError = validateField(value, validators);
    setError(validationError);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = touched && error;
  const isActive = isFocused || value;

  return (
    <div className={`field ${className} ${hasError ? 'field--error' : ''} ${isActive ? 'field--active' : ''}`}>
      <label htmlFor={fieldId} className="field__label">
        {label}
        {required && <span className="field__required">*</span>}
      </label>
      
      <div className="field__input-wrapper">
        {type === 'select' ? (
          <select
            id={fieldId}
            className={`input ${hasError ? 'input--error' : ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...props}
          >
            {props.children}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={fieldId}
            className={`input textarea ${hasError ? 'input--error' : ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <input
            id={fieldId}
            type={type}
            className={`input ${hasError ? 'input--error' : ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            {...props}
          />
        )}
        
        {hasError && (
          <div className="field__error">
            <span className="field__error-icon">⚠️</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
