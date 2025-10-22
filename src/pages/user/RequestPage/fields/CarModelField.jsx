import FormField from '../../../components/common/FormField';
import { validators } from '../../../utils/validation';

export default function CarModelField({ value, onChange }) {
  return (
    <FormField
      label="Модель автомобиля"
      value={value}
      onChange={onChange}
      placeholder="Camry, X5, E-Class..."
      required
      validators={[
        validators.required,
        validators.minLength(2),
        validators.maxLength(50)
      ]}
    />
  );
}
