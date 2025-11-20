import React from 'react';
export default function CarBrandField({ value, onChange }) {
return (
<div>
<label>Марка</label>
<input className="input" placeholder="Напр. Toyota" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}