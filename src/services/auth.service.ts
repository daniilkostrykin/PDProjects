// src/services/auth.service.ts
import apiClient from './api';
import type { AuthResponse, User } from '../types/auth';

// Включаем мок по умолчанию в development, если явно не указано 'false'
const isAuthMockEnabled = (
  (import.meta.env.VITE_AUTH_MOCK as string | undefined) ??
  (import.meta.env.MODE === 'development' ? 'true' : 'false')
) === 'true';

const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    if (isAuthMockEnabled) {
      const mockUser: User = {
        id: 'dev-user-1',
        username: username || 'developer',
        roles: ['ROLE_SBD_SPECIALIST'],
      };
      const mockToken = 'mock.jwt.token.dev';
      localStorage.setItem('jwt_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { jwtToken: mockToken, user: mockUser };
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', { username, password });
    const { jwtToken, user } = response.data;

    localStorage.setItem('jwt_token', jwtToken);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user');
};

const getAuthUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

const AuthService = {
  login,
  logout,
  getAuthUser,
  getToken,
};

export default AuthService;