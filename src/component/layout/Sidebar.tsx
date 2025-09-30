import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar: React.FC = () => (
<aside className="sidebar">
<div style={{fontSize:20, fontWeight:700, marginBottom:24}}>Навигация</div>
<nav>
<ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:8}}>
{[
{ to: '/', label: 'Дашборд' },
{ to: '/employees', label: 'Сотрудники' },
{ to: '/passes', label: 'Пропуска' },
{ to: '/passes/new', label: 'Новая заявка' },
{ to: '/passes/my', label: 'Мои заявки' },
{ to: '/reports/access-log', label: 'Журнал доступа' },
{ to: '/admin/approval', label: 'Очередь согласования' },
{ to: '/admin/approved', label: 'Одобренные' },
].map((i) => (
<li key={i.to}>
<NavLink to={i.to} className={({ isActive }) => isActive ? 'active' : ''}>{i.label}</NavLink>
</li>
))}
</ul>
</nav>
<div style={{ marginTop: 'auto', opacity: 0.7 }}>Версия 1.0</div>
</aside>
);


export default Sidebar;