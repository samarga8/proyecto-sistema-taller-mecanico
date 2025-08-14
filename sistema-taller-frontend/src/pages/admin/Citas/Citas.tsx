import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Calendar as CalendarIcon, Search, MoreHorizontal, Filter, Download, Plus, Clock, Check, X, Phone } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { CitaDTO, EstadoCita } from "../../../models/CitaDTO";
import { obtenerCitasPorFecha, cambiarEstadoCita } from "../../../services/citasService";

const Citas = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [citas, setCitas] = useState<CitaDTO[]>([]);
  const [citasFuturas, setCitasFuturas] = useState<CitaDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState<string>("");
  
  // Función para formatear la fecha en formato YYYY-MM-DD
  const formatearFechaParaAPI = (fecha: Date): string => {
    return fecha.toISOString().split('T')[0];
  };

  // Función para cargar las citas del día seleccionado
  const cargarCitas = async () => {
    if (!date) return;
    
    setCargando(true);
    try {
      // Obtener citas para la fecha seleccionada
      const fechaFormateada = formatearFechaParaAPI(date);
      const citasDelDia = await obtenerCitasPorFecha(fechaFormateada);
      setCitas(citasDelDia);
      
      // Obtener citas para el día siguiente (citas futuras)
      const manana = new Date(date);
      manana.setDate(manana.getDate() + 1);
      const fechaManana = formatearFechaParaAPI(manana);
      const citasManana = await obtenerCitasPorFecha(fechaManana);
      setCitasFuturas(citasManana);
    } catch (error) {
      console.error("Error al cargar las citas:", error);
      toast.error("Error al cargar las citas");
    } finally {
      setCargando(false);
    }
  };

  // Cargar citas cuando cambie la fecha seleccionada
  useEffect(() => {
    cargarCitas();
  }, [date]);

  // Función para confirmar una cita
  const confirmarCita = async (id: number) => {
    try {
      await cambiarEstadoCita(id, EstadoCita.CONFIRMADA);
      toast.success("Cita confirmada correctamente");
      cargarCitas(); // Recargar las citas
    } catch (error) {
      console.error("Error al confirmar la cita:", error);
      toast.error("Error al confirmar la cita");
    }
  };

  // Función para cancelar una cita
  const cancelarCita = async (id: number) => {
    try {
      await cambiarEstadoCita(id, EstadoCita.CANCELADA);
      toast.success("Cita cancelada correctamente");
      cargarCitas(); // Recargar las citas
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      toast.error("Error al cancelar la cita");
    }
  };

  // Filtrar citas por búsqueda
  const citasFiltradas = citas.filter(cita => 
    cita.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    cita.vehiculo.toLowerCase().includes(busqueda.toLowerCase()) ||
    cita.servicio.toLowerCase().includes(busqueda.toLowerCase()) ||
    cita.telefono.includes(busqueda)
  ).sort((a, b) => a.hora.localeCompare(b.hora));
  
  return (
    <>
      <Helmet>
        <title>Citas | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Citas</h1>
            <p className="text-muted-foreground">Gestiona las citas programadas</p>
          </div>
          <Button onClick={() => navigate("/dashboard/citas/nueva")}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Nueva cita</span>
          </Button>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Citas programadas</CardTitle>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                  </div>
                </div>
                <CardDescription>Citas para: {date ? format(date, "PPP", { locale: es }) : "Hoy"}</CardDescription>
                <div className="flex items-center gap-2 pt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar cita..." 
                      className="pl-8" 
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {cargando ? (
                  <div className="text-center py-4">Cargando citas...</div>
                ) : citasFiltradas.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">No hay citas programadas para esta fecha</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Vehículo</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="w-[80px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {citasFiltradas.map((cita) => (
                        <TableRow key={cita.id}>
                          <TableCell>
                            <div className="font-medium">{cita.cliente}</div>
                            <div className="text-xs text-muted-foreground">{cita.telefono}</div>
                          </TableCell>
                          <TableCell>{cita.vehiculo}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {cita.hora}
                            </div>
                          </TableCell>
                          <TableCell>{cita.servicio}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={cita.estado === EstadoCita.CONFIRMADA ? "default" : "outline"}
                            >
                              {cita.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Llamar cliente
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Editar cita
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => confirmarCita(cita.id)}>
                                  <Check className="mr-2 h-4 w-4" />
                                  Confirmar asistencia
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => cancelarCita(cita.id)}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Cancelar cita
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Citas programadas para los próximos días</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cargando ? (
                  <div className="text-center py-4">Cargando citas...</div>
                ) : citasFuturas.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">No hay citas programadas para los próximos días</div>
                ) : (
                  citasFuturas.map((cita) => (
                    <Card key={cita.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{cita.cliente}</p>
                              <p className="text-sm text-muted-foreground">{cita.vehiculo}</p>
                            </div>
                          </div>
                          <Badge 
                            variant={cita.estado === EstadoCita.CONFIRMADA ? "default" : "outline"}
                          >
                            {cita.estado}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm"><span className="font-medium">Fecha:</span> {cita.fecha}</p>
                          <p className="text-sm"><span className="font-medium">Hora:</span> {cita.hora}</p>
                          <p className="text-sm"><span className="font-medium">Servicio:</span> {cita.servicio}</p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="mr-2 h-4 w-4" />
                            Llamar
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => confirmarCita(cita.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Confirmar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar agenda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Citas;