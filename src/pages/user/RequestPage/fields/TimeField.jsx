import FormField from '@/components/common/FormField';
import { validators } from '@/utils/validation';

export default function TimeField({ value, onChange, resetTrigger }) {
  return (
    <FormField
      label="Время визита"
      value={value}
      onChange={onChange}
      type="time"
      required
      validators={[validators.required]}
      resetTrigger={resetTrigger}
    />
  );
}
