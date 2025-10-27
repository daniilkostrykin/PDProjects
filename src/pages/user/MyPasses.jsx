import { useEffect, useMemo, useState } from "react";
import { PassesApi } from "@/services/api/passes.api";

const STATUS_OPTIONS = [
  { label: "Все", value: "" },
  { label: "Ожидают", value: "PENDING" },
  { label: "Одобрены", value: "APPROVED" },
  { label: "Отклонены", value: "REJECTED" },
];

const DATE_FILTER_OPTIONS = [
  { label: "Все даты", value: "" },
  { label: "Сегодня", value: "today" },
  { label: "Завтра", value: "tomorrow" },
  { label: "На этой неделе", value: "thisWeek" },
  { label: "На следующей неделе", value: "nextWeek" },
  { label: "В этом месяце", value: "thisMonth" },
  { label: "Прошлый месяц", value: "lastMonth" },
  { label: "Произвольный диапазон", value: "custom" },
];

const SORT_OPTIONS = [
  { label: "Дата визита", value: "visitDate" },
  { label: "Дата создания", value: "createdAt" },
  { label: "Статус", value: "status" },
  { label: "ФИО", value: "fullName" },
];

const SORT_ORDER_OPTIONS = [
  { label: "По убыванию", value: "desc" },
  { label: "По возрастанию", value: "asc" },
];

export default function MyPasses() {
  const [status, setStatus] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");
  const [sortBy, setSortBy] = useState("visitDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  // Функции для работы с датами
  const getDateRange = (filter) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const nextWeekStart = new Date(endOfWeek);
    nextWeekStart.setDate(endOfWeek.getDate() + 1);
    nextWeekStart.setHours(0, 0, 0, 0);
    
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    nextWeekEnd.setHours(23, 59, 59, 999);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    lastMonthEnd.setHours(23, 59, 59, 999);

    switch (filter) {
      case "today":
        return {
          from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          to: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
        };
      case "tomorrow":
        return {
          from: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()),
          to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999)
        };
      case "thisWeek":
        return { from: startOfWeek, to: endOfWeek };
      case "nextWeek":
        return { from: nextWeekStart, to: nextWeekEnd };
      case "thisMonth":
        return { from: startOfMonth, to: endOfMonth };
      case "lastMonth":
        return { from: lastMonthStart, to: lastMonthEnd };
      case "custom":
        return {
          from: customDateFrom ? new Date(customDateFrom) : null,
          to: customDateTo ? new Date(customDateTo) : null
        };
      default:
        return null;
    }
  };

  const isDateInRange = (date, range) => {
    if (!range || !date) return true;
    const checkDate = new Date(date);
    if (range.from && checkDate < range.from) return false;
    if (range.to && checkDate > range.to) return false;
    return true;
  };

  const items = useMemo(() => {
    if (!data) return [];
    let items = Array.isArray(data) ? data : Array.isArray(data.content) ? data.content : Array.isArray(data.items) ? data.items : [];
    
    // Фильтрация по дате
    if (dateFilter) {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        items = items.filter(item => isDateInRange(item.visitDate, dateRange));
      }
    }
    
    // Сортировка
    items.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "visitDate":
          aValue = new Date(a.visitDate);
          bValue = new Date(b.visitDate);
          break;
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "fullName":
          aValue = a.fullName?.toLowerCase() || "";
          bValue = b.fullName?.toLowerCase() || "";
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    
    return items;
  }, [data, dateFilter, customDateFrom, customDateTo, sortBy, sortOrder]);

  const totalPages = useMemo(() => {
    if (!data) return 0;
    if (typeof data.totalPages === "number") return data.totalPages;
    if (typeof data.totalElements === "number") {
      return Math.max(1, Math.ceil(data.totalElements / size));
    }
    return items.length > 0 ? 1 : 0;
  }, [data, size, items.length]);

  // Добавляем отладочный вывод
  useEffect(() => {
    if (data) {
      console.log("📊 Данные пропусков получены:", data);
      console.log("📊 Элементы для отображения:", items);
    }
  }, [data, items]);

  const fetchPasses = async () => {
    setLoading(true);
    setError("");
    try {
      // Мок-данные для тестирования
      const mockData = {
        content: [
          {
            id: 1,
            type: "CAR",
            visitDate: "2024-01-15",
            fullName: "Иванов Иван Иванович",
            reason: "Деловая встреча с руководством",
            validityPeriod: "8h",
            carBrand: "Toyota",
            carModel: "Camry",
            carPlate: "А123БВ777",
            status: "PENDING",
            createdAt: "2024-01-10T10:30:00Z",
            invitedBy: "Петров П.П.",
            validFrom: "2024-01-15T08:00:00Z",
            validTo: "2024-01-15T18:00:00Z"
          },
          {
            id: 2,
            type: "PSH",
            visitDate: "2024-01-12",
            fullName: "Сидоров Сидор Сидорович",
            reason: "Техническое обслуживание оборудования",
            validityPeriod: "1d",
            carBrand: null,
            carModel: null,
            carPlate: null,
            status: "APPROVED",
            createdAt: "2024-01-08T14:20:00Z",
            invitedBy: "Козлов К.К.",
            validFrom: "2024-01-12T09:00:00Z",
            validTo: "2024-01-12T17:00:00Z"
          },
          {
            id: 3,
            type: "CAR",
            visitDate: "2024-01-08",
            fullName: "Кузнецов Кузьма Кузьмич",
            reason: "Поставка материалов",
            validityPeriod: "4h",
            carBrand: "Volkswagen",
            carModel: "Transporter",
            carPlate: "В456ГД123",
            status: "REJECTED",
            createdAt: "2024-01-05T16:45:00Z",
            invitedBy: null,
            validFrom: null,
            validTo: null
          },
          {
            id: 4,
            type: "CAR",
            visitDate: "2024-01-20",
            fullName: "Морозов Мороз Морозович",
            reason: "Консультация по проекту",
            validityPeriod: "1w",
            carBrand: "BMW",
            carModel: "X5",
            carPlate: "С789ЕЖ456",
            status: "PENDING",
            createdAt: "2024-01-18T11:15:00Z",
            invitedBy: "Соколов С.С.",
            validFrom: "2024-01-20T10:00:00Z",
            validTo: "2024-01-20T16:00:00Z"
          }
        ],
        totalElements: 4,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        last: true
      };

      // Фильтрация мок-данных по статусу
      let filteredContent = mockData.content;
      if (status) {
        filteredContent = mockData.content.filter(pass => pass.status === status);
      }

      const filteredData = {
        ...mockData,
        content: filteredContent,
        totalElements: filteredContent.length
      };

      console.log("🎭 Используются мок-данные:", filteredData);
      setData(filteredData);

      // Раскомментируйте для реального API:
      // const response = await PassesApi.listMine({ status: status || undefined, page, size });
      // setData(response);
    } catch (e) {
      console.error("Ошибка загрузки пропусков:", e);
      setError("Не удалось загрузить пропуска. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page, size]);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest('[data-menu-container]')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setPage(0);
  };

  const onChangeDateFilter = (e) => {
    setDateFilter(e.target.value);
    setPage(0);
  };

  const onChangeCustomDateFrom = (e) => {
    setCustomDateFrom(e.target.value);
    setPage(0);
  };

  const onChangeCustomDateTo = (e) => {
    setCustomDateTo(e.target.value);
    setPage(0);
  };

  const onChangeSortBy = (e) => {
    setSortBy(e.target.value);
    setPage(0);
  };

  const onChangeSortOrder = (e) => {
    setSortOrder(e.target.value);
    setPage(0);
  };

  // Функции быстрых действий
  const handleEdit = (pass) => {
    console.log("Редактировать пропуск:", pass);
    // TODO: Реализовать редактирование
    alert(`Редактирование пропуска #${pass.id} будет реализовано позже`);
  };

  const handleCancel = (pass) => {
    if (confirm(`Вы уверены, что хотите отменить пропуск #${pass.id}?`)) {
      console.log("Отменить пропуск:", pass);
      // TODO: Реализовать отмену
      alert(`Отмена пропуска #${pass.id} будет реализована позже`);
    }
  };

  const handleRepeat = (pass) => {
    console.log("Повторить пропуск:", pass);
    // TODO: Реализовать повторение
    alert(`Повторение пропуска #${pass.id} будет реализовано позже`);
  };

  const handleCopy = (pass) => {
    const passData = {
      ФИО: pass.fullName,
      Дата: formatDate(pass.visitDate),
      "Срок действия": formatValidityPeriod(pass.validityPeriod),
      Основание: pass.reason,
      Тип: pass.type === "CAR" ? "Автомобильный" : "Пеший",
      ...(pass.type === "CAR" && {
        Марка: pass.carBrand,
        Модель: pass.carModel,
        Госномер: pass.carPlate
      })
    };

    const text = Object.entries(passData)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      alert("Данные пропуска скопированы в буфер обмена!");
    }).catch(() => {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert("Данные пропуска скопированы в буфер обмена!");
    });
  };

  const toggleMenu = (passId) => {
    setActiveMenu(activeMenu === passId ? null : passId);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const formatDate = (v) => {
    if (!v) return "—";
    try {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return String(v);
      return d.toLocaleString();
    } catch (_) {
      return String(v);
    }
  };

  const formatValidityPeriod = (period) => {
    if (!period) return "—";
    const periodMap = {
      "1h": "1 час",
      "2h": "2 часа", 
      "4h": "4 часа",
      "8h": "8 часов",
      "1d": "1 день",
      "3d": "3 дня",
      "1w": "1 неделя",
      "1m": "1 месяц"
    };
    return periodMap[period] || period;
  };

  return (
    <div>
      <h2>Мои пропуска</h2>

      {/* Фильтры и сортировка */}
      <div style={{ 
        background: "#f8fafc", 
        padding: 16, 
        borderRadius: 8, 
        marginBottom: 20,
        border: "1px solid #e2e8f0"
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: 16,
          marginBottom: 16
        }}>
          {/* Фильтр по статусу */}
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: 600, 
              color: "#374151", 
              marginBottom: 4,
              fontSize: 14
            }}>
              Статус
            </label>
            <select 
              value={status} 
              onChange={onChangeStatus}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 14,
                background: "#ffffff"
              }}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value || "ALL"} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Фильтр по дате */}
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: 600, 
              color: "#374151", 
              marginBottom: 4,
              fontSize: 14
            }}>
              Дата визита
            </label>
            <select 
              value={dateFilter} 
              onChange={onChangeDateFilter}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 14,
                background: "#ffffff"
              }}
            >
              {DATE_FILTER_OPTIONS.map((o) => (
                <option key={o.value || "ALL"} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Сортировка */}
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: 600, 
              color: "#374151", 
              marginBottom: 4,
              fontSize: 14
            }}>
              Сортировать по
            </label>
            <select 
              value={sortBy} 
              onChange={onChangeSortBy}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 14,
                background: "#ffffff"
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Порядок сортировки */}
          <div>
            <label style={{ 
              display: "block", 
              fontWeight: 600, 
              color: "#374151", 
              marginBottom: 4,
              fontSize: 14
            }}>
              Порядок
            </label>
            <select 
              value={sortOrder} 
              onChange={onChangeSortOrder}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 14,
                background: "#ffffff"
              }}
            >
              {SORT_ORDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Произвольный диапазон дат */}
        {dateFilter === "custom" && (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 12,
            padding: 12,
            background: "#ffffff",
            borderRadius: 6,
            border: "1px solid #d1d5db"
          }}>
            <div>
              <label style={{ 
                display: "block", 
                fontWeight: 500, 
                color: "#374151", 
                marginBottom: 4,
                fontSize: 13
              }}>
                От даты
              </label>
              <input
                type="date"
                value={customDateFrom}
                onChange={onChangeCustomDateFrom}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  fontSize: 13
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: "block", 
                fontWeight: 500, 
                color: "#374151", 
                marginBottom: 4,
                fontSize: 13
              }}>
                До даты
              </label>
              <input
                type="date"
                value={customDateTo}
                onChange={onChangeCustomDateTo}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  fontSize: 13
                }}
              />
            </div>
          </div>
        )}

        {/* Счетчик результатов */}
        <div style={{ 
          marginTop: 12, 
          fontSize: 13, 
          color: "#6b7280",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <span>📊</span>
          <span>Найдено: {items.length} пропусков</span>
          {(status || dateFilter) && (
            <button
              onClick={() => {
                setStatus("");
                setDateFilter("");
                setCustomDateFrom("");
                setCustomDateTo("");
                setPage(0);
              }}
              style={{
                marginLeft: "auto",
                padding: "4px 8px",
                fontSize: 12,
                color: "#6b7280",
                background: "transparent",
                border: "1px solid #d1d5db",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </div>

      {loading && <div>Загрузка…</div>}
      {error && <div style={{ color: "#d00" }}>{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div style={{ opacity: 0.8 }}>Пропуска не найдены.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ display: "grid", gap: 16 }}>
          {items.map((p) => (
            <div
              key={p.id || `${p.visitDate}-${p.createdAt}`}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Заголовок карточки */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    background: p.type === "CAR" ? "#3b82f6" : "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}>
                    {p.type === "CAR" ? "🚗" : "🚶"}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                      #{p.id || "—"}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {formatDate(p.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {/* Статус с иконкой */}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 20,
                      background: p.status === "APPROVED" ? "#dcfce7" : p.status === "REJECTED" ? "#fef2f2" : "#fef3c7",
                      color: p.status === "APPROVED" ? "#166534" : p.status === "REJECTED" ? "#dc2626" : "#d97706",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {p.status === "APPROVED" ? "✅" : p.status === "REJECTED" ? "❌" : "⏳"}
                    {p.status === "PENDING" ? "Ожидает" : p.status === "APPROVED" ? "Одобрен" : p.status === "REJECTED" ? "Отклонен" : p.status}
                  </span>
                  
                  {/* Тип с иконкой */}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 12px",
                      borderRadius: 20,
                      background: p.type === "CAR" ? "#dbeafe" : "#f3f4f6",
                      color: p.type === "CAR" ? "#1e40af" : "#374151",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {p.type === "CAR" ? "🚗" : "🚶"}
                    {p.type === "CAR" ? "Авто" : p.type === "PSH" ? "Пеший" : p.type}
                  </span>

                  {/* Меню действий */}
                  <div style={{ position: "relative" }} data-menu-container>
                    <button
                      onClick={() => toggleMenu(p.id)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border: "1px solid #d1d5db",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "#6b7280",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f9fafb";
                        e.target.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#ffffff";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    >
                      ⋯
                    </button>

                    {/* Выпадающее меню */}
                    {activeMenu === p.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          marginTop: 4,
                          background: "#ffffff",
                          border: "1px solid #d1d5db",
                          borderRadius: 8,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          zIndex: 10,
                          minWidth: 160,
                        }}
                      >
                        <button
                          onClick={() => { handleEdit(p); closeMenu(); }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "none",
                            background: "transparent",
                            textAlign: "left",
                            fontSize: 14,
                            color: "#374151",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            transition: "background 0.2s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#f9fafb"}
                          onMouseLeave={(e) => e.target.style.background = "transparent"}
                        >
                          ✏️ Редактировать
                        </button>
                        
                        {p.status === "PENDING" && (
                          <button
                            onClick={() => { handleCancel(p); closeMenu(); }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "none",
                              background: "transparent",
                              textAlign: "left",
                              fontSize: 14,
                              color: "#dc2626",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              transition: "background 0.2s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.background = "#fef2f2"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}
                          >
                            ❌ Отменить
                          </button>
                        )}

                        {(p.status === "APPROVED" || p.status === "REJECTED") && (
                          <button
                            onClick={() => { handleRepeat(p); closeMenu(); }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "none",
                              background: "transparent",
                              textAlign: "left",
                              fontSize: 14,
                              color: "#3b82f6",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              transition: "background 0.2s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.background = "#f0f9ff"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}
                          >
                            🔄 Повторить
                          </button>
                        )}

                        <button
                          onClick={() => { handleCopy(p); closeMenu(); }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "none",
                            background: "transparent",
                            textAlign: "left",
                            fontSize: 14,
                            color: "#374151",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            transition: "background 0.2s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#f9fafb"}
                          onMouseLeave={(e) => e.target.style.background = "transparent"}
                        >
                          📋 Скопировать данные
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Основная информация */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: "#111827", 
                  marginBottom: 4,
                  lineHeight: 1.3
                }}>
                  {p.fullName}
                </div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 600, 
                  color: "#3b82f6",
                  marginBottom: 8
                }}>
                  📅 {formatDate(p.visitDate)}
                </div>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 500,
                  color: "#059669",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  ⏱️ Срок действия: {formatValidityPeriod(p.validityPeriod)}
                </div>
                <div style={{ 
                  fontSize: 14, 
                  color: "#4b5563",
                  lineHeight: 1.4
                }}>
                  {p.reason}
                </div>
              </div>

              {/* Автомобильная информация */}
              {p.type === "CAR" && (p.carBrand || p.carModel || p.carPlate) && (
                <div style={{ 
                  padding: 16, 
                  background: "#f8fafc", 
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  marginBottom: 16
                }}>
                  <div style={{ 
                    fontSize: 14, 
                    fontWeight: 600, 
                    color: "#374151", 
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}>
                    🚗 Автомобиль
                  </div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {p.carBrand && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#6b7280" }}>Марка:</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>{p.carBrand}</span>
                      </div>
                    )}
                    {p.carModel && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#6b7280" }}>Модель:</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>{p.carModel}</span>
                      </div>
                    )}
                    {p.carPlate && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#6b7280" }}>Госномер:</span>
                        <span style={{ 
                          fontSize: 14, 
                          fontWeight: 600, 
                          fontFamily: "monospace", 
                          color: "#1f2937",
                          background: "#e5e7eb",
                          padding: "2px 8px",
                          borderRadius: 4
                        }}>
                          {p.carPlate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Дополнительная информация */}
              <div style={{ 
                display: "flex", 
                gap: 20, 
                flexWrap: "wrap", 
                fontSize: 12, 
                color: "#6b7280",
                paddingTop: 12,
                borderTop: "1px solid #f3f4f6"
              }}>
                {p.validFrom && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>🕐</span>
                    <span>С {formatDate(p.validFrom)}</span>
                  </div>
                )}
                {p.validTo && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>🕐</span>
                    <span>До {formatDate(p.validTo)}</span>
                  </div>
                )}
                {p.invitedBy && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>👤</span>
                    <span>Пригласил: {p.invitedBy}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
          <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Назад</button>
          <span style={{ opacity: 0.8 }}>
            Стр. {page + 1} из {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
}
