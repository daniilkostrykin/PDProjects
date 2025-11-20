import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MiniBar() {
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = useState(-1);

  // Мокаем данные за 7 дней (слева направо — старые к новым)
  const data = useMemo(() => {
    const today = new Date();
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      arr.push({
        day: d.toLocaleDateString('ru-RU', { weekday: 'short' }).replace('.', ''),
        value: 5 + ((d.getDate() * 7) % 18),
      });
    }
    return arr;
  }, []);

  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardTitle">Активность за 7 дней</div>
        <button className="btn btn--ghost" onClick={() => navigate('/dashboard/admin/reports?range=7d')}>Подробнее</button>
      </div>
      <div className="cardBody">
        <div style={{position:'relative'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8,alignItems:'end',height:160,paddingBottom:22}}>
            {data.map((d, i) => {
              const h = Math.max(8, Math.round((d.value / max) * 120));
              const isHover = i === hoverIdx;
              return (
                <div key={i} style={{display:'grid',gridTemplateRows:'1fr auto',gap:8,alignItems:'end'}}>
                  <div
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(-1)}
                    title={`${d.value} заявок`}
                    style={{
                      height: h,
                      background: isHover ? 'linear-gradient(180deg, #93c5fd, #2563eb)' : 'linear-gradient(180deg, #60a5fa, #2563eb)',
                      borderRadius: 6,
                      boxShadow: '0 2px 10px rgba(37,99,235,.25)',
                      position: 'relative'
                    }}
                  />
                  <div className="muted" style={{fontSize:12,textAlign:'center'}}>{d.day}</div>
                </div>
              )
            })}
          </div>
          {hoverIdx >= 0 && (
            <div style={{position:'absolute',left:`calc(${(hoverIdx+0.5)*(100/7)}% - 36px)`,top:0,transform:'translate(-50%,-8px)'}}>
              <div style={{background:'#111827',color:'#fff',padding:'6px 8px',borderRadius:8,fontSize:12,whiteSpace:'nowrap',boxShadow:'0 6px 18px rgba(17,24,39,.25)'}}>
                {data[hoverIdx].value} заявок
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
