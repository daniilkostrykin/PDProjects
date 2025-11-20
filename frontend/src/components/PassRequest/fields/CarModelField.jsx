import React from 'react';
export default function CarModelField({ value, onChange }) {
return (
<div>
<label>Модель</label>
<input className="input" placeholder="Напр. Camry" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}