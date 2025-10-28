import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context'
import { HOME_ROUTE } from '../../utils/consts'

export default function RoleRedirect() {
  const { user } = useContext(Context)
  //ВКЛЮЧИТЬ ЗАЩИТУ 
  /*const isAdmin = typeof user.isAdmin === 'boolean'
    ? user.isAdmin
    : Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')
*/
  const isAdmin = true; // <-- ИЗМЕНЕНИЕ

  return <Navigate to={HOME_ROUTE} replace />
}
