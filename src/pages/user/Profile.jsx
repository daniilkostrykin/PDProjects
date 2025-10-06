import { useContext } from 'react';
import { Context } from '@/context';

export default function Profile() {
  const { user } = useContext(Context);

  return (
    <div>
      <h2>Профиль</h2>
      <div style={{ marginTop: 10 }}>
        <div><b>Email:</b> {user.user?.email || '-'}</div>
        <div><b>Роли:</b> {user.user?.roles?.join(', ') || '-'}</div>
      </div>
    </div>
  );
}
