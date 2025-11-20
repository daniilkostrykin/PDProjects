// src/services/api/employees.api.js
export const EmployeesApi = (() => {
  let id = 10;
  let records = [
    {
      id: 1,
      firstName: "Иван",
      lastName: "Петров",
      middleName: "Сергеевич",
      department: "IT-отдел",
      position: "Разработчик",
      email: "ivan.petrov@company.com",
      phone: "+7 (999) 123-45-67",
      photoUrl: "/photos/ivan-petrov.jpg",
      status: "ACTIVE",
      passCode: "EMP001",
      passStatus: "ACTIVE",
      passExpiryDate: "2025-12-31",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
    },
    {
      id: 2,
      firstName: "Мария",
      lastName: "Цветкова",
      middleName: "Александровна",
      department: "Бухгалтерия",
      position: "Главный бухгалтер",
      email: "maria.tsvetkova@company.com",
      phone: "+7 (999) 234-56-78",
      photoUrl: "/photos/maria-tsvetkova.jpg",
      status: "ACTIVE",
      passCode: "EMP002",
      passStatus: "ACTIVE",
      passExpiryDate: "2025-12-31",
      createdAt: "2024-02-01T10:30:00Z",
      updatedAt: "2024-02-01T10:30:00Z",
    },
    {
      id: 3,
      firstName: "Никита",
      lastName: "Сидоров",
      middleName: "Владимирович",
      department: "Склад",
      position: "Кладовщик",
      email: "nikita.sidorov@company.com",
      phone: "+7 (999) 345-67-89",
      photoUrl: "/photos/nikita-sidorov.jpg",
      status: "ON_LEAVE",
      passCode: "EMP003",
      passStatus: "BLOCKED",
      passExpiryDate: "2025-06-30",
      createdAt: "2024-03-10T14:15:00Z",
      updatedAt: "2024-08-15T16:20:00Z",
    },
    {
      id: 4,
      firstName: "Сергей",
      lastName: "Алексеев",
      middleName: "Игоревич",
      department: "HR",
      position: "Менеджер по персоналу",
      email: "sergey.alekseev@company.com",
      phone: "+7 (999) 456-78-90",
      photoUrl: "/photos/sergey-alekseev.jpg",
      status: "ACTIVE",
      passCode: "EMP004",
      passStatus: "ACTIVE",
      passExpiryDate: "2025-12-31",
      createdAt: "2024-04-05T11:45:00Z",
      updatedAt: "2024-04-05T11:45:00Z",
    },
    {
      id: 5,
      firstName: "Анна",
      lastName: "Козлова",
      middleName: "Дмитриевна",
      department: "Маркетинг",
      position: "Маркетолог",
      email: "anna.kozlova@company.com",
      phone: "+7 (999) 567-89-01",
      photoUrl: "/photos/anna-kozlova.jpg",
      status: "FIRED",
      passCode: "EMP005",
      passStatus: "BLOCKED",
      passExpiryDate: "2024-11-30",
      createdAt: "2024-05-20T13:30:00Z",
      updatedAt: "2024-11-30T17:00:00Z",
    },
  ];

  const departments = [
    "IT-отдел",
    "Бухгалтерия",
    "Склад",
    "HR",
    "Маркетинг",
    "Продажи",
    "Производство",
    "СБ",
  ];

  const positions = [
    "Разработчик",
    "Главный бухгалтер",
    "Кладовщик",
    "Менеджер по персоналу",
    "Маркетолог",
    "Менеджер по продажам",
    "Инженер",
    "Специалист СБ",
  ];

  return {
    // Получить список всех сотрудников
    async listAll(filters = {}) {
      let filtered = [...records];

      if (filters.department) {
        filtered = filtered.filter(
          (emp) => emp.department === filters.department
        );
      }

      if (filters.status) {
        filtered = filtered.filter((emp) => emp.status === filters.status);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          (emp) =>
            emp.firstName.toLowerCase().includes(searchLower) ||
            emp.lastName.toLowerCase().includes(searchLower) ||
            emp.middleName?.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower) ||
            emp.passCode.toLowerCase().includes(searchLower)
        );
      }

      return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },

    // Получить сотрудника по ID
    async getById(id) {
      return records.find((emp) => emp.id === parseInt(id));
    },

    // Создать нового сотрудника
    async create(payload) {
      id += 1;
      const newEmployee = {
        id,
        status: "ACTIVE",
        passStatus: "ACTIVE",
        passCode: `EMP${String(id).padStart(3, "0")}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload,
      };
      records.unshift(newEmployee);
      return newEmployee;
    },

    // Обновить сотрудника
    async update(id, payload) {
      const index = records.findIndex((emp) => emp.id === parseInt(id));
      if (index >= 0) {
        records[index] = {
          ...records[index],
          ...payload,
          updatedAt: new Date().toISOString(),
        };
        return records[index];
      }
      throw new Error("Сотрудник не найден");
    },

    // Удалить сотрудника
    async delete(id) {
      const index = records.findIndex((emp) => emp.id === parseInt(id));
      if (index >= 0) {
        records.splice(index, 1);
        return true;
      }
      throw new Error("Сотрудник не найден");
    },

    // Блокировать/разблокировать пропуск
    async togglePassStatus(id) {
      const employee = records.find((emp) => emp.id === parseInt(id));
      if (employee) {
        employee.passStatus =
          employee.passStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        employee.updatedAt = new Date().toISOString();
        return employee;
      }
      throw new Error("Сотрудник не найден");
    },

    // Продлить пропуск
    async extendPass(id, newExpiryDate) {
      const employee = records.find((emp) => emp.id === parseInt(id));
      if (employee) {
        employee.passExpiryDate = newExpiryDate;
        employee.updatedAt = new Date().toISOString();
        return employee;
      }
      throw new Error("Сотрудник не найден");
    },

    // Получить справочники
    async getDepartments() {
      return departments;
    },

    async getPositions() {
      return positions;
    },

    // Статистика
    async getStats() {
      const total = records.length;
      const active = records.filter((emp) => emp.status === "ACTIVE").length;
      const onLeave = records.filter((emp) => emp.status === "ON_LEAVE").length;
      const fired = records.filter((emp) => emp.status === "FIRED").length;
      const activePasses = records.filter(
        (emp) => emp.passStatus === "ACTIVE"
      ).length;
      const blockedPasses = records.filter(
        (emp) => emp.passStatus === "BLOCKED"
      ).length;

      return {
        total,
        active,
        onLeave,
        fired,
        activePasses,
        blockedPasses,
      };
    },
  };
})();
