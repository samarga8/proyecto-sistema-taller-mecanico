import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../services/authService';

const MecanicoGuard = () => {
  const isAuthenticated = isLoggedIn();
  const userRole = getUserRole();
  
  if (isAuthenticated && userRole === 'MECANICO') {
    return <Outlet />; // Renderiza las rutas hijas
  }
  
  // Redirige al login si no está autenticado o no tiene el rol adecuado
  return <Navigate to="/login" replace />;
};

export default MecanicoGuard;