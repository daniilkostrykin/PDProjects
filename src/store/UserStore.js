import { makeAutoObservable } from "mobx";
import {
  saveToken,
  getToken,
  removeToken,
  parseUserFromToken,
  $host,
} from "@/http";
import { registerApi, loginApi, logoutApi } from "@/http/userApi";

export default class UserStore {
  user = null;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(v) {
    this.isAuth = v;
  }
  setUser(u) {
    this.user = u;
  }

  get isAdmin() {
    const roles = this.user?.roles || [];
    return roles.includes("ROLE_ADMIN");
  }

  // вызывается при старте приложения
  async checkOnStart() {
    // Если уже в мок-режиме, восстанавливаем состояние
    if (this.isMockMode) {
      console.log("Восстанавливаем мок-режим");
      this.enableMockMode();
      return;
    }

    const token = getToken();
    if (token) {
      const u = parseUserFromToken(token);
      if (u?.email) {
        this.setUser(u);
        this.setAuth(true);
      } else removeToken();
    }

    // тихая попытка refresh — ок, если 403/401 или нет бэка
    try {
      const resp = await $host.post(
        "/api/v1/auth/refresh",
        {},
        { withCredentials: true }
      );
      const newToken = resp?.data?.accessToken || resp?.data?.token;
      if (newToken) {
        saveToken(newToken);
        const u2 = parseUserFromToken(newToken);
        this.setUser(u2);
        this.setAuth(true);
      }
    } catch (error) {
      // Если нет бэка (ERR_CONNECTION_REFUSED) - переключаемся на мок-режим
      if (
        error.code === "ERR_CONNECTION_REFUSED" ||
        error.message?.includes("ERR_CONNECTION_REFUSED")
      ) {
        console.log("Backend недоступен, переключаемся на мок-режим");
        this.enableMockMode();
      }
    }
  }

  // Включает мок-режим для работы без бэка
  enableMockMode() {
    const mockUser = {
      id: 1,
      email: "admin@local",
      roles: ["ROLE_ADMIN", "ROLE_USER"],
      raw: {
        userId: 1,
        email: "admin@local",
        roles: ["ROLE_ADMIN", "ROLE_USER"],
      },
    };
    this.setUser(mockUser);
    this.setAuth(true);

    // Сохраняем флаг мок-режима в localStorage
    localStorage.setItem("mock_mode", "true");
  }

  // Проверяет, включен ли мок-режим
  get isMockMode() {
    return localStorage.getItem("mock_mode") === "true";
  }

  // РЕГИСТРАЦИЯ
  async register({ email, password, fullName }) {
    // В мок-режиме имитируем успешную регистрацию
    if (this.isMockMode) {
      const mockUser = {
        id: Date.now(),
        email: email,
        roles: ["ROLE_USER"],
        raw: { userId: Date.now(), email: email, roles: ["ROLE_USER"] },
      };
      this.setUser(mockUser);
      this.setAuth(true);
      return { message: "Регистрация успешна (мок-режим)" };
    }

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
    // В мок-режиме проверяем стандартные учетные данные
    if (this.isMockMode) {
      if (email === "admin@local" && password === "admin") {
        this.enableMockMode();
        return { message: "Вход успешен (мок-режим)" };
      } else {
        throw new Error("Неверные учетные данные");
      }
    }

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
    // В мок-режиме не делаем сетевые запросы
    if (!this.isMockMode) {
      try {
        await logoutApi();
      } catch (_) {}
    }

    removeToken();
    localStorage.removeItem("mock_mode");
    this.setUser(null);
    this.setAuth(false);
  }
}
