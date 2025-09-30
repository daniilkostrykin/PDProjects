import { useEffect, useState } from 'react';
import { PassRequest } from '@/types/pass-request';
import { PassRequestService } from '@/services/pass-request.service';


export default function PassListPage() {
const [items, setItems] = useState<PassRequest[]>([]);


useEffect(() => {
PassRequestService.list().then(setItems).catch(console.error);
}, []);


return (
<div className="container">
<h2>Пропуска</h2>
<div className="card">
{items.length === 0 ? 'Пока пусто' : (
<ul>
{items.map(p => (
<li key={p.id}>{p.employeeName} — {p.vehicleNumber} — {p.status}</li>
))}
</ul>
)}
</div>
</div>
);
}