import React, { useState } from 'react';
import AuthService from '../../services/auth.service';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|null>(null);
  const [ok, setOk] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(null);
    setLoading(true);
    try {
      // простая клиентская проверка
      if (password.length < 8) {
        throw new Error('Пароль должен быть не короче 8 символов');
      }
      await AuthService.register(email.trim(), password, fullName.trim());
      setOk('Регистрация успешна! Теперь войдите.');
      // Можно сразу редиректить на логин:
      // window.location.href = '/login';
    } catch (err: any) {
      // обработка 400/409 от бэка
      const msg = err?.response?.data?.message
        || err?.response?.data?.error
        || err?.message
        || 'Ошибка регистрации';
      setError(typeof msg === 'string' ? msg : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Регистрация</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="ФИО"
            className="w-full border rounded p-2"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {ok && <p className="text-green-600 text-sm">{ok}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Зарегистрироваться'}
          </button>

          <p className="text-center text-sm">
            Уже есть аккаунт?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Войти</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
