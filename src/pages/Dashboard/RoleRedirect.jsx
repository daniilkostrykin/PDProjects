import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context'
import { ADMIN_HOME, USER_REQUEST } from '../../utils/consts'

export default function RoleRedirect() {
  const { user } = useContext(Context)
  const isAdmin = typeof user.isAdmin === 'boolean'
    ? user.isAdmin
    : Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')

  return <Navigate to={isAdmin ? ADMIN_HOME : USER_REQUEST} replace />
}
