import apiClient from './api';
import type { AuthResponse, User } from '../types/auth';

const login = async (username: string, password: string): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { username, password });
  const { jwtToken, user } = data;
  localStorage.setItem('jwt_token', jwtToken);
  localStorage.setItem('user', JSON.stringify(user));
  return data;
};

const register = async (email: string, password: string, fullName: string) => {
  const { data } = await apiClient.post('/auth/register', { email, password, fullName });
  return data; // { id, email, fullName, createdAt }
};

const logout = (): void => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user');
};

const getAuthUser = (): User | null => {
  const s = localStorage.getItem('user');
  return s ? JSON.parse(s) : null;
};

const getToken = (): string | null => localStorage.getItem('jwt_token');

export default { login, register, logout, getAuthUser, getToken };
