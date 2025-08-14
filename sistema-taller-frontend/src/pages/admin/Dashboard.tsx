import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import {
  Calendar,
  Car,
  Users,
  Wrench,
  ClipboardList,
  Package,
  Receipt,
  BarChart,
  Settings,
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  ChevronRight,
  Plus,
  Clock
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { getUser, getUserRole, logout } from "../../services/authService";

// Definir interfaces para los enlaces
interface SubItem {
  path: string;
  label: string;
}

interface NavLink {
  path: string;
  label: string;
  icon: string;
  subItems?: SubItem[];
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Función auxiliar para verificar roles
  const hasRole = (role: string) => {
    const userRole = getUserRole();
    return userRole === role;
  };

  // Función para obtener la ruta base según el rol
  const getBaseRoute = () => {
    if (hasRole('ADMINISTRADOR')) return '/admin';
    if (hasRole('MECANICO')) return '/mecanico';
    return '/dashboard';
  };
  
  useEffect(() => {
    // Obtener la información del usuario desde localStorage
    const user = getUser();
    console.log('Usuario obtenido:', user);
    
    if (user) {
      setCurrentUser(user);
      
      // Calcular isAdmin DESPUÉS de cargar el usuario
      const role = getUserRole();
      console.log('Rol detectado:', role);
      
      // Verificar si es administrador usando la función hasRole
      // Nota: esta verificación se hará en el siguiente render cuando currentUser esté actualizado
    } else {
      console.log('No hay usuario logueado');
      setCurrentUser(null);
    }
  }, []);
  
  // Agregar otro useEffect para verificar cuando currentUser cambie
  useEffect(() => {
    if (currentUser) {
      const isAdmin = hasRole('ADMINISTRADOR');
      console.log('¿Es administrador?:', isAdmin);
      console.log('Enlaces generados:', getLinks());
    }
  }, [currentUser]); // Se ejecuta cuando currentUser cambia
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Búsqueda realizada: ${searchQuery}`);
  };
  
  // Definir los enlaces según el rol del usuario
const getLinks = (): NavLink[] => {
  if (!currentUser) return [];

  const isAdmin = hasRole("ADMINISTRADOR");
  const isMecanico = hasRole("MECANICO");

  const links: NavLink[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'BarChart'
    }
  ];

  // Enlaces para administradores y mecánicos
  if (isAdmin || isMecanico) {
    links.push(
      {
        path: '/empleados',
        label: 'Empleados',
        icon: 'Users'
      },
      {
        path: '/reparaciones',
        label: 'Reparaciones',
        icon: 'Wrench',
        subItems: [
          { path: '/reparaciones/activas', label: 'Activas' },
          { path: '/reparaciones/historial', label: 'Historial' }
        ]
      }
    );
  }

  // Enlaces solo para administradores
  if (isAdmin) {
    links.push(
      {
        path: '/clientes',
        label: 'Clientes',
        icon: 'Users'
      },
      {
        path: '/vehiculos',
        label: 'Vehículos',
        icon: 'Car'
      },
      {
        path: '/ordenes-trabajo',
        label: 'Órdenes de trabajo',
        icon: 'ClipboardList'
      },
      {
        path: '/facturacion',
        label: 'Facturación',
        icon: 'Receipt'
      },
      {
        path: '/inventario',
        label: 'Inventario',
        icon: 'Package'
      },
      {
        path: '/citas',
        label: 'Citas',
        icon: 'Calendar'
      }
    );
  }

  return links;
};

  
  // Obtener los enlaces según el rol del usuario
  const links = getLinks();
  
  return (
    <>
      <Helmet>
        <title>Dashboard | AutoTaller</title>
      </Helmet>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen bg-background">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center space-x-2 px-2">
                <Car className="h-6 w-6 text-secondary" />
                <span className="font-bold text-lg">
                  <span className="text-primary">Auto</span>
                  <span className="text-secondary">Taller</span>
                </span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {links.map((link, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild isActive={link.path.includes('/dashboard')}>
                      <Link to={`${getBaseRoute()}${link.path}`}>
                        {/* Renderizar el icono dinámicamente */}
                        {link.icon === "BarChart" && <BarChart className="h-4 w-4 mr-3" />}
                        {link.icon === "Users" && <Users className="h-4 w-4 mr-3" />}
                        {link.icon === "Car" && <Car className="h-4 w-4 mr-3" />}
                        {link.icon === "Wrench" && <Wrench className="h-4 w-4 mr-3" />}
                        {link.icon === "ClipboardList" && <ClipboardList className="h-4 w-4 mr-3" />}
                        {link.icon === "Receipt" && <Receipt className="h-4 w-4 mr-3" />}
                        {link.icon === "Package" && <Package className="h-4 w-4 mr-3" />}
                        {link.icon === "Calendar" && <Calendar className="h-4 w-4 mr-3" />}
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    
                    {/* Renderizar subitems si existen */}
                    {link.subItems && link.subItems.length > 0 && (
                      <SidebarMenuSub>
                        {link.subItems.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            <SidebarMenuSubButton asChild>
                              <Link to={`${getBaseRoute()}${subItem.path}`}>
                                {subItem.label}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter>
              <div className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="/avatar.png" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      {currentUser && (
                        <span className="text-sm">
                          {currentUser.username || currentUser.sub || 'Usuario'}
                          {hasRole('ADMINISTRADOR') && (
                            <span className="block text-xs text-muted-foreground">Administrador</span>
                          )}
                          {hasRole('MECANICO') && (
                            <span className="block text-xs text-muted-foreground">Mecánico</span>
                          )}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {logout(); window.location.href='/login';}}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          {/* Contenido principal */}
          <SidebarInset>
            {/* Barra superior */}
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger />
              
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid gap-1">
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex items-start gap-2 py-1">
                        <span className="mt-0.5">
                          <CheckCircleIcon />
                        </span>
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">Reparación completada</p>
                          <p className="text-xs text-muted-foreground">La reparación #1234 ha sido completada</p>
                          <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex items-start gap-2 py-1">
                        <span className="mt-0.5">
                          <UserPlusIcon />
                        </span>
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">Nuevo cliente registrado</p>
                          <p className="text-xs text-muted-foreground">Juan Pérez se ha registrado</p>
                          <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex items-start gap-2 py-1">
                        <span className="mt-0.5">
                          <CalendarIcon />
                        </span>
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">Nueva cita programada</p>
                          <p className="text-xs text-muted-foreground">Cita para mañana a las 10:00 AM</p>
                          <p className="text-xs text-muted-foreground">Hace 3 horas</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-center text-sm">
                    Ver todas las notificaciones
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            
            {/* Contenido principal */}
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8 md:gap-8">
              {/* Resto del contenido... */}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

// Activity Icons
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;

export default Dashboard;