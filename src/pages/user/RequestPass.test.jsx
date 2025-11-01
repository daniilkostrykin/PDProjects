import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestPass from './RequestPass';
import { Context } from '../../context';
import UserStore from '../../store/UserStore';
import { PassesApi } from '../../services/api/passes.api';

// Мокируем (подменяем) API, чтобы не делать реальный запрос
jest.mock('../../services/api/passes.api');

describe('RequestPass Page', () => {
  let userStore;

  beforeEach(() => {
    // Перед каждым тестом создаем новый UserStore
    userStore = new UserStore();
    // Устанавливаем "залогиненного" пользователя
    userStore.setUser({ id: 1, email: 'test@test.com', role: 'USER' });
    userStore.setAuth(true);
    // Очищаем мок перед каждым тестом
    PassesApi.create.mockClear();
  });

  // Функция для удобного рендеринга компонента с контекстом
  const renderComponent = () => {
    return render(
      <Context.Provider value={{ user: userStore }}>
        <Router>
          <RequestPass />
        </Router>
      </Context.Provider>
    );
  };

  test('should call create pass API on form submit', async () => {
    // Говорим, что при вызове PassesApi.create нужно вернуть успешный ответ
    PassesApi.create.mockResolvedValue({ id: 123, status: 'PENDING' });

    renderComponent();

    // Находим поля и заполняем их
    fireEvent.change(screen.getByPlaceholderText(/ФИО посетителя/i), { target: { value: 'Тестов Тест Тестович' } });
    
    // Находим кнопку и кликаем на нее
    fireEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    // Ждем, пока будет вызван наш мок API
    await waitFor(() => {
      // Проверяем, что функция create была вызвана 1 раз
      expect(PassesApi.create).toHaveBeenCalledTimes(1);

      // Проверяем, что она была вызвана с правильными данными
      expect(PassesApi.create).toHaveBeenCalledWith(
        expect.objectContaining({
          fullName: 'Тестов Тест Тестович',
        })
      );
    });
  });
});