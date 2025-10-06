import { useContext } from 'react';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';

export default function Employees() {
  const { user } = useContext(Context);
  if (!user.isAdmin) return <AccessDenied />;

  return (
    <div>
      <h2>Сотрудники</h2>
      <p style={{ opacity: 0.8 }}>CRUD по сотрудникам (добавить/редактировать/удалять).</p>
      {/* TODO: таблица, поиск, фильтры; интеграция с бэком */}
    </div>
  );
}
