import { NavLink } from 'react-router-dom';

export default function Sidebar({ nav }) {
  return (
    <aside style={{ borderRight: '1px solid var(--card-border)', background: '#fff' }}>
      <div style={{ padding: 16, fontWeight: 600, opacity: 0.7 }}>Меню</div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              padding: '10px 16px',
              textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'inherit',
              background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent'
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
