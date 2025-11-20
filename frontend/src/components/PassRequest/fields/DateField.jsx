import React from 'react';
export default function DateField({ value, onChange }) {
return (
<div>
<label>Дата посещения</label>
<input className="date" type="date" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}