import MobileTabBar from '@/components/MobileTabBar';
import './AdminMobileShell.css';

export default function AdminMobileShell({ title, children }) {
  return (
    <div className="am-page">
      <header className="am-header">
        <div className="am-header-left"></div>
        <div className="am-header-title">{title}</div>
        <div className="am-header-right"></div>
      </header>
      <main className="am-content">
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
}


