import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Receipt, Search, MoreHorizontal, Filter, Download, FileText, Printer, Mail, Eye, Plus } from "lucide-react";
import {
  obtenerFacturas,
  obtenerTodas, // Añadir esta importación
  obtenerEstadisticasFacturacion,
  obtenerIngresosMensuales,
  registrarPagoFactura,
  enviarFacturaPorEmail,
  exportarFacturas
} from "../../../services/facturacionService";
import {
  FacturaDTO,
  EstadisticasFacturacionDTO,
  IngresoMensualDTO,
  FiltrosFacturacionDTO
} from "../../../models/FacturaDTO";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";


const Facturacion = () => {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState<FacturaDTO[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasFacturacionDTO | null>(null);
  const [ingresos, setIngresos] = useState<IngresoMensualDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState<FiltrosFacturacionDTO>({});
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<FacturaDTO | null>(null);
  const [enviandoEmail, setEnviandoEmail] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [todasLasFacturas, estadisticasData, ingresosData] = await Promise.all([
        obtenerTodas(),
        obtenerEstadisticasFacturacion(),
        obtenerIngresosMensuales()
      ]);

      // Actualizar para manejar el array directo de facturas
      setFacturas(todasLasFacturas || []);
      setEstadisticas(estadisticasData);
      setIngresos(ingresosData || []);
    } catch (error: any) {
      // Asegurar que facturas sea un array vacío en caso de error
      setFacturas([]);
      setEstadisticas(null);
      setIngresos([]);
      toast.error(error.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // También actualizar la función handleBusqueda
  const handleBusqueda = async (valor: string) => {
    setBusqueda(valor);
    const nuevosFiltros = { ...filtros, busqueda: valor };
    setFiltros(nuevosFiltros);

    try {
      const respuesta = await obtenerFacturas(nuevosFiltros);
      // Validar la respuesta antes de actualizar el estado
      if (respuesta && respuesta.facturas) {
        setFacturas(respuesta.facturas);
      } else {
        setFacturas([]);
      }
    } catch (error: any) {
      setFacturas([]);
      toast.error(error.message || 'Error en la búsqueda');
    }
  };

  // Registrar pago
  const handleRegistrarPago = async (facturaId: string) => {
    try {
      await registrarPagoFactura(facturaId, {
        metodoPago: 'Efectivo',
        fechaPago: new Date()
      });
      toast.success('Pago registrado correctamente');
      cargarDatos();
    } catch (error: any) {
      toast.error(error.message || 'Error al registrar el pago');
    }
  };

  // Enviar por email
  const handleEnviarEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!facturaSeleccionada) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const asunto = formData.get("asunto") as string;
    const mensaje = formData.get("mensaje") as string;

    if (!email || !email.includes('@')) {
      toast.error("Debe ingresar un email válido");
      return;
    }

    try {
      setEnviandoEmail(true);
      await enviarFacturaPorEmail(facturaSeleccionada.id.toString(), {
        email,
        asunto,
        mensaje
      });
      toast.success("Factura enviada por email correctamente");
      setEmailModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al enviar la factura por email");
    } finally {
      setEnviandoEmail(false);
    }
  };


  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando datos de facturación...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Facturación | AutoTaller</title>
      </Helmet>

      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Facturación</h1>
            <p className="text-muted-foreground">Gestiona las facturas y pagos</p>
          </div>
          <Button onClick={() => navigate('/admin/facturacion/nuevo')}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Nueva factura</span>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatearMoneda(estadisticas?.totalFacturadoMes || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {(() => {
                  const porcentaje = estadisticas?.porcentajeCambioMes ?? 0;
                  const esPositivo = porcentaje >= 0;
                  return (
                    <>
                      <span className={esPositivo ? "text-green-500" : "text-red-500"}>
                        {esPositivo ? '↑' : '↓'} {Math.abs(porcentaje)}%
                      </span>
                      {' '}vs. mes anterior
                    </>
                  );
                })()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Facturas pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estadisticas ? formatearMoneda(estadisticas.totalPendiente) : '$0.00'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {estadisticas?.facturasPendientes || 0} facturas sin pagar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Facturas vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {estadisticas ? formatearMoneda(estadisticas.totalVencido) : '$0.00'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {estadisticas?.facturasVencidas || 0} facturas vencidas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="facturas" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="facturas">Facturas</TabsTrigger>
            <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          </TabsList>

          <TabsContent value="facturas" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Lista de facturas</CardTitle>

                </div>
                <CardDescription>Total de facturas: {facturas?.length || 0}</CardDescription>
                <div className="flex items-center gap-2 pt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar factura..."
                      className="pl-8"
                      value={busqueda}
                      onChange={(e) => handleBusqueda(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Factura</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Vehículo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[80px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facturas.map((factura) => (
                      <TableRow key={factura.id}>
                        <TableCell className="font-medium">{factura.numeroFactura}</TableCell>
                        <TableCell>{factura.clienteNombre}</TableCell>
                        <TableCell>{factura.vehiculoInfo}</TableCell>
                        <TableCell>{new Date(factura.fecha).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(factura.fechaVencimiento).toLocaleDateString()}</TableCell>
                        <TableCell>{formatearMoneda(factura.total)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              factura.estadoFactura === "PAGADA" ? "default" :
                                factura.estadoFactura === "PENDIENTE" ? "outline" :
                                  "destructive"
                            }
                          >
                            {factura.estadoFactura}
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
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/facturacion/detalle/${factura.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver factura
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setFacturaSeleccionada(factura);
                                setEmailModalOpen(true);
                              }}>
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar por email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {
                                if (factura.estadoFactura !== "PAGADA") {
                                  navigate(`/admin/facturacion/pago/${factura.id}`);
                                } else {
                                  toast.error("Esta factura ya está pagada");
                                }
                              }}>
                                Registrar pago
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingresos" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos mensuales</CardTitle>
                <CardDescription>Resumen de ingresos de los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-end justify-between gap-2">
                  {ingresos.map((mes, index) => {
                    const maxIngresos = Math.max(...ingresos.map(m => m.ingresos));
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md transition-all"
                          style={{ height: `${(mes.ingresos / maxIngresos) * 200}px` }}
                        />
                        <div className="mt-2 text-xs font-medium">{mes.mes}</div>
                        <div className="text-xs text-muted-foreground">{formatearMoneda(mes.ingresos)}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver reporte completo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Modal para enviar email - Movido fuera del bucle de renderizado */}
        <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Enviar factura por email</DialogTitle>
              <DialogDescription>
                Completa los datos para enviar la factura por email
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEnviarEmail}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email del destinatario</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="cliente@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    name="asunto"
                    type="text"
                    placeholder={`Factura #${facturaSeleccionada?.numeroFactura || facturaSeleccionada?.id}`}
                    defaultValue={`Factura #${facturaSeleccionada?.numeroFactura || facturaSeleccionada?.id}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Estimado cliente, adjunto encontrará su factura..."
                    className="min-h-[120px] resize-none"
                    defaultValue={`Estimado cliente,\n\nAdjunto encontrará la factura #${facturaSeleccionada?.numeroFactura || facturaSeleccionada?.id} correspondiente a los servicios realizados.\n\nGracias por confiar en nosotros.\n\nSaludos cordiales,\nEquipo AutoTaller`}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEmailModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={enviandoEmail}>
                  {enviandoEmail ? "Enviando..." : "Enviar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Facturacion;





