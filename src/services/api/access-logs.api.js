// src/services/api/access-logs.api.js
export const AccessLogsApi = (() => {
  let id = 100;
  let records = [
    {
      id: 1,
      timestamp: "2024-12-20T08:30:15Z",
      checkpointName: "Главный вход",
      employeeName: "Иван Петров",
      passCode: "EMP001",
      eventType: "ENTRY",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "IT-отдел",
      photoUrl: "/photos/ivan-petrov.jpg",
    },
    {
      id: 2,
      timestamp: "2024-12-20T08:45:22Z",
      checkpointName: "Главный вход",
      employeeName: "Мария Цветкова",
      passCode: "EMP002",
      eventType: "ENTRY",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "Бухгалтерия",
      photoUrl: "/photos/maria-tsvetkova.jpg",
    },
    {
      id: 3,
      timestamp: "2024-12-20T09:15:33Z",
      checkpointName: "КПП №2 (Склад)",
      employeeName: "Никита Сидоров",
      passCode: "EMP003",
      eventType: "ENTRY",
      accessStatus: "DENIED",
      denialReason: "PASS_BLOCKED",
      department: "Склад",
      photoUrl: "/photos/nikita-sidorov.jpg",
    },
    {
      id: 4,
      timestamp: "2024-12-20T10:20:45Z",
      checkpointName: "Главный вход",
      employeeName: "Сергей Алексеев",
      passCode: "EMP004",
      eventType: "ENTRY",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "HR",
      photoUrl: "/photos/sergey-alekseev.jpg",
    },
    {
      id: 5,
      timestamp: "2024-12-20T12:15:12Z",
      checkpointName: "Главный вход",
      employeeName: "Иван Петров",
      passCode: "EMP001",
      eventType: "EXIT",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "IT-отдел",
      photoUrl: "/photos/ivan-petrov.jpg",
    },
    {
      id: 6,
      timestamp: "2024-12-20T13:30:28Z",
      checkpointName: "КПП №2 (Склад)",
      employeeName: "Неизвестный",
      passCode: "UNKNOWN",
      eventType: "ENTRY",
      accessStatus: "DENIED",
      denialReason: "PASS_NOT_FOUND",
      department: null,
      photoUrl: null,
    },
    {
      id: 7,
      timestamp: "2024-12-20T14:45:55Z",
      checkpointName: "Главный вход",
      employeeName: "Мария Цветкова",
      passCode: "EMP002",
      eventType: "EXIT",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "Бухгалтерия",
      photoUrl: "/photos/maria-tsvetkova.jpg",
    },
    {
      id: 8,
      timestamp: "2024-12-20T16:20:17Z",
      checkpointName: "Главный вход",
      employeeName: "Сергей Алексеев",
      passCode: "EMP004",
      eventType: "EXIT",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "HR",
      photoUrl: "/photos/sergey-alekseev.jpg",
    },
    {
      id: 9,
      timestamp: "2024-12-19T08:25:30Z",
      checkpointName: "Главный вход",
      employeeName: "Анна Козлова",
      passCode: "EMP005",
      eventType: "ENTRY",
      accessStatus: "DENIED",
      denialReason: "EMPLOYEE_FIRED",
      department: "Маркетинг",
      photoUrl: "/photos/anna-kozlova.jpg",
    },
    {
      id: 10,
      timestamp: "2024-12-19T09:10:45Z",
      checkpointName: "КПП №2 (Склад)",
      employeeName: "Иван Петров",
      passCode: "EMP001",
      eventType: "ENTRY",
      accessStatus: "GRANTED",
      denialReason: null,
      department: "IT-отдел",
      photoUrl: "/photos/ivan-petrov.jpg",
    },
  ];

  const checkpoints = [
    "Главный вход",
    "КПП №2 (Склад)",
    "КПП №3 (Производство)",
    "Служебный вход",
  ];

  const denialReasons = {
    PASS_BLOCKED: "Пропуск заблокирован",
    PASS_EXPIRED: "Пропуск просрочен",
    PASS_NOT_FOUND: "Пропуск не найден",
    EMPLOYEE_FIRED: "Сотрудник уволен",
    EMPLOYEE_ON_LEAVE: "Сотрудник в отпуске",
    ACCESS_DENIED: "Доступ запрещен",
    TIME_RESTRICTION: "Время доступа ограничено",
  };

  return {
    // Получить журнал доступа с фильтрами
    async getLogs(filters = {}) {
      let filtered = [...records];

      // Фильтр по датам
      if (filters.dateFrom) {
        filtered = filtered.filter(
          (log) => new Date(log.timestamp) >= new Date(filters.dateFrom)
        );
      }

      if (filters.dateTo) {
        filtered = filtered.filter(
          (log) => new Date(log.timestamp) <= new Date(filters.dateTo)
        );
      }

      // Фильтр по КПП
      if (filters.checkpoint) {
        filtered = filtered.filter(
          (log) => log.checkpointName === filters.checkpoint
        );
      }

      // Фильтр по типу события
      if (filters.eventType) {
        filtered = filtered.filter(
          (log) => log.eventType === filters.eventType
        );
      }

      // Фильтр по статусу доступа
      if (filters.accessStatus) {
        filtered = filtered.filter(
          (log) => log.accessStatus === filters.accessStatus
        );
      }

      // Фильтр по отделу
      if (filters.department) {
        filtered = filtered.filter(
          (log) => log.department === filters.department
        );
      }

      // Поиск по тексту
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          (log) =>
            log.employeeName.toLowerCase().includes(searchLower) ||
            log.passCode.toLowerCase().includes(searchLower) ||
            log.checkpointName.toLowerCase().includes(searchLower)
        );
      }

      // Сортировка по времени (новые сверху)
      return filtered.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    },

    // Получить статистику по журналу
    async getStats(filters = {}) {
      const logs = await this.getLogs(filters);

      const total = logs.length;
      const granted = logs.filter(
        (log) => log.accessStatus === "GRANTED"
      ).length;
      const denied = logs.filter((log) => log.accessStatus === "DENIED").length;

      const entryCount = logs.filter((log) => log.eventType === "ENTRY").length;
      const exitCount = logs.filter((log) => log.eventType === "EXIT").length;

      // Статистика по КПП
      const checkpointStats = {};
      logs.forEach((log) => {
        checkpointStats[log.checkpointName] =
          (checkpointStats[log.checkpointName] || 0) + 1;
      });

      // Статистика по причинам отказа
      const denialStats = {};
      logs
        .filter((log) => log.accessStatus === "DENIED")
        .forEach((log) => {
          const reason = log.denialReason || "UNKNOWN";
          denialStats[reason] = (denialStats[reason] || 0) + 1;
        });

      // Статистика по часам (пиковые часы)
      const hourlyStats = {};
      logs.forEach((log) => {
        const hour = new Date(log.timestamp).getHours();
        hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
      });

      return {
        total,
        granted,
        denied,
        entryCount,
        exitCount,
        checkpointStats,
        denialStats,
        hourlyStats,
        successRate: total > 0 ? Math.round((granted / total) * 100) : 0,
      };
    },

    // Получить справочники
    async getCheckpoints() {
      return checkpoints;
    },

    async getDenialReasons() {
      return denialReasons;
    },

    // Экспорт в CSV
    async exportToCSV(filters = {}) {
      const logs = await this.getLogs(filters);

      const headers = [
        "Время",
        "КПП",
        "Сотрудник",
        "Код пропуска",
        "Тип события",
        "Статус доступа",
        "Причина отказа",
        "Отдел",
      ];

      const csvRows = [
        headers.join(","),
        ...logs.map((log) =>
          [
            new Date(log.timestamp).toLocaleString("ru-RU"),
            log.checkpointName,
            log.employeeName,
            log.passCode,
            log.eventType === "ENTRY" ? "Вход" : "Выход",
            log.accessStatus === "GRANTED" ? "Разрешен" : "Отказано",
            log.denialReason
              ? denialReasons[log.denialReason] || log.denialReason
              : "",
            log.department || "",
          ]
            .map((field) => `"${field}"`)
            .join(",")
        ),
      ];

      return csvRows.join("\n");
    },

    // Получить последние события (для дашборда)
    async getRecentEvents(limit = 10) {
      const logs = [...records]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);

      return logs;
    },
  };
})();
