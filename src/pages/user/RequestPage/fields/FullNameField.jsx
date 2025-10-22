import FormField from '../../../components/common/FormField';
import { validators, createValidator } from '../../../utils/validation';

export default function FullNameField({ value, onChange }) {
  return (
    <FormField
      label="ФИО"
      value={value}
      onChange={onChange}
      placeholder="Иванов Иван Иванович"
      required
      validators={[
        validators.required,
        validators.fullName,
        validators.minLength(5),
        validators.maxLength(100)
      ]}
    />
  );
}
