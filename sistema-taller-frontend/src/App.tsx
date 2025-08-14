import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RecoverPassword from "./pages/RecoverPassword";
import Dashboard from "./pages/admin/Dashboard";
// Importar los guards
import AuthGuard from "./guards/AuthGuard";
import AdminGuard from "./guards/AdminGuard";
import MecanicoGuard from "./guards/MecanicoGuard";
import Clientes from "./pages/admin/Clientes/Clientes";
import Vehiculos from "./pages/admin/Vehiculos/Vehiculos";
import Reparaciones from "./pages/admin/Reparaciones/Reparaciones";

import ReparacionesHistorial from "./pages/admin/Reparaciones/ReparacionesHistorial";
import ClienteDetalle from "./pages/admin/Clientes/ClienteDetalle";
import EditarCliente from "./pages/admin/Clientes/EditarCliente";
import ClienteVehiculo from "./pages/admin/Clientes/ClienteVehiculo";
import NuevoVehiculo from "./pages/admin/Vehiculos/NuevoVehiculo";
import VehiculoDetalle from "./pages/admin/Vehiculos/VehiculoDetalle";
import EditarVehiculo from "./pages/admin/Vehiculos/EditarVehiculo";
import NuevaOrdenServicio from "./pages/admin/Vehiculos/NuevaOrdenServicio";
import ReparacionesActivas from "./pages/admin/Reparaciones/ReparacionesActivas";
import NuevaReparacion from "./pages/admin/Reparaciones/NuevaReparacion";
import Inventario from "./pages/admin/Inventario/Inventario";
import NuevoProducto from "./pages/admin/Inventario/NuevoProducto";
import ProductoDetalle from "./pages/admin/Inventario/ProductoDetalle";
import EditarProducto from "./pages/admin/Inventario/EditarProducto";
import AñadirStock from "./pages/admin/Inventario/AñadirStock";
import Ordenes from "./pages/admin/Ordenes/Ordenes";
import OrdenDetalle from "./pages/admin/Ordenes/OrdenDetalle";
import Facturacion from "./pages/admin/Factura/Facturacion";
import NuevaFactura from "./pages/admin/Factura/NuevaFactura";
import DetalleFactura from "./pages/admin/Factura/DetalleFactura";
import PagoStripe from "./components/PagoStripe";
import PagoConfirmacion from "./components/PagoConfirmacion";
import Citas from "./pages/admin/Citas/Citas";
import NuevaCita from "./pages/admin/Citas/NuevaCita";


// Crear componente ErrorPage ya que no existe
const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Error 404</h1>
    <p className="text-xl mb-6">La página que buscas no existe.</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/recuperar-password" element={<RecoverPassword />} />

            {/* Rutas protegidas para cualquier usuario autenticado */}
            <Route element={<AuthGuard />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Otras rutas protegidas generales */}
            </Route>

            {/* Rutas protegidas solo para administradores */}
            <Route element={<AdminGuard />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/clientes" element={<Clientes />} />
              <Route path="/admin/clientes/detalle/:id" element={<ClienteDetalle />} />
              <Route path="/admin/clientes/editar/:id" element={<EditarCliente />} />
              <Route path="/admin/clientes/vehiculos/:id" element={<ClienteVehiculo />} />
              
              <Route path="/admin/vehiculos" element={<Vehiculos />} />
              <Route path="/admin/vehiculos/nuevo" element={<NuevoVehiculo />} />
              <Route path="/admin/vehiculos/detalle/:id" element={<VehiculoDetalle />} />
              <Route path="/admin/vehiculos/editar/:id" element={<EditarVehiculo />} />
              <Route path="/admin/vehiculos/nueva-orden/:id" element={<NuevaOrdenServicio />} />

              <Route path="/admin/ordenes-trabajo" element={<Ordenes />} />
              <Route path="/ordenes/orden-detalle/:id" element={<OrdenDetalle />} />
            

              <Route path="/admin/facturacion" element={<Facturacion />} />
              <Route path="/admin/facturacion/nuevo" element={<NuevaFactura />} />
              <Route path="/admin/facturacion/detalle/:id" element={<DetalleFactura />} />
              <Route path="/admin/facturacion/pago/:id" element={<PagoStripe />} />
              <Route path="/admin/facturacion/confirmacion" element={<PagoConfirmacion />} />


              <Route path="/admin/reparaciones" element={<Reparaciones />} />
              <Route path="/admin/reparacionesHistorial" element={<ReparacionesHistorial />} />
              <Route path="/admin/reparacionesActivas" element={<ReparacionesActivas />} />
              <Route path="/admin/reparaciones/nueva" element={<NuevaReparacion />} />

              <Route path="/admin/inventario" element={<Inventario />} />
              <Route path="/admin/inventario/nuevo" element={<NuevoProducto />} />
              <Route path="/admin/inventario/detalles/:id" element={<ProductoDetalle />} />
              <Route path="/admin/inventario/editar/:id" element={<EditarProducto />} />
              <Route path="/admin/inventario/stock/:id" element={<AñadirStock />} />

               <Route path="/admin/citas" element={<Citas />} />
               <Route path="/admin/citas/nueva" element={<NuevaCita />} />

              
              {/* Otras rutas específicas */}
            </Route>

            {/* Rutas protegidas solo para mecánicos */}
            <Route element={<MecanicoGuard />}>
              {/* Rutas específicas para mecánicos */}
             
              <Route path="/mecanico/empleados" element={<Dashboard />} />
              <Route path="/mecanico/reparaciones" element={<Dashboard />} />
              <Route path="/mecanico/reparaciones/activas" element={<Dashboard />} />
              <Route path="/mecanico/reparaciones/historial" element={<Dashboard />} />
              {/* No incluir otras rutas aquí */}
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
