import FormField from '../../../../components/common/FormField';
import { validators } from '../../../../utils/validation';

export default function ValidityPeriodField({ value, onChange, resetTrigger }) {
  const validityOptions = [
    { label: "1 час", value: "1h" },
    { label: "2 часа", value: "2h" },
    { label: "4 часа", value: "4h" },
    { label: "8 часов", value: "8h" },
    { label: "1 день", value: "1d" },
    { label: "3 дня", value: "3d" },
    { label: "1 неделя", value: "1w" },
    { label: "1 месяц", value: "1m" },
  ];

  return (
    <FormField
      label="Срок действия пропуска"
      value={value}
      onChange={onChange}
      placeholder="Выберите срок действия"
      required
      validators={[
        validators.required
      ]}
      resetTrigger={resetTrigger}
      type="select"
    >
      <option value="">Выберите срок действия</option>
      {validityOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormField>
  );
}
