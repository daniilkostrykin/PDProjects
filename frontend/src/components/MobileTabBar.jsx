import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileTabBar.css';

const MobileTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/dashboard/admin');
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/admin/home')) return 'home';
    if (path.includes('/admin/queue')) return 'queue';
    if (path.includes('/admin/approved')) return 'approved';
    if (path.includes('/admin/menu')) return 'menu';
    if (path.includes('/request')) return 'request';
    if (path.includes('/passes')) return 'passes';
    if (path.includes('/profile')) return 'profile';
    return isAdmin ? 'home' : 'request';
  });
  const tabs = isAdmin
    ? [
        { id: 'home', label: 'Главная', icon: '🏠', path: '/dashboard/admin/home' },
        { id: 'queue', label: 'Очередь', icon: '🗂️', path: '/dashboard/admin/queue' },
        { id: 'approved', label: 'Одобренные', icon: '✅', path: '/dashboard/admin/approved' },
        { id: 'menu', label: 'Меню', icon: '☰', path: '/dashboard/admin/menu' },
      ]
    : [
        { id: 'request', label: 'Оформить', icon: '🎫', path: '/dashboard/request' },
        { id: 'passes', label: 'Мои пропуска', icon: '📋', path: '/dashboard/passes' },
        { id: 'profile', label: 'Профиль', icon: '👤', path: '/dashboard/profile' },
      ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="mobile-tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
          aria-label={tab.label}
        >
          <div className="mobile-tab-icon">
            {tab.icon}
          </div>
          <div className="mobile-tab-label">
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default MobileTabBar;
