// src/components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Импортируем useAuth
// Убираем useNavigate, используем прямой редирект

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Получаем user и функцию logout из контекста

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // После выхода перенаправляем на страницу логина
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Безопасный Автопропуск</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <span className="text-gray-600">Специалист СБД ({user.username})</span>
        ) : (
          <span className="text-gray-600">Гость</span>
        )}
        <button 
          onClick={handleLogout} 
          className="text-blue-600 hover:text-blue-800"
        >
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;