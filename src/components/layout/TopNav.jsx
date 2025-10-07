import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context'
import {
  // user
  USER_REQUEST, USER_PASSES, USER_PROFILE,
  // admin
  ADMIN_HOME, ADMIN_QUEUE, ADMIN_APPROVED, ADMIN_EMPLOYEES, ADMIN_REPORTS, ADMIN_SETTINGS,
  DASHBOARD_ROUTE
} from '../../utils/consts'

export default function TopNav() {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  // Универсальный флаг админа: берём либо готовый user.isAdmin, либо из ролей.
  const isAdmin = typeof user.isAdmin === 'boolean'
    ? user.isAdmin
    : Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')

  const onLogout = async () => {
    // не трогаю твою реализацию — просто вызываю её
    await user.logout?.()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topnav">
      <NavLink to={DASHBOARD_ROUTE} className="brand">AutoPass</NavLink>

      <nav className="links">
        {!isAdmin && (
          <>
            <NavLink to={USER_REQUEST}>Оформить пропуск</NavLink>
            <NavLink to={USER_PASSES}>Мои пропуска</NavLink>
            <NavLink to={USER_PROFILE}>Профиль</NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <NavLink to={ADMIN_HOME}>Статистика</NavLink>
            <NavLink to={ADMIN_QUEUE}>Очередь</NavLink>
            <NavLink to={ADMIN_APPROVED}>Одобренные</NavLink>
            <NavLink to={ADMIN_EMPLOYEES}>Сотрудники</NavLink>
            <NavLink to={ADMIN_REPORTS}>Отчёты</NavLink>
            <NavLink to={ADMIN_SETTINGS}>Настройки</NavLink>
          </>
        )}
      </nav>

      <div className="spacer" />
      <button className="btn" onClick={onLogout}>Выйти</button>
    </header>
  )
}
