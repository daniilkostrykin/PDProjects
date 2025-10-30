import { useEffect, useMemo, useState, useContext } from 'react';
import QueueTable from './components/QueueTable';
import QueueStats from './components/QueueStats';
import QueueCard from './components/QueueCard';
import { PassesApi } from '@/services/api/passes.api';
import ChevronIcon from '@/components/icons/ChevronIcon';
import { Context } from '@/context';
import AdminMobileShell from '@/components/layout/AdminMobileShell';
import EmptyState from '@/components/common/EmptyState';
import './mobile.css';

export default function AdminQueue() {
  const { user } = useContext(Context);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('PENDING');
  const [dateFilter, setDateFilter] = useState('TODAY'); // TODAY | TOMORROW | WEEK | ALL | CUSTOM
  const [customDate, setCustomDate] = useState('');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [stats, setStats] = useState({ total: 0, today: 0, pending: 0 });

  useEffect(() => {
    loadPasses();
    loadStats();
  }, [status, page]);

  const loadStats = async () => {
    try {
      const data = await PassesApi.stats();
      setStats(data);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  };

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
    const visit = new Date(pass.visitDate);
    if (isNaN(visit.getTime())) return true; // Если дата некорректна, включаем в фильтр

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Начало текущего дня

    switch (dateFilter) {
      case 'ALL':
        return true;
      case 'TODAY':
        const todayEnd = new Date(now);
        todayEnd.setDate(now.getDate() + 1);
        return visit >= now && visit < todayEnd;
      case 'TOMORROW':
        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        const tomorrowEnd = new Date(now);
        tomorrowEnd.setDate(now.getDate() + 2);
        return visit >= tomorrowStart && visit < tomorrowEnd;
      case 'WEEK':
        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate() + 7);
        return visit >= now && visit < weekEnd;
      case 'CUSTOM':
        if (!customDate) return true; // Если выбрана CUSTOM, но дата не указана, включаем все
        const selected = new Date(customDate);
        selected.setHours(0, 0, 0, 0);
        const selectedEnd = new Date(selected);
        selectedEnd.setDate(selected.getDate() + 1);
        return visit >= selected && visit < selectedEnd;
      default:
        return true;
    }
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

  const mobileContent = (
    <>
      <QueueStats total={stats.total} today={stats.today} pending={stats.pending} />
      <div className="m-filters">
        <div className="m-row">
          <select value={dateFilter} onChange={(e)=> {setPage(1); setDateFilter(e.target.value)}} className="input select m-date">
            <option value="TODAY">Сегодня</option>
            <option value="TOMORROW">Завтра</option>
            <option value="WEEK">На этой неделе</option>
            <option value="ALL">Все</option>
            <option value="CUSTOM">Выбрать дату</option>
          </select>
          {dateFilter === 'CUSTOM' && (
            <input
              type="date"
              className="input m-date-picker"
              value={customDate}
              onChange={(e) => { setPage(1); setCustomDate(e.target.value); }}
            />
          )}
        </div>
        <div className="m-row m-search-container">
          <div className="m-search">
            <span className="m-search-icon">🔎</span>
            <input className="input m-search-input" placeholder="Поиск по ФИО, авто..." value={search} onChange={(e)=> {setPage(1); setSearch(e.target.value)}} />
            {search && (
              <button className="m-clear-search-btn" onClick={() => setSearch('')}>✖</button>
            )}
          </div>
        </div>
      </div>

      <div className="m-queue-cards">
        {loading ? (
          <div className="card">Загрузка…</div>
        ) : tableData.length === 0 ? (
          <EmptyState icon="📭" message="Очередь пуста. Новые заявки появятся здесь." />
        ) : (
          tableData.map(row => (
            <QueueCard
              key={row.id}
              id={row.id}
              date={row.date}
              fullName={row.fullName}
              passType={row.passType}
              createdAt={row.createdAt}
              reason={row.reason}
              carInfo={row.carInfo}
              onApprove={row.onApprove}
              onReject={row.onReject}
            />
          ))
        )}
      </div>

      <div className="pagination" style={{marginTop:12}}>
        <button className="btn btn--sm btn--pagination" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}><ChevronIcon direction="left" size={14} /></button>
        <div style={{padding:'4px 8px', fontSize:13}}>Стр. {page} из {totalPages}</div>
        <button className="btn btn--sm btn--pagination" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}><ChevronIcon direction="right" size={14} /></button>
      </div>
    </>
  );

  return (
    <div className="page">
      {/* Mobile Header (бургер слева, заголовок по центру) */}
      {/* Desktop header/title + filters (desktop only) */}
      <div className="page-header d-only">
        <div className="page-title">
          <h2>Очередь заявок</h2>
          <p className="page-subtitle">Рассмотрение и обработка заявок на пропуска</p>
        </div>
        <div className="page-actions row" style={{gap:8}}>
          <select value={dateFilter} onChange={(e)=> {setPage(1); setDateFilter(e.target.value)}} className="input select">
            <option value="TODAY">Сегодня</option>
            <option value="TOMORROW">Завтра</option>
            <option value="WEEK">На этой неделе</option>
            <option value="ALL">Все</option>
            <option value="CUSTOM">Выбрать дату</option>
          </select>
          {dateFilter === 'CUSTOM' && (
            <input
              type="date"
              className="input"
              value={customDate}
              onChange={(e) => { setPage(1); setCustomDate(e.target.value); }}
            />
          )}
          <div className="m-search-desktop-wrapper">
            <input className="input" placeholder="Поиск по ФИО, авто или причине" value={search} onChange={(e)=> {setPage(1); setSearch(e.target.value)}} />
            {search && (
              <button className="m-clear-search-btn desktop" onClick={() => setSearch('')}>✖</button>
            )}
          </div>
          <button className="btn btn--sm" title="Обновить" onClick={loadPasses} disabled={loading}>↻</button>
        </div>
      </div>

      {/* Mobile layout wrapper */}
      <div className="m-only">
        <AdminMobileShell title="Очередь заявок">
          {mobileContent}
        </AdminMobileShell>
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

      {/* Desktop Table */}
      <div className="d-only">
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
      </div>

      {/* Mobile cards moved into AdminMobileShell above */}


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
      {/* Bottom nav (mobile) */}
    </div>
  );
}
