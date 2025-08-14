import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { CreditCard } from 'lucide-react';

// Importar servicios y modelos
import {
  obtenerFacturaPorId,
  registrarPagoFactura,
  enviarFacturaPorEmail
} from "../../../services/facturacionService";
import { FacturaDetalleDTO } from "../../../models/FacturaDetalleDTO"; // Cambiar importación


const DetalleFactura = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [factura, setFactura] = useState<FacturaDetalleDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagoModalOpen, setPagoModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [enviandoEmail, setEnviandoEmail] = useState(false);

  useEffect(() => {
    const cargarFactura = async () => {
      if (!id) {
        setError("ID de factura no válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const facturaData = await obtenerFacturaPorId(id);
        setFactura(facturaData);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error al cargar la factura");
        setFactura(null);
      } finally {
        setLoading(false);
      }
    };

    cargarFactura();
  }, [id]);

  // Formatear fecha
  const formatearFecha = (fecha: string | Date) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  // Obtener variante del badge según el estado
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "PAGADA":
        return "default";
      case "PENDIENTE":
        return "outline";
      case "VENCIDA":
        return "destructive";
      case "CANCELADA":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Manejar el registro de pago
  // Manejar el registro de pago
  const registrarPago = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!factura) return;

    const formData = new FormData(e.currentTarget);
    const metodoPago = formData.get("metodo") as string;
    const observaciones = formData.get("notas") as string;

    // Validación básica
    if (!metodoPago) {
      toast.error("Debe seleccionar un método de pago");
      return;
    }

    try {
      setProcesandoPago(true);
      await registrarPagoFactura(factura.id.toString(), {
        metodoPago,
        fechaPago: new Date(),
        observaciones: observaciones || undefined
      });

      // Recargar la factura actualizada
      const facturaActualizada = await obtenerFacturaPorId(factura.id.toString());
      setFactura(facturaActualizada);

      toast.success("Pago registrado correctamente");
      setPagoModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Error al registrar el pago");
    } finally {
      setProcesandoPago(false);
    }
  };

  // Manejar el envío por email
  const enviarEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!factura) return;

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
      await enviarFacturaPorEmail(factura.id.toString(), {
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

  // Estados de carga y error
  if (loading) {
    return (
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Cargando...</CardTitle>
            <CardDescription>Obteniendo detalles de la factura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error || !factura) {
    return (
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>{error || "La factura solicitada no existe"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No se pudo cargar la información de la factura.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/dashboard/facturacion">Volver a facturación</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Factura {factura.numeroFactura || factura.id} | AutoTaller</title>
      </Helmet>

      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admin/facturacion">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Factura #{factura.numeroFactura || factura.id}</h1>
              <p className="text-muted-foreground">
                Emitida el {formatearFecha(factura.fecha)} | Vence el {formatearFecha(factura.fechaVencimiento)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">

            <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar por email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Enviar factura por email</DialogTitle>
                  <DialogDescription>
                    Completa los datos para enviar la factura por email
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={enviarEmail}>
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
                        placeholder="Factura #{factura.numeroFactura || factura.id}"
                        defaultValue={`Factura #${factura.numeroFactura || factura.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Estimado cliente, adjunto encontrará su factura..."
                        className="min-h-[120px] resize-none"
                        defaultValue={`Estimado cliente,\n\nAdjunto encontrará la factura #${factura.numeroFactura || factura.id} correspondiente a los servicios realizados.\n\nGracias por confiar en nosotros.\n\nSaludos cordiales,\nEquipo AutoTaller`}
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
            {factura.estadoFactura !== "PAGADA" && (
              <Button onClick={() => navigate(`/admin/facturacion/pago/${factura.id}`)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Registrar pago
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Información de factura */}
          <Card className="md:col-span-12">
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Factura #{factura.numeroFactura || factura.id}</CardTitle>

                </div>
                <Badge
                  variant={getBadgeVariant(factura.estadoFactura)}
                  className="text-sm"
                >
                  {factura.estadoFactura}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Información del cliente</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{factura.clienteNombreCompleto}</p>
                    <p className="text-muted-foreground">{factura.clienteDireccion}</p>
                    <p className="text-muted-foreground">Telefono: {factura.clienteTelefono}</p>
                    <p className="text-muted-foreground">Email: {factura.clienteEmail}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Información del vehículo</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">{factura.vehiculoMarca} {factura.vehiculoModelo} {factura.vehiculoAno}</p>
                    <p className="text-muted-foreground">Matrícula: {factura.vehiculoMatricula}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold mb-4">Detalle de la factura</h3>

                {/* Tabla de servicios y piezas */}
                {((factura.servicios && factura.servicios.length > 0) || (factura.piezas && factura.piezas.length > 0)) ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio unitario</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Servicios */}
                      {factura.servicios && factura.servicios.map((servicio, index) => (
                        <TableRow key={`servicio-${index}`}>
                          <TableCell>{servicio.nombre}</TableCell>
                          <TableCell>Servicio</TableCell>
                          <TableCell className="text-right">{servicio.cantidad}</TableCell>
                          <TableCell className="text-right">{servicio.precio.toFixed(2)}€</TableCell>
                          <TableCell className="text-right">{(servicio.precio || 0).toFixed(2)}€</TableCell>
                        </TableRow>
                      ))}

                      {/* Piezas */}
                      {factura.piezas && factura.piezas.map((pieza, index) => (
                        <TableRow key={`pieza-${index}`}>
                          <TableCell>{pieza.nombrePieza}</TableCell>
                          <TableCell>Pieza</TableCell>
                          <TableCell className="text-right">{pieza.cantidad}</TableCell>
                          <TableCell className="text-right">{pieza.precioUnitario.toFixed(2)}€</TableCell>
                          <TableCell className="text-right">{pieza.subTotal.toFixed(2)}€</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No hay servicios ni piezas detallados disponibles</p>
                )}

                <div className="mt-6 flex flex-col items-end">
                  <div className="space-y-2 text-sm w-48">
                    {(() => {
                      // Calcular subtotal
                      const subtotalServicios = factura.servicios?.reduce((sum, servicio) => sum + servicio.precio, 0) || 0;
                      const subtotalPiezas = factura.piezas?.reduce((sum, pieza) => sum + pieza.subTotal, 0) || 0;
                      const subtotal = subtotalServicios + subtotalPiezas;
                      // Calcular impuestos (21%)
                      const impuestos = subtotal * 0.21;
                      const total = subtotal + impuestos;

                      return (
                        <>
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{subtotal.toFixed(2)}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impuestos (21%):</span>
                            <span>{impuestos.toFixed(2)}€</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{total.toFixed(2)}€</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {factura.notas && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Notas</h3>
                    <p className="text-sm">{factura.notas}</p>
                  </div>
                </>
              )}

            </CardContent>
            <CardFooter className="flex justify-between bg-muted/50 border-t">
              <p className="text-sm text-muted-foreground">
                Gracias por confiar en nuestros servicios
              </p>
              <p className="text-sm text-muted-foreground">
                AutoTaller © 2025
              </p>
            </CardFooter>
          </Card>
        </div>
      </main >
    </>
  );
};

export default DetalleFactura;
