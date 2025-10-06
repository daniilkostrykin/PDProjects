import { useContext } from 'react';
import { Context } from '@/context';

export default function DashboardPage() {
  const { user } = useContext(Context);

  return (
    <div style={{ padding: 24 }}>
      <h1>Добро пожаловать в AutoPass</h1>
      <p>
        {user.user?.email
          ? `Вы вошли как ${user.user.email}`
          : 'Пользователь без email'}
      </p>

      {user.isAdmin && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
          <strong>Админский раздел:</strong>
          <ul>
            <li>Управление сотрудниками</li>
            <li>Просмотр логов</li>
            <li>Настройки системы</li>
          </ul>
        </div>
      )}
    </div>
  );
}
