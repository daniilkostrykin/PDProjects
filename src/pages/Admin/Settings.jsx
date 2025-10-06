import { useContext } from 'react';
import { Context } from '@/context';
import AccessDenied from '@/components/common/AccessDenied';

export default function Settings() {
  const { user } = useContext(Context);
  if (!user.isAdmin) return <AccessDenied />;

  return (
    <div>
      <h2>Настройки системы</h2>
      <ul style={{ opacity: 0.9 }}>
        <li>Параметры шаблонов пропусков</li>
        <li>Управление ролями и доступами</li>
        <li>Интеграции (сканер/OCR, почта и т.п.)</li>
      </ul>
      {/* TODO: формы настроек и вызовы бэка */}
    </div>
  );
}
