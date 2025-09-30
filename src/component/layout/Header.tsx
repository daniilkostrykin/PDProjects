import React from 'react';
import { useAuth } from '@/hooks/useAuth';


const Header: React.FC = () => {
const { user, logout } = useAuth();


const handleLogout = () => {
logout();
window.location.href = '/login';
};


return (
<header className="header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<h1 style={{margin:0}}>Безопасный Автопропуск</h1>
<div style={{display:'flex',gap:12,alignItems:'center'}}>
<span style={{color:'#4b5563'}}>{user ? `Специалист СБД (${user.username})` : 'Гость'}</span>
<button className="btn link" onClick={handleLogout}>Выйти</button>
</div>
</header>
);
};


export default Header;