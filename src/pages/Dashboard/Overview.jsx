import { useContext } from 'react';
import { Context } from '@/context';

export default function Overview() {
  const { user } = useContext(Context);

  return (
    <div>
      <h1>Добро пожаловать в AutoPass</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        {user.isAdmin
          ? 'У вас административные права. Доступны разделы: сотрудники, журналы/отчёты, настройки.'
          : 'У вас роль пользователя. Доступны разделы: мои пропуска, оформление пропуска, профиль.'}
      </p>

      <div style={{
        display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', marginTop: 16
      }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Статус системы</div>
          <div style={{ opacity: 0.8 }}>Работает в штатном режиме</div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', padding: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {user.isAdmin ? 'Активные заявки' : 'Мои активные заявки'}
          </div>
          <div style={{ opacity: 0.8 }}>Пока пусто</div>
        </div>
      </div>
    </div>
  );
}
