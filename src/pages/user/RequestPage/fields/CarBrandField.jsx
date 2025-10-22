import FormField from '../../../components/common/FormField';
import { validators } from '../../../utils/validation';

export default function CarBrandField({ value, onChange }) {
  return (
    <FormField
      label="Марка автомобиля"
      value={value}
      onChange={onChange}
      placeholder="Toyota, BMW, Mercedes-Benz..."
      required
      validators={[
        validators.required,
        validators.minLength(2),
        validators.maxLength(50)
      ]}
    />
  );
}
