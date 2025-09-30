import { useState } from 'react';
import { PassRequestService } from '@/services/pass-request.service';
import { NewPassRequest } from '@/types/pass-request';


export default function NewPassRequestPage() {
const [form, setForm] = useState<NewPassRequest>({
employeeName: '', vehicleNumber: '', validFrom: '', validTo: ''
});
const [msg, setMsg] = useState('');


const submit = async (e: React.FormEvent) => {
e.preventDefault();
setMsg('');
try {
const created = await PassRequestService.create(form);
setMsg(`Создана заявка #${created.id}`);
} catch (e: any) {
setMsg(e?.response?.data?.error || e?.message || 'Ошибка');
}
};


return (
<div className="container" style={{maxWidth:560}}>
<h2>Новая заявка на пропуск</h2>
<form className="grid" onSubmit={submit}>
<label>
<div>ФИО сотрудника</div>
<input className="input" value={form.employeeName} onChange={(e)=>setForm({...form, employeeName: e.target.value})} />
</label>
<label>
<div>Номер авто</div>
<input className="input" value={form.vehicleNumber} onChange={(e)=>setForm({...form, vehicleNumber: e.target.value})} />
</label>
<label>
<div>Действует с</div>
<input className="input" type="datetime-local" value={form.validFrom} onChange={(e)=>setForm({...form, validFrom: e.target.value})} />
</label>
<label>
<div>Действует до</div>
<input className="input" type="datetime-local" value={form.validTo} onChange={(e)=>setForm({...form, validTo: e.target.value})} />
</label>
<button className="btn primary">Создать</button>
</form>
{msg && <div className="card" style={{marginTop:12}}>{msg}</div>}
</div>
);
}