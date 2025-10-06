import { useContext } from 'react';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';

export default function Reports() {
  const { user } = useContext(Context);
  if (!user.isAdmin) return <AccessDenied />;

  return (
    <div>
      <h2>Журналы / Отчёты</h2>
      <p style={{ opacity: 0.8 }}>Просмотр журнала доступа, выгрузка в CSV/Excel, фильтры по датам.</p>
      {/* TODO: таблица логов, фильтры дат, экспорт */}
    </div>
  );
}
