import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './Auth';
import UserStore from '../../store/UserStore';
import { loginApi } from '../../http/userApi';
import { Context } from '../../context';

jest.mock('../../http/userApi');

describe('Auth Page', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
    loginApi.mockClear();
  });

  const renderComponent = () => {
    return render(
      <Context.Provider value={{ user: userStore }}>
        <Router>
          <Auth />
        </Router>
      </Context.Provider>
    );
  };

  test('should call login on form submit', async () => {
    loginApi.mockResolvedValue({ id: 1, email: 'test@test.com', role: 'USER' });

    renderComponent();

    fireEvent.click(screen.getByRole('link', { name: /Создать аккаунт/i }));
    fireEvent.click(screen.getByRole('link', { name: /Войти/i }));

    fireEvent.change(screen.getByPlaceholderText('Электронная почта'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(loginApi).toHaveBeenCalledTimes(1);
      expect(loginApi).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
    });
  });
});