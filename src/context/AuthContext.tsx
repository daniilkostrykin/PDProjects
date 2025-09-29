// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import type { User } from '../types/auth';

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hydrated: boolean;                   // ← добавили
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as any);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Гидратация из localStorage один раз при монтировании
    const u = AuthService.getAuthUser();
    setUser(u);
    setHydrated(true);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { user } = await AuthService.login(username, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    // опционально: window.location.href = '/login';
  };

  const isAuthenticated = !!user && !!AuthService.getToken(); // токен обязателен

  return (
    <Ctx.Provider value={{ user, isAuthenticated, isLoading, hydrated, login, logout }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
