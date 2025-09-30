import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService, { RegisterDto } from '@/services/auth.service';


export default function RegisterPage() {
const [form, setForm] = useState<RegisterDto>({ email: '', password: '', fullName: '' });
const [ok, setOk] = useState('');
const [err, setErr] = useState('');


const submit = async (e: React.FormEvent) => {
e.preventDefault();
setOk(''); setErr('');
try {
await AuthService.register(form);
setOk('Регистрация успешна. Можно войти.');
} catch (e: any) {
setErr(e?.response?.data?.error || e?.message || 'Ошибка регистрации');
}
};


return (
<div className="container" style={{maxWidth:520}}>
<h2>Регистрация</h2>
<form className="grid" onSubmit={submit}>
<label>
<div>ФИО</div>
<input className="input" value={form.fullName} onChange={(e)=>setForm({...form, fullName: e.target.value})} />
</label>
<label>
<div>Email</div>
<input className="input" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
</label>
<label>
<div>Пароль</div>
<input className="input" type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
</label>
{ok && <div className="card" style={{borderColor:'#10b981', color:'#065f46'}}>{ok}</div>}
{err && <div className="card" style={{borderColor:'#ef4444', color:'#b91c1c'}}>{err}</div>}
<button className="btn primary">Зарегистрироваться</button>
</form>
<p style={{marginTop:12}}>
Уже есть аккаунт? <Link to="/login">Войти</Link>
</p>
</div>
);
}