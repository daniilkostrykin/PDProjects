import React from 'react';
export default function StatusBadge({ status }) {
const map = {
approved: { label:'Одобрено', cls:'badge badge--approved' },
pending: { label:'В обработке', cls:'badge badge--pending' },
rejected: { label:'Отклонено', cls:'badge badge--rejected' },
};
const it = map[status] || { label: status, cls:'badge' };
return (<span className={it.cls}><span className="badgeDot"/> {it.label}</span>);
}