import { $host, $authHost } from './index';

// ============================
// 🔹 Регистрация нового пользователя
// ============================
export const registerApi = async ({ email, password, fullName }) => {
  // тело можно подогнать под твой backend (если поля называются иначе)
  const response = await $host.post(
    '/api/v1/auth/register',
    { email, password, fullName },
    { withCredentials: true } // если refresh токен в cookie
  );
  return response;
};

// ============================
// 🔹 Авторизация (вход)
// ============================
export const loginApi = async ({ email, password }) => {
  const response = await $host.post(
    '/api/v1/auth/login',
    { email, password },
    { withCredentials: true }
  );
  return response;
};

// ============================
// 🔹 Обновление access токена
// ============================
export const refreshApi = async () => {
  const response = await $host.post('/api/v1/auth/refresh', {}, { withCredentials: true });
  return response;
};

// ============================
// 🔹 Выход из аккаунта (logout)
// ============================
export const logoutApi = async () => {
  const response = await $authHost.post('/api/v1/auth/logout', {}, { withCredentials: true });
  return response;
};

// ============================
// 🔹 Получение профиля (опционально)
// ============================
export const getProfileApi = async () => {
  const response = await $authHost.get('/api/v1/user/profile');
  return response;
};
