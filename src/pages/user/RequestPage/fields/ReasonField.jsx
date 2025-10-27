import FormField from '../../../../components/common/FormField';
import { validators } from '../../../../utils/validation';

export default function ReasonField({ value, onChange, resetTrigger }) {
  return (
    <FormField
      label="Основание для пропуска"
      value={value}
      onChange={onChange}
      placeholder="Служебная необходимость, встреча с клиентом, командировка..."
      type="textarea"
      required
      validators={[
        validators.required,
        validators.minLength(10),
        validators.maxLength(500)
      ]}
      resetTrigger={resetTrigger}
    />
  );
}
