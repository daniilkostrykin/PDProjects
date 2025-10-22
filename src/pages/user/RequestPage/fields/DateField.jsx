import FormField from '../../../components/common/FormField';
import { validators } from '../../../utils/validation';

export default function DateField({ value, onChange, label = 'Дата' }) {
  return (
    <FormField
      label={label}
      value={value}
      onChange={onChange}
      type="date"
      required
      validators={[validators.required, validators.date]}
    />
  );
}
