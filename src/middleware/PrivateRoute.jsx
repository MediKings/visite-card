import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = localStorage.getItem('token');
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;