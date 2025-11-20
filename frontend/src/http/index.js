import axios from "axios";

// Автоопределение API для доступа с телефона в локальной сети:
// если переменная не задана, подставим http(s)://<host>:8080
const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8080`
    : "http://localhost:8080");
const ACCESS_TOKEN_KEY = "token";

export const $host = axios.create({
  baseURL: API_URL,
});

export const $authHost = axios.create({
  baseURL: API_URL,
  withCredentials: true, // нужно, если refresh хранится в httpOnly cookie
});

export function saveToken(token) {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function removeToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Парсинг JWT для получения пользователя и ролей
export function parseUserFromToken(token) {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    const json = JSON.parse(decodeURIComponent(escape(atob(payload))));
    // ожидаем поля sub/email/roles — roles может быть строкой "ADMIN,USER" или массивом
    let roles = [];
    if (Array.isArray(json.roles)) {
      roles = json.roles;
    } else if (typeof json.roles === "string") {
      roles = json.roles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (Array.isArray(json.authorities)) {
      roles = json.authorities;
    }
    // Нормализуем к формату ROLE_*
    roles = roles.map((r) =>
      typeof r === "string" && r.toUpperCase().startsWith("ROLE_")
        ? r.toUpperCase()
        : `ROLE_${String(r).toUpperCase()}`
    );

    return {
      id: json.userId || json.uid || json.id || null,
      email: json.email || json.sub || null,
      roles,
      raw: json,
    };
  } catch {
    return null;
  }
}

// ---- Interceptors ----

// Добавляем Authorization на каждый запрос через $authHost
$authHost.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Авто-рефреш access-токена по 401 (если есть эндпоинт /api/v1/auth/refresh)
let isRefreshing = false;
let pendingQueue = [];

function processQueue(error, newToken) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(newToken);
  });
  pendingQueue = [];
}

$authHost.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    const status = error?.response?.status;

    if (status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve($authHost(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const resp = await $host.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = resp?.data?.accessToken || resp?.data?.token;
        if (!newToken) throw new Error("No access token in refresh response");

        saveToken(newToken);
        processQueue(null, newToken);

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return $authHost(original);
      } catch (err) {
        processQueue(err, null);
        removeToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
