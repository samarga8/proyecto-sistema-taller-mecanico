import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../services/authService';

const AdminGuard = () => {
  const isAuthenticated = isLoggedIn();
  const userRole = getUserRole();
  
  console.log('AdminGuard - Autenticado:', isAuthenticated);
  console.log('AdminGuard - Rol:', userRole);
  
  const isAdmin = userRole === 'ADMINISTRADOR' || userRole === 'ROLE_ADMINISTRADOR';
  console.log('AdminGuard - ¿Es ADMINISTRADOR?:', isAdmin);
  
  if (isAuthenticated && isAdmin) {
    console.log('AdminGuard - Acceso permitido');
    return <Outlet />; // Renderiza las rutas hijas
  }
  
  console.log('AdminGuard - Redirigiendo al login');
  // Redirige al login si no está autenticado o no tiene el rol adecuado
  return <Navigate to="/login" replace />;
};

export default AdminGuard;