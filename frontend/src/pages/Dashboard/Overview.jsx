// src/pages/Dashboard/Overview.jsx
import { useContext } from 'react';
import { Context } from '@/context';

export default function Overview() {
  const { user } = useContext(Context);

  return (
    <div className="grid">
      <div>
        <h1 style={{ margin: 0 }}>Добро пожаловать в AutoPass</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          {user.isAdmin
            ? 'У вас административные права. Доступны разделы: сотрудники, журналы/отчёты, настройки.'
            : 'У вас роль пользователя. Доступны разделы: мои пропуска, оформление пропуска, профиль.'}
        </p>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}
      >
        <div className="card">
          <div className="cardBody">
            <div className="cardTitle" style={{ fontSize: 16 }}>Статус системы</div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>Работает в штатном режиме</div>
          </div>
        </div>

        <div className="card">
          <div className="cardBody">
            <div className="cardTitle" style={{ fontSize: 16 }}>
              {user.isAdmin ? 'Активные заявки' : 'Мои активные заявки'}
            </div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>Пока пусто</div>
          </div>
        </div>
      </div>
    </div>
  );
}
