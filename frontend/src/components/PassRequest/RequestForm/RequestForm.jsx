import React, { useMemo, useState } from 'react';
import CarPlateField from '@/components/PassRequest/fields/CarPlateField';


export default function RequestForm({ onSubmit }) {
const [type, setType] = useState('car');
const [fullName, setFullName] = useState('');
const [date, setDate] = useState('');
const [reason, setReason] = useState('');
const [carBrand, setCarBrand] = useState('');
const [carModel, setCarModel] = useState('');
const [carPlate, setCarPlate] = useState('');
const [error, setError] = useState(null);


const isCar = type === 'car';


const canSubmit = useMemo(() => {
if (!fullName || !date || !reason) return false;
if (isCar && (!carBrand || !carModel || !carPlate)) return false;
return true;
}, [fullName, date, reason, isCar, carBrand, carModel, carPlate]);


function handleSubmit(e) {
e.preventDefault();
setError(null);
if (!canSubmit) { setError('Заполните обязательные поля.'); return; }
const payload = { type, fullName, date, reason };
if (isCar) Object.assign(payload, { carBrand, carModel, carPlate });
onSubmit?.(payload);
}


return (
<form className="grid" onSubmit={handleSubmit}>
<div className="row">
<PassTypeSelect value={type} onChange={setType} />
<DateField value={date} onChange={setDate} />
</div>


{isCar && (
<div className="row">
<CarBrandField value={carBrand} onChange={setCarBrand} />
<CarModelField value={carModel} onChange={setCarModel} />
</div>
)}


{isCar && (
<CarPlateField value={carPlate} onChange={setCarPlate} />
)}


<FullNameField value={fullName} onChange={setFullName} />
<ReasonField value={reason} onChange={setReason} />


{error && <div className="badge badge--rejected" style={{marginTop:8}}><span className="badgeDot"/> {error}</div>}


<div style={{ display:'flex', gap: 8, marginTop: 12 }}>
<button className="btn btnPrimary" type="submit" disabled={!canSubmit}>Подать заявление</button>
<button className="btn btnGhost" type="reset" onClick={() => {
setFullName(''); setDate(''); setReason(''); setCarBrand(''); setCarModel(''); setCarPlate('');
}}>Сбросить</button>
</div>
</form>
);
}