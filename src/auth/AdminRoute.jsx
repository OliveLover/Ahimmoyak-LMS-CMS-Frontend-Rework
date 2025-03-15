import { Navigate, Outlet } from 'react-router-dom';
import { hasAdminRole } from './auth';

const AdminRoute = () => {
  return hasAdminRole() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
