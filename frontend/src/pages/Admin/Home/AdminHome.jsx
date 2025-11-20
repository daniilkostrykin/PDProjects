// src/pages/Admin/Home/AdminHome.jsx

import AdminKpis from './components/AdminKpis';
import MiniBar from './components/MiniBar';

export default function AdminHome() {
  return (
    <>
      <AdminKpis />

      <div className="grid2" style={{ marginTop: 12 }}>
        <MiniBar />
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">Последние действия</div>
            <button className="btn btn--ghost" title="Обновить">🔄</button>
          </div>
          <div className="cardBody">
            <div className="muted">Пока нет данных</div>
          </div>
        </div>
      </div>
    </>
  );
}