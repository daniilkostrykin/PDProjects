# 🚀 AutoPass REST API Documentation

## 📋 Общая информация

- **Base URL**: `http://localhost:8080`
- **Авторизация**: Отключена для разработки
- **Content-Type**: `application/json`

---

## 🔐 Аутентификация (`/api/v1/auth`)

### Регистрация пользователя

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**

```json
{
  "id": 1,
  "username": "user@example.com",
  "roles": ["USER"]
}
```

### Вход в систему

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@local",
  "password": "admin"
}
```

**Ответ:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Выход из системы

```http
POST /api/v1/auth/logout
```

**Ответ:** `204 No Content`

### Обновление токена

```http
POST /api/v1/auth/refresh
```

**Ответ:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎫 Пропуска (`/api/v1/passes`)

### Создать пропуск

```http
POST /api/v1/passes
Content-Type: application/json

{
  "type": "VISITOR",
  "fullName": "Иван Иванов",
  "visitDate": "2024-01-15",
  "reason": "Деловая встреча",
  "carBrand": "Toyota",
  "carModel": "Camry",
  "carPlate": "А123БВ777"
}
```

**Ответ:**

```json
{
  "id": 1,
  "type": "VISITOR",
  "fullName": "Иван Иванов",
  "visitDate": "2024-01-15",
  "reason": "Деловая встреча",
  "status": "PENDING",
  "createdAt": "2024-01-10T10:30:00Z"
}
```

### Получить мои пропуска

```http
GET /api/v1/passes?status=pending&page=0&size=20
```

**Ответ:**

```json
{
  "content": [
    {
      "id": 1,
      "type": "VISITOR",
      "fullName": "Иван Иванов",
      "visitDate": "2024-01-15",
      "status": "PENDING",
      "createdAt": "2024-01-10T10:30:00Z"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

---

## 👨‍💼 Администрирование пропусков (`/api/v1/admin/passes`)

### Статистика пропусков

```http
GET /api/v1/admin/passes/stats
```

**Ответ:**

```json
{
  "approved": 5,
  "pending": 3,
  "rejected": 1
}
```

### Очередь заявок

```http
GET /api/v1/admin/passes?status=PENDING&page=0&size=20
```

**Ответ:**

```json
{
  "content": [
    {
      "id": 1,
      "type": "VISITOR",
      "fullName": "Иван Иванов",
      "visitDate": "2024-01-15",
      "status": "PENDING",
      "createdAt": "2024-01-10T10:30:00Z"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

### Одобрить пропуск

```http
POST /api/v1/admin/passes/1/approve
```

**Ответ:**

```json
{
  "id": 1,
  "type": "VISITOR",
  "fullName": "Иван Иванов",
  "visitDate": "2024-01-15",
  "status": "APPROVED",
  "createdAt": "2024-01-10T10:30:00Z"
}
```

### Отклонить пропуск

```http
POST /api/v1/admin/passes/1/reject
```

**Ответ:**

```json
{
  "id": 1,
  "type": "VISITOR",
  "fullName": "Иван Иванов",
  "visitDate": "2024-01-15",
  "status": "REJECTED",
  "createdAt": "2024-01-10T10:30:00Z"
}
```

---

## 👥 Управление сотрудниками (`/api/v1/admin/employees`)

### Список сотрудников

```http
GET /api/v1/admin/employees?department=IT-отдел&status=ACTIVE&search=Иван
```

**Ответ:**

```json
[
  {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Петров",
    "middleName": "Сергеевич",
    "department": "IT-отдел",
    "position": "Разработчик",
    "email": "ivan.petrov@company.com",
    "phone": "+7 (999) 123-45-67",
    "status": "ACTIVE",
    "passCode": "EMP001",
    "passStatus": "ACTIVE",
    "passExpiryDate": "2025-12-31"
  }
]
```

### Статистика сотрудников

```http
GET /api/v1/admin/employees/stats
```

**Ответ:**

```json
{
  "total": 2,
  "active": 2,
  "onLeave": 0,
  "fired": 0,
  "activePasses": 2,
  "blockedPasses": 0
}
```

### Создать сотрудника

```http
POST /api/v1/admin/employees
Content-Type: application/json

{
  "firstName": "Алексей",
  "lastName": "Смирнов",
  "middleName": "Иванович",
  "department": "IT-отдел",
  "position": "Тестировщик",
  "email": "alexey.smirnov@company.com",
  "phone": "+7 (999) 987-65-43"
}
```

**Ответ:**

```json
{
  "id": 3,
  "message": "Сотрудник создан успешно"
}
```

### Обновить сотрудника

```http
PUT /api/v1/admin/employees/1
Content-Type: application/json

{
  "position": "Старший разработчик",
  "phone": "+7 (999) 111-22-33"
}
```

**Ответ:**

```json
{
  "id": 1,
  "message": "Сотрудник обновлен успешно"
}
```

### Удалить сотрудника

```http
DELETE /api/v1/admin/employees/1
```

**Ответ:**

```json
{
  "id": 1,
  "message": "Сотрудник удален успешно"
}
```

---

## 📊 Отчеты и журналы (`/api/v1/admin/reports`)

### Журнал доступа

```http
GET /api/v1/admin/reports/access-logs?dateFrom=2024-01-01&dateTo=2024-01-31&checkpoint=Главный вход&eventType=ENTRY&accessStatus=GRANTED&department=IT-отдел&search=Иван
```

**Ответ:**

```json
[
  {
    "id": 1,
    "timestamp": "2024-12-20T08:30:15Z",
    "checkpointName": "Главный вход",
    "employeeName": "Иван Петров",
    "passCode": "EMP001",
    "eventType": "ENTRY",
    "accessStatus": "GRANTED",
    "denialReason": null,
    "department": "IT-отдел"
  }
]
```

### Статистика журнала

```http
GET /api/v1/admin/reports/access-logs/stats?dateFrom=2024-01-01&dateTo=2024-01-31
```

**Ответ:**

```json
{
  "total": 3,
  "granted": 2,
  "denied": 1,
  "entryCount": 3,
  "exitCount": 0,
  "successRate": 67
}
```

### Список КПП

```http
GET /api/v1/admin/reports/checkpoints
```

**Ответ:**

```json
["Главный вход", "КПП №2 (Склад)", "КПП №3 (Производство)", "Служебный вход"]
```

### Список отделов

```http
GET /api/v1/admin/reports/departments
```

**Ответ:**

```json
["IT-отдел", "Бухгалтерия", "Склад", "HR", "Маркетинг"]
```

---

## 🧪 Тестирование с curl

### Быстрые тесты:

```bash
# Статистика пропусков
curl http://localhost:8080/api/v1/admin/passes/stats

# Список сотрудников
curl http://localhost:8080/api/v1/admin/employees

# Журнал доступа
curl http://localhost:8080/api/v1/admin/reports/access-logs

# Создать пропуск
curl -X POST http://localhost:8080/api/v1/passes \
  -H "Content-Type: application/json" \
  -d '{"type":"VISITOR","fullName":"Тест Тестов","visitDate":"2024-01-15","reason":"Тест"}'
```

---

## 📱 Frontend URLs

- **Главная**: http://localhost:5173
- **Админ-панель**: http://localhost:5173/dashboard/admin
- **Очередь**: http://localhost:5173/dashboard/admin/queue
- **Сотрудники**: http://localhost:5173/dashboard/admin/employees
- **Отчеты**: http://localhost:5173/dashboard/admin/reports

---

## ⚠️ Важные заметки

1. **Авторизация отключена** - все endpoints доступны без токенов
2. **Моковые данные** - все endpoints возвращают тестовые данные
3. **CORS настроен** для localhost:5173
4. **Автоматический админ** создается: `admin@local` / `admin`

---

## 🔧 Для включения авторизации в продакшене:

1. Раскомментируйте строки 33-39 в `SecurityConfig.java`
2. Раскомментируйте строку 39 для включения JWT фильтра
3. Раскомментируйте `@EnableMethodSecurity` в `MethodSecurity.java`
4. Раскомментируйте `@PreAuthorize` в контроллерах
