import React from 'react';
export default function PassTypeSelect({ value, onChange }) {
return (
<div>
<label>Вид пропуска</label>
<select className="select" value={value} onChange={e=>onChange(e.target.value)}>
<option value="car">Автомобиль</option>
<option value="foot">Пеший</option>
</select>
</div>
);
}