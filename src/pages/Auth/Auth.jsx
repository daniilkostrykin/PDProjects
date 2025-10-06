import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/utils/consts';
import { Context } from '../../context';
import classes from './Auth.module.css';


import Brand from '../../components/Auth/Brand/Brand';
import FormInput from '../../components/Auth/FormInput/FormInput';
import SubmitButton from '../../components/Auth/SubmitButton/SubmitButton';
import AuthSwitcher from '../../components/Auth/AuthSwitcher/AuthSwitcher';
import ResetButton from '../../components/Auth/ResetButton/ResetButton';
import Toast from '../../components/Auth/Toast/Toast';


const validateLogin = ({ email, password }) => {
  if (!email?.trim()) return 'Укажите email';
  if (!password?.trim()) return 'Введите пароль';
  return null;
};
const validateRegistration = ({ fullName, email, password, confirmedPassword }) => {
  if (!fullName?.trim()) return 'Укажите имя';
  if (!email?.trim()) return 'Укажите email';
  if (!password?.trim()) return 'Введите пароль';
  if (password !== confirmedPassword) return 'Пароли не совпадают';
  return null;
};

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const isRegistration = location.pathname === REGISTRATION_ROUTE;

  // форма
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  // состояние UI
  const [isLoading, setIsLoading]   = useState(false);
  const [toast, setToast]           = useState(null); // {type:'success'|'error', message:string, key:number}
  const pushToast = (type, message) => setToast({ type, message, key: Date.now() });

  useEffect(() => {
    // сбрасываем форму при переключении вкладок
    setFullName(''); setEmail(''); setPassword(''); setConfirmedPassword('');
  }, [location.pathname]);

  async function handleSubmit(e) {
    e.preventDefault();

    const err = isLogin
      ? validateLogin({ email, password })
      : validateRegistration({ fullName, email, password, confirmedPassword });

    if (err) { pushToast('error', err); return; }

    try {
      setIsLoading(true);
      if (isLogin) {
        await user.login({ email, password });
        pushToast('success', 'Успешный вход');
      } else {
        await user.register({ email, password, fullName });
        pushToast('success', 'Аккаунт создан');
      }
    } catch (e) {
      pushToast('error', e?.message || 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={classes?.container || ''} style={{ maxWidth: 380, margin: '40px auto' }}>
      <Brand />

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        {!isLogin && (
          <FormInput
            value={fullName}
            onChange={e=>setFullName(e.target.value)}
            type="text"
            placeholder="Имя и фамилия"
          />
        )}

        <FormInput
          value={email}
          onChange={e=>setEmail(e.target.value)}
          type="email"
          placeholder="Электронная почта"
        />

        <FormInput
          value={password}
          onChange={e=>setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          containerStyle={{ marginBottom: isLogin ? 8 : 0 }}
        />

        {!isLogin && (
          <FormInput
            value={confirmedPassword}
            onChange={e=>setConfirmedPassword(e.target.value)}
            type="password"
            placeholder="Подтвердите пароль"
            containerStyle={{ marginTop: 8 }}
          />
        )}

        {isLogin && (
          <div style={{ marginTop: 6, marginBottom: 10 }}>
            <ResetButton />
          </div>
        )}

        <SubmitButton isLoading={isLoading}>
          {isLogin ? 'Войти' : 'Создать аккаунт'}
        </SubmitButton>
      </form>

      <div style={{ marginTop: 10 }}>
        <AuthSwitcher to={isRegistration ? LOGIN_ROUTE : REGISTRATION_ROUTE}>
          {isRegistration ? 'Войти' : 'Создать аккаунт'}
        </AuthSwitcher>
      </div>

      {toast && (
        <Toast key={toast.key} type={toast.type} message={toast.message} duration={3000} />
      )}
    </div>
  );
});

export default Auth;
