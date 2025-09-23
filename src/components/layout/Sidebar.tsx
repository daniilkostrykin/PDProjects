import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">Навигация</div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Дашборд
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/employees"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Сотрудники
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/passes"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Пропуска
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/logs"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Журнал доступа
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">Версия 1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
