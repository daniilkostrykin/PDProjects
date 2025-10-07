// src/services/api/passes.api.js
export const PassesApi = (() => {
  let id = 5;
  let records = [
    { id: 1, type: 'car', carBrand: 'Toyota', carModel: 'Camry', carPlate: 'A123BC', fullName: 'Иван Петров', date: '2025-10-08', reason: 'Совещание', status: 'approved', createdAt: '2025-10-06T09:12:00Z' },
    { id: 2, type: 'foot', fullName: 'Мария Цветкова', date: '2025-10-09', reason: 'Собеседование', status: 'pending', createdAt: '2025-10-06T11:40:00Z' },
    { id: 3, type: 'car', carBrand: 'BMW', carModel: 'X3', carPlate: 'K777KK', fullName: 'Никита Сидоров', date: '2025-10-10', reason: 'Поставка', status: 'rejected', createdAt: '2025-10-04T15:10:00Z' },
    { id: 4, type: 'foot', fullName: 'Сергей Алексеев', date: '2025-10-07', reason: 'Экскурсия', status: 'approved', createdAt: '2025-10-05T12:05:00Z' },
  ];
  const counters = () => ({
    approved: records.filter(r => r.status === 'approved').length,
    rejected: records.filter(r => r.status === 'rejected').length,
    pending: records.filter(r => r.status === 'pending').length,
  });
  return {
    async listMine() { return [...records].sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||'')); },
    async create(payload) { id+=1; const rec={ id, status:'pending', createdAt:new Date().toISOString(), ...payload }; records.unshift(rec); return rec; },
    async listAll() { return [...records]; },
    async updateStatus(id, status) { const i=records.findIndex(r=>r.id===id); if(i>=0) records[i]={...records[i], status}; return records[i]; },
    stats() { return counters(); }
  };
})();
