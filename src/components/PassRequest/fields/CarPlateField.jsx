import React from 'react';
export default function CarPlateField({ value, onChange }) {
return (
<div>
<label>Номер автомобиля</label>
<input className="input" placeholder="A123BC" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}