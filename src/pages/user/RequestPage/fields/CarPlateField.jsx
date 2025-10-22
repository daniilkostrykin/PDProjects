import FormField from '../../../components/common/FormField';
import { validators } from '../../../utils/validation';

export default function CarPlateField({ value, onChange }) {
  return (
    <FormField
      label="Государственный номер"
      value={value}
      onChange={onChange}
      placeholder="A000AA77"
      required
      validators={[
        validators.required,
        validators.carPlate
      ]}
    />
  );
}
