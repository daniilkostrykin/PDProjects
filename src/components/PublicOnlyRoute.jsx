import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/context';

const PublicOnlyRoute = observer(({ children }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  if (user.isAuth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
});
export default PublicOnlyRoute;
