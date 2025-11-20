import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthSwitcher from './AuthSwitcher';

describe('AuthSwitcher', () => {
  test('renders with correct link text and destination', () => {
    render(
      <Router>
        <AuthSwitcher to="/login">
          Уже есть аккаунт? Войти
        </AuthSwitcher>
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /Уже есть аккаунт\? Войти/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});