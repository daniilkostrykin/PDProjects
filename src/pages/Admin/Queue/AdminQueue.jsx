import { useEffect, useMemo, useState } from 'react';
import QueueTable from './components/QueueTable';
import { PassesApi } from '@/services/api/passes.api';
import ChevronIcon from '@/components/icons/ChevronIcon';

export default function AdminQueue() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('PENDING');
  const [dateFilter, setDateFilter] = useState('TODAY'); // TODAY | TOMORROW | WEEK | ALL
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    loadPasses();
  }, [status, page]);

  const loadPasses = async () => {
    setLoading(true);
    try {
      const data = await PassesApi.listAll({ 
        status: status, 
        page: page - 1, 
        size: pageSize 
      });
      setPasses(data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      alert('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (passId) => {
    try {
      await PassesApi.approve(passId);
      await loadPasses();
      alert('Заявка одобрена');
    } catch (error) {
      console.error('Ошибка одобрения:', error);
      alert('Ошибка при одобрении заявки');
    }
  };

  const handleReject = async (passId) => {
    try {
      await PassesApi.reject(passId);
      await loadPasses();
      alert('Заявка отклонена');
    } catch (error) {
      console.error('Ошибка отклонения:', error);
      alert('Ошибка при отклонении заявки');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? '-' : d.toLocaleString('ru-RU');
  };

  const applyDateFilter = (pass) => {
    if (dateFilter === 'ALL') return true;
    const visit = new Date(pass.visitDate);
    if (isNaN(visit.getTime())) return true;
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    if (dateFilter === 'TODAY') return visit >= startOfDay && visit < endOfDay;
    if (dateFilter === 'TOMORROW') {
      const start = new Date(startOfDay);
      start.setDate(start.getDate() + 1);
      const end = new Date(endOfDay);
      end.setDate(end.getDate() + 1);
      return visit >= start && visit < end;
    }
    if (dateFilter === 'WEEK') {
      const start = new Date(startOfDay);
      const end = new Date(startOfDay);
      end.setDate(end.getDate() + 7);
      return visit >= start && visit < end;
    }
    return true;
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return passes
      .filter(applyDateFilter)
      .filter(p => {
        if (!q) return true;
        const full = `${p.fullName || ''} ${p.reason || ''} ${p.carBrand || ''} ${p.carModel || ''} ${p.carPlate || ''}`.toLowerCase();
        return full.includes(q);
      });
  }, [passes, dateFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Преобразуем данные для таблицы
  const tableData = current.map(pass => ({
    id: pass.id,
    date: formatDate(pass.visitDate),
    fullName: pass.fullName,
    passType: pass.type === 'CAR' ? 'Автомобиль' : 'Пешком',
    status: pass.status?.toLowerCase() || 'pending',
    createdAt: formatDateTime(pass.createdAt),
    reason: pass.reason,
    carInfo: pass.type === 'CAR' ? `${pass.carBrand || ''} ${pass.carModel || ''} (${pass.carPlate || ''})`.trim() : null,
    invitedBy: pass.user?.fullName || pass.createdBy || '-',
    period: pass.visitDate ? formatDate(pass.visitDate) : '-',
    onApprove: () => handleApprove(pass.id),
    onReject: () => handleReject(pass.id)
  }));

  const toggleSelect = (id, checked) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  };

  const selectAllOnPage = (checked) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      current.forEach(p => { if (checked) next.add(p.id); else next.delete(p.id); });
      return next;
    });
  };

  const bulkApprove = async () => {
    for (const id of selectedIds) {
      await handleApprove(id);
    }
    setSelectedIds(new Set());
  };

  const bulkReject = async () => {
    for (const id of selectedIds) {
      await handleReject(id);
    }
    setSelectedIds(new Set());
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h2>Очередь заявок</h2>
          <p className="page-subtitle">Рассмотрение и обработка заявок на пропуска</p>
        </div>
        <div className="page-actions row" style={{gap:8}}>
          <select value={dateFilter} onChange={(e)=> {setPage(1); setDateFilter(e.target.value)}} className="select">
            <option value="TODAY">Сегодня</option>
            <option value="TOMORROW">Завтра</option>
            <option value="WEEK">Неделя</option>
            <option value="ALL">Все даты</option>
          </select>
          <input className="input" placeholder="Поиск по ФИО, авто или причине" value={search} onChange={(e)=> {setPage(1); setSearch(e.target.value)}} />
          <button className="btn" onClick={loadPasses} disabled={loading}>🔄 Обновить</button>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <div>Выбрано: <b>{selectedIds.size}</b></div>
            <div className="row" style={{gap:8}}>
              <button className="btn btn--primary" onClick={bulkApprove}>Одобрить выбранные</button>
              <button className="btn btn--danger" onClick={bulkReject}>Отклонить выбранные</button>
            </div>
          </div>
        </div>
      )}

      <QueueTable 
        rows={tableData}
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
        selectable
        onToggleSelect={toggleSelect}
        isSelected={(id)=>selectedIds.has(id)}
        onToggleSelectAll={selectAllOnPage}
      />


      <div className="pagination" style={{marginTop:12}}>
      {/* 👇 ДОБАВЬТЕ 'btn--pagination' СЮДА 👇 */}
      <button className="btn btn--sm btn--pagination" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>
        <ChevronIcon direction="left" size={14} />
      </button>
      
      <div style={{padding:'4px 8px', fontSize:13}}>Стр. {page} из {totalPages}</div>
      
      {/* 👇 И СЮДА 👇 */}
      <button className="btn btn--sm btn--pagination" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>
        <ChevronIcon direction="right" size={14} />
      </button>
    </div>
    </div>
  );
}
