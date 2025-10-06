import { makeAutoObservable } from 'mobx';
import { saveToken, getToken, removeToken, parseUserFromToken, $host } from '@/http';
import { registerApi, loginApi, logoutApi } from '@/http/userApi';

export default class UserStore {
  user = null;
  isAuth = false;

  constructor() { makeAutoObservable(this); }

  setAuth(v) { this.isAuth = v; }
  setUser(u) { this.user = u; }

  get isAdmin() {
    const roles = this.user?.roles || [];
    return roles.includes('ROLE_ADMIN');
  }

  // вызывается при старте приложения
  async checkOnStart() {
    const token = getToken();
    if (token) {
      const u = parseUserFromToken(token);
      if (u?.email) { this.setUser(u); this.setAuth(true); }
      else removeToken();
    }
    // тихая попытка refresh — ок, если 403/401
    try {
      const resp = await $host.post('/api/v1/auth/refresh', {}, { withCredentials: true });
      const newToken = resp?.data?.accessToken || resp?.data?.token;
      if (newToken) {
        saveToken(newToken);
        const u2 = parseUserFromToken(newToken);
        this.setUser(u2);
        this.setAuth(true);
      }
    } catch (_) {}
  }

  // РЕГИСТРАЦИЯ
  async register({ email, password, fullName }) {
    const { data } = await registerApi({ email, password, fullName });
    const token = data?.accessToken || data?.token;
    if (token) {
      saveToken(token);
      const u = parseUserFromToken(token);
      this.setUser(u);
      this.setAuth(true);
    }
    return data;
  }

  // ЛОГИН
  async login({ email, password }) {
    const { data } = await loginApi({ email, password });
    const token = data?.accessToken || data?.token;
    if (token) {
      saveToken(token);
      const u = parseUserFromToken(token);
      this.setUser(u);
      this.setAuth(true);
    }
    return data;
  }

  // ВЫХОД
  async logout() {
    try { await logoutApi(); } catch (_) {}
    removeToken();
    this.setUser(null);
    this.setAuth(false);
  }
}
