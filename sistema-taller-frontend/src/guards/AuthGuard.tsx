import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

const AuthGuard = () => {
  const isAuthenticated = isLoggedIn();
  
  if (isAuthenticated) {
    return <Outlet />; // Renderiza las rutas hijas
  }
  
  // Redirige al login si no está autenticado
  return <Navigate to="/login" replace />;
};

export default AuthGuard;