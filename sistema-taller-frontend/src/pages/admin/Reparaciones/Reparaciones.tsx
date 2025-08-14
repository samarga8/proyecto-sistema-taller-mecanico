import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Wrench, Plus, ArrowRight, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { listarOrdenesTrabajo } from "../../../services/ordenService";
import { obtenerReparacionesActivas } from "../../../services/reparacionService";
import { OrdenTrabajoDTO } from "../../../models/OrdenTrabajoDTO";
import { IReparacion } from "../../../models/IReparacion";
import { toast } from "sonner";

const Reparaciones = () => {
  const [ordenesPendientes, setOrdenesPendientes] = useState<OrdenTrabajoDTO[]>([]);
  const [reparacionesActivas, setReparacionesActivas] = useState<IReparacion[]>([]);
  const [historialReparaciones, setHistorialReparaciones] = useState<OrdenTrabajoDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        
        // Cargar órdenes pendientes
        const respuestaOrdenesPendientes = await listarOrdenesTrabajo({
          estado: ["PENDIENTE"]
        });
        setOrdenesPendientes(respuestaOrdenesPendientes.ordenes);
        
        // Cargar reparaciones activas
        const reparacionesActivas = await obtenerReparacionesActivas();
        setReparacionesActivas(reparacionesActivas);
        
        // Cargar historial de reparaciones completadas
        const respuestaHistorial = await listarOrdenesTrabajo({
          estado: ["COMPLETADA"]
        });
        setHistorialReparaciones(respuestaHistorial.ordenes);
      } catch (error: any) {
        toast.error(error.message || "Error al cargar los datos");
      } finally {
        setCargando(false);
      }
    };
    
    cargarDatos();
  }, []);

  // Función para formatear la fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES');
  };

  return (
    <>
      <Helmet>
        <title>Reparaciones | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Reparaciones</h1>
            <p className="text-muted-foreground">Gestiona las reparaciones y servicios</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/dashboard/reparaciones/gestion-ordenes">
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Gestión de Órdenes</span>
              </Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard/reparaciones/nueva">
                <Plus className="mr-2 h-4 w-4" />
                <span>Nueva reparación</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Órdenes pendientes de reparación</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/reparaciones/gestion-ordenes">
                  Ver todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Órdenes que necesitan ser procesadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {cargando ? (
                <p>Cargando órdenes pendientes...</p>
              ) : ordenesPendientes.length === 0 ? (
                <p>No hay órdenes pendientes</p>
              ) : (
                ordenesPendientes.slice(0, 2).map((orden) => (
                  <Card key={orden.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{orden.vehiculoInfo}</h3>
                          <p className="text-sm text-muted-foreground">{orden.clienteNombre}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <ClipboardList className="h-4 w-4 text-primary" />
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground block">Orden</span>
                            <span className="text-xs font-medium">{orden.numeroOrden}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-sm">{orden.servicios?.[0]?.nombre || 'Sin servicio'}</span>
                          <span className="text-xs text-muted-foreground block">Fecha: {formatearFecha(orden.fecha)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/dashboard/reparaciones/gestion-ordenes?id=${orden.id}`}>
                              Ver detalles
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/dashboard/reparaciones/gestion-ordenes?id=${orden.id}&accion=iniciar`}>
                              Iniciar
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="activas" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="activas">Activas</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="activas" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Reparaciones activas</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/reparaciones/activas">
                      Ver todas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Reparaciones y servicios en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {cargando ? (
                    <p>Cargando reparaciones activas...</p>
                  ) : reparacionesActivas.length === 0 ? (
                    <p>No hay reparaciones activas</p>
                  ) : (
                    reparacionesActivas.slice(0, 3).map((reparacion) => (
                      <Card key={reparacion.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{`${reparacion.vehiculo.marca} ${reparacion.vehiculo.modelo} ${reparacion.vehiculo.anio}`}</h3>
                              <p className="text-sm text-muted-foreground">{reparacion.cliente.nombreCompleto}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-medium">{reparacion.progreso || 0}%</span>
                              <span className="text-xs text-muted-foreground">Inicio: {reparacion.fechaInicio}</span>
                            </div>
                          </div>
                          <div className="mt-2 h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${reparacion.progreso || 0}%` }}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm">{reparacion.tipoServicio}</span>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/dashboard/reparaciones/activas?id=${reparacion.id}`}>
                                Ver detalles
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="historial" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Historial de reparaciones</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/reparaciones/historial">
                      Ver todo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Reparaciones y servicios completados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {cargando ? (
                    <p>Cargando historial de reparaciones...</p>
                  ) : historialReparaciones.length === 0 ? (
                    <p>No hay reparaciones completadas</p>
                  ) : (
                    historialReparaciones.slice(0, 3).map((reparacion) => (
                      <Card key={reparacion.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{reparacion.vehiculoInfo}</h3>
                              <p className="text-sm text-muted-foreground">{reparacion.clienteNombre}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Wrench className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-muted-foreground block">Completado</span>
                                <span className="text-xs font-medium">{reparacion.fechaFinalizacion ? formatearFecha(reparacion.fechaFinalizacion.toString()) : 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm">{reparacion.servicios?.[0]?.nombre || 'Sin servicio'}</span>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/dashboard/reparaciones/historial?id=${reparacion.id}`}>
                                Ver detalles
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};
export default Reparaciones;