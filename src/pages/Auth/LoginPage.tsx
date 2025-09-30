import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';


export default function LoginPage() {
const navigate = useNavigate();
const { isAuthenticated, login } = useAuth();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
if (isAuthenticated) navigate('/', { replace: true });
}, [isAuthenticated, navigate]);


const submit = async (e: React.FormEvent) => {
e.preventDefault();
setError(null);
if (!username.trim() || !password) {
setError('Введите логин и пароль');
return;
}
setLoading(true);
try {
await login({ username, password });
navigate('/', { replace: true });
} catch (err: any) {
const msg = err?.response?.data?.error || err?.message || 'Ошибка входа';
setError(msg);
} finally {
setLoading(false);
}
};


return (
<div className="container" style={{maxWidth:420}}>
<h2>Вход</h2>
<form className="grid" onSubmit={submit}>
<label>
<div>Логин</div>
<input className="input" value={username} onChange={(e)=>setUsername(e.target.value)} />
</label>
<label>
<div>Пароль</div>
<input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
</label>
{error && <div className="card" style={{borderColor:'#ef4444', color:'#b91c1c'}}>{error}</div>}
<button className="btn primary" disabled={loading}>{loading ? 'Входим…' : 'Войти'}</button>
</form>
<p style={{marginTop:12}}>
Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
</p>
</div>
);
}