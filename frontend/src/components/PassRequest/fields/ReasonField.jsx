import React from 'react';
export default function ReasonField({ value, onChange }) {
return (
<div>
<label>Причина визита</label>
<textarea className="textarea" rows={3} placeholder="Опишите цель визита" value={value} onChange={e=>onChange(e.target.value)} />
</div>
);
}