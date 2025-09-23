// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import AuthService from '../services/auth.service';
import type { User } from '../types/auth';

// Определяем интерфейс для AuthContext
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Создаем контекст с дефолтными значениями
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер контекста
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Для начальной проверки токена

  useEffect(() => {
    // При загрузке приложения проверяем, есть ли уже токен/пользователь в localStorage
    const storedUser = AuthService.getAuthUser();
    const token = AuthService.getToken();

    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Загрузка завершена
  }, []);

  const loginHandler = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const authResponse = await AuthService.login(username, password);
      setUser(authResponse.user);
      setIsAuthenticated(true);
      // После успешного логина можно сделать редирект, например:
      // navigate('/'); // (если используете useNavigate)
    } catch (error) {
      console.error('Login failed in context:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error; // Перебрасываем ошибку дальше
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // navigate('/login'); // (если используете useNavigate)
  };

  const value = {
    user,
    isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Пользовательский хук для удобного доступа к контексту
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};