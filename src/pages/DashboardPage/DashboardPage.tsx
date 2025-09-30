export default function DashboardPage() {
return (
<div className="container">
<h2>Дашборд</h2>
<div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>
<div className="card">Метрика 1</div>
<div className="card">Метрика 2</div>
<div className="card">Метрика 3</div>
</div>
</div>
);
}