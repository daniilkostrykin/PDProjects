import React from 'react';
export default function FullNameField({ value, onChange }) {
return (
<div>
<label>ФИО</label>
<input className="input" placeholder="Иванов Иван" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}