import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '@/context';

export default function Header() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await user.logout();            // см. обновление в UserStore ниже
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', borderBottom: '1px solid var(--card-border)', background: '#fff'
    }}>
      <div style={{ fontWeight: 600 }}>AutoPass</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ opacity: 0.8 }}>
          {user.user?.email || '—'} {user.isAdmin ? ' · Админ' : ' · Пользователь'}
        </span>
        <button onClick={onLogout} disabled={loading} style={{
          border: '1px solid #ddd', background: 'white', padding: '6px 10px', borderRadius: 6, cursor: 'pointer'
        }}>
          {loading ? 'Выходим…' : 'Выйти'}
        </button>
      </div>
    </header>
  );
}
