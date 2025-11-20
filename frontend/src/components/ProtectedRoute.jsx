import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/context';

const ProtectedRoute = observer(({ children }) => {
  const { user } = useContext(Context);
 // const location = useLocation();
  //ВКЛЮЧИТЬ ЗАЩИТУ 
 /* if (!user.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }*/
  return children;
});
export default ProtectedRoute;
