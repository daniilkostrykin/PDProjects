// src/types/auth.d.ts

// Описание данных пользователя, которые могут храниться после аутентификации
export interface User {
    id: string;
    username: string;
    roles: string[]; // Например, ['ROLE_ADMIN', 'ROLE_SBD_SPECIALIST']
    // Добавьте другие поля, если ваш бэкенд их возвращает
  }
  
  // Описание ответа от бэкенда при успешном логине
  export interface AuthResponse {
    jwtToken: string; // JWT токен
    user: User;      // Информация о пользователе
    // Возможно, другие поля, такие как время истечения токена
  }