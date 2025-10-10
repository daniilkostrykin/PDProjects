import { useState, useEffect } from 'react';
import QueueTable from './components/QueueTable';
import { PassesApi } from '@/services/api/passes.api';

export default function AdminQueue() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    loadPasses();
  }, [status]);

  const loadPasses = async () => {
    setLoading(true);
    try {
      const data = await PassesApi.listAll();
      // Фильтруем по статусу
      const filteredPasses = data.filter(pass => pass.status === status.toLowerCase());
      setPasses(filteredPasses);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      alert('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (passId) => {
    try {
      await PassesApi.updateStatus(passId, 'approved');
      await loadPasses();
      alert('Заявка одобрена');
    } catch (error) {
      console.error('Ошибка одобрения:', error);
      alert('Ошибка при одобрении заявки');
    }
  };

  const handleReject = async (passId) => {
    try {
      await PassesApi.updateStatus(passId, 'rejected');
      await loadPasses();
      alert('Заявка отклонена');
    } catch (error) {
      console.error('Ошибка отклонения:', error);
      alert('Ошибка при отклонении заявки');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  // Преобразуем данные для таблицы
  const tableData = passes.map(pass => ({
    id: pass.id,
    date: formatDate(pass.visitDate),
    fullName: pass.fullName,
    passType: pass.type === 'car' ? 'Автомобиль' : 'Пешком',
    status: pass.status,
    createdAt: formatDateTime(pass.createdAt),
    reason: pass.reason,
    carInfo: pass.type === 'car' ? `${pass.carBrand} ${pass.carModel} (${pass.carPlate})` : null,
    onApprove: () => handleApprove(pass.id),
    onReject: () => handleReject(pass.id)
  }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h2>Очередь заявок</h2>
          <p className="page-subtitle">
            Рассмотрение и обработка заявок на пропуска
          </p>
        </div>
        <div className="page-actions">
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="PENDING">На рассмотрении</option>
            <option value="APPROVED">Одобренные</option>
            <option value="REJECTED">Отклоненные</option>
          </select>
          <button 
            className="btn btn--secondary" 
            onClick={loadPasses}
            disabled={loading}
          >
            🔄 Обновить
          </button>
        </div>
      </div>

      <QueueTable 
        rows={tableData} 
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
