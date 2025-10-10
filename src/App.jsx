import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Context } from '@/context';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import PublicOnlyRoute from '@/components/PublicOnlyRoute.jsx';
import { publicRoutes, authRoutes } from '@/routes';
import '@/styles/theme.css';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 0); }, []);
  if (loading) return <div style={{ padding: 24 }}>Загрузка…</div>;

  // --- ВРЕМЕННОЕ ИЗМЕНЕНИЕ: Имитация авторизованного администратора ---
  const MOCK_USER = { isAdmin: true, isAuth: true }; 
  const currentUser = MOCK_USER; // Используем моковый объект вместо реального user
  // -------------------------------------------------------------------
  
  return (
    <Routes>
      {/* публичные */}
      {/* ... (оставляем без изменений) ... */}

      {/* приватные (включая nested) */}
      {authRoutes.map(({ path, element, children, adminOnly }) => (
        <Route
          key={`auth-${path || 'root'}`}
          path={path}
          element={
            <ProtectedRoute>
              {/* Используем MOCK_USER для обхода проверки adminOnly */}
              {adminOnly && !currentUser.isAdmin ? <Navigate to="/dashboard" replace /> : element}
            </ProtectedRoute>
          }
        >
          {Array.isArray(children) && children.map((c) => (
            <Route
              key={`${path}-${c.path || 'index'}`}
              path={c.path}
              element={
                <ProtectedRoute>
                  {/* Используем MOCK_USER для обхода проверки adminOnly */}
                  {c.adminOnly && !currentUser.isAdmin ? <Navigate to="/dashboard" replace /> : c.element}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>
      ))}

      {/* фоллбэк */}
      {/* Также используем MOCK_USER, чтобы не перекинуло на /login */}
      <Route path="*" element={<Navigate to={currentUser.isAuth ? '/dashboard' : '/login'} replace />} /> 
    </Routes>
  );
});

export default App;