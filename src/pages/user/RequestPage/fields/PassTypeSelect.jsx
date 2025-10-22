import FormField from '../../../components/common/FormField';
import { validators } from '../../../utils/validation';

export default function PassTypeSelect({ value, onChange }) {
  return (
    <FormField
      label="Тип пропуска"
      value={value}
      onChange={onChange}
      type="select"
      required
      validators={[validators.required]}
    >
      <option value="">Выберите тип пропуска</option>
      <option value="car">🚗 Автомобиль</option>
      <option value="psh">🚶 Пешеходный</option>
    </FormField>
  );
}
