import { useState } from 'react';

export default function RequestPass() {
  const [form, setForm] = useState({ fullName: '', company: '', dateFrom: '', dateTo: '', reason: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: POST на твой /passes/request
    alert('Заявка отправлена (демо)');
  };

  return (
    <div>
      <h2>Оформить пропуск</h2>
      <form onSubmit={onSubmit} style={{ marginTop: 12, maxWidth: 520 }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <input name="fullName" placeholder="ФИО посетителя" value={form.fullName} onChange={onChange}/>
          <input name="company" placeholder="Организация" value={form.company} onChange={onChange}/>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
            <input name="dateFrom" type="date" value={form.dateFrom} onChange={onChange}/>
            <input name="dateTo" type="date" value={form.dateTo} onChange={onChange}/>
          </div>
          <textarea name="reason" placeholder="Цель визита" rows={4} value={form.reason} onChange={onChange}/>
          <button type="submit" style={{
            alignSelf: 'start', padding: '8px 14px', borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer'
          }}>Отправить заявку</button>
        </div>
      </form>
    </div>
  );
}
