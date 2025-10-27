import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileTabBar.css';

const MobileTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Определяем активную вкладку на основе текущего пути
    const path = location.pathname;
    if (path.includes('/request')) return 'request';
    if (path.includes('/passes')) return 'passes';
    if (path.includes('/profile')) return 'profile';
    return 'request'; // По умолчанию
  });

  const tabs = [
    {
      id: 'request',
      label: 'Оформить',
      icon: '🎫',
      path: '/dashboard/request',
      activeIcon: '🎫'
    },
    {
      id: 'passes',
      label: 'Мои пропуска',
      icon: '📋',
      path: '/dashboard/passes',
      activeIcon: '📋'
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: '👤',
      path: '/dashboard/profile',
      activeIcon: '👤'
    }
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
            {activeTab === tab.id ? tab.activeIcon : tab.icon}
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
