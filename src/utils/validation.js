// Утилиты для валидации форм
import { useState, useEffect } from "react";

// Базовые валидаторы
export const validators = {
  required: (value) => {
    if (!value || value.trim() === "") {
      return "Это поле обязательно для заполнения";
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Минимум ${min} символов`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Максимум ${max} символов`;
    }
    return null;
  },

  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Некорректный email";
    }
    return null;
  },

  phone: (value) => {
    if (value && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
      return "Некорректный номер телефона";
    }
    return null;
  },

  date: (value) => {
    if (value) {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(date.getTime())) {
        return "Некорректная дата";
      }

      if (date < today) {
        return "Дата не может быть в прошлом";
      }
    }
    return null;
  },

  carPlate: (value) => {
    if (value) {
      // Российский формат: A000AA77 или A000AA777
      const plateRegex = /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/i;
      if (!plateRegex.test(value.replace(/\s/g, ""))) {
        return "Некорректный формат госномера (например: A000AA77)";
      }
    }
    return null;
  },

  fullName: (value) => {
    if (value) {
      // Проверяем, что есть минимум 2 слова (имя и фамилия)
      const words = value.trim().split(/\s+/);
      if (words.length < 2) {
        return "Укажите имя и фамилию";
      }

      // Проверяем, что каждое слово начинается с заглавной буквы
      const nameRegex = /^[А-ЯЁ][а-яё]+$/;
      if (!words.every((word) => nameRegex.test(word))) {
        return "Имя и фамилия должны начинаться с заглавной буквы";
      }
    }
    return null;
  },
};

// Комбинированные валидаторы
export const createValidator =
  (...validators) =>
  (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };

// Валидация формы пропуска
export const validatePassRequest = (formData) => {
  const errors = {};

  // Обязательные поля
  if (!formData.fullName?.trim()) {
    errors.fullName = "Укажите ФИО";
  } else {
    const nameError = validators.fullName(formData.fullName);
    if (nameError) errors.fullName = nameError;
  }

  if (!formData.date) {
    errors.date = "Выберите дату";
  } else {
    const dateError = validators.date(formData.date);
    if (dateError) errors.date = dateError;
  }

  if (!formData.reason?.trim()) {
    errors.reason = "Укажите основание для пропуска";
  } else if (formData.reason.length < 5) {
    errors.reason = "Основание должно содержать минимум 5 символов";
  }

  // Валидация для автомобильного пропуска
  if (formData.passType === "car") {
    if (!formData.carBrand?.trim()) {
      errors.carBrand = "Укажите марку автомобиля";
    }

    if (!formData.carModel?.trim()) {
      errors.carModel = "Укажите модель автомобиля";
    }

    if (!formData.carPlate?.trim()) {
      errors.carPlate = "Укажите госномер";
    } else {
      const plateError = validators.carPlate(formData.carPlate);
      if (plateError) errors.carPlate = plateError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Хук для валидации поля в реальном времени
export const useFieldValidation = (value, validators) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const validationError = validators(value);
      setError(validationError);
    }
  }, [value, touched, validators]);

  const markAsTouched = () => setTouched(true);

  return { error, touched, markAsTouched };
};
