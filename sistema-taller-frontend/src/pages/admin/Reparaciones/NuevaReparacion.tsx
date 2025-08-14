import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../..//components/ui/input";
import { Textarea } from "../../..//components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../..//components/ui/select";
import { Separator } from "../../..//components/ui/separator";
import { Card, CardContent } from "../../..//components/ui/card";
import { ArrowLeft, Plus, Save } from "lucide-react";

import { listarClientes } from "../../..//services/clienteService";
import { obtenerVehiculosPorCliente } from "../../..//services/vehiculoService";
import { ICliente, IVehiculo } from "../../..//models/tipos";
import { IEmpleado } from "../../..//models/IEmpleado";
import { registrarReparacion } from "../../../services/reparacionService";

// Esquema de validación para el formulario
const formSchema = z.object({
  vehiculoId: z.string().min(1, { message: "Seleccione un vehículo" }),
  clienteId: z.string().min(1, { message: "Seleccione un cliente" }),
  tipoServicio: z.string().min(1, { message: "Seleccione un tipo de servicio" }),
  descripcion: z.string().min(5, { message: "Ingrese una descripción detallada" }),
  fechaInicio: z.string().min(1, { message: "Seleccione una fecha de inicio" }),
  fechaEstimadaFin: z.string(),
  kilometraje: z.string(),
  tecnicoAsignado: z.string().min(1, { message: "Asigne un técnico" }),
  prioridad: z.string().min(1, { message: "Seleccione una prioridad" }),
  notificarCliente: z.boolean().default(false),
});

// Definición del tipo para el formulario
type FormValues = z.infer<typeof formSchema>;

// Datos de ejemplo para los selects
const tiposServicio = [
  { id: "mantenimiento", nombre: "Mantenimiento preventivo" },
  { id: "reparacion", nombre: "Reparación mecánica" },
  { id: "diagnostico", nombre: "Diagnóstico general" },
  { id: "electrico", nombre: "Sistema eléctrico" },
  { id: "frenos", nombre: "Sistema de frenos" },
  { id: "suspension", nombre: "Suspensión" },
  { id: "motor", nombre: "Motor" },
];



const prioridades = [
  { id: "baja", nombre: "Baja" },
  { id: "media", nombre: "Media" },
  { id: "alta", nombre: "Alta" },
  { id: "urgente", nombre: "Urgente" },
];

const NuevaReparacion = () => {
  const navigate = useNavigate();
  const [selectedVehiculo, setSelectedVehiculo] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [vehiculosCliente, setVehiculosCliente] = useState<IVehiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tecnicos, setTecnicos] = useState<IEmpleado[]>([]); // Renombrado de empleado a tecnicos
  
  // Cargar la lista de técnicos al iniciar

  
  // Cargar la lista de clientes al iniciar
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (error: any) {
        setError("Error al cargar los clientes: " + error.message);
        toast.error("Error al cargar los clientes", {
          description: error.message || "No se pudieron cargar los clientes.",
        });
      }
    };
    
    fetchClientes();
  }, []);
  
  // Función para cargar los vehículos de un cliente
  const handleClienteChange = async (clienteId: string) => {
    setSelectedCliente(clienteId);
    setSelectedVehiculo(""); 
    form.setValue("vehiculoId", "");
    
    if (!clienteId) {
      setVehiculosCliente([]);
      return;
    }
    
    setLoading(true);
    try {
      const data = await obtenerVehiculosPorCliente(parseInt(clienteId));
      setVehiculosCliente(data);
    } catch (error: any) {
      setError("Error al cargar los vehículos: " + error.message);
      toast.error("Error al cargar los vehículos", {
        description: error.message || "No se pudieron cargar los vehículos del cliente.",
      });
      setVehiculosCliente([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Configurar el formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehiculoId: "",
      clienteId: "",
      tipoServicio: "",
      descripcion: "",
      fechaInicio: new Date().toISOString().split("T")[0], 
      fechaEstimadaFin: "",
      kilometraje: "",
      tecnicoAsignado: "",
      prioridad: "",
      notificarCliente: true,
    },
  });
  
  // Actualizar cliente cuando se selecciona un vehículo
  const handleVehiculoChange = (value: string) => {
    setSelectedVehiculo(value);
    
    // Si ya hay un cliente seleccionado, no necesitamos hacer nada más
    if (selectedCliente) return;
    
    // Si no hay cliente seleccionado, buscamos el cliente del vehículo
    const vehiculo = vehiculosCliente.find(v => v.id.toString() === value);
    if (vehiculo && vehiculo.cliente) {
      const clienteId = vehiculo.cliente.id.toString();
      setSelectedCliente(clienteId);
      form.setValue("clienteId", clienteId);
    }
  };
  
  // Manejar envío del formulario
  const onSubmit = async (values: FormValues) => {
    try {
      // Enviar datos al backend
      await registrarReparacion(values);
      
      // Mostrar mensaje de éxito
      toast.success("Reparación registrada correctamente", {
        description: "La nueva reparación ha sido registrada en el sistema.",
      });
      
      // Redireccionar a la lista de reparaciones
      setTimeout(() => {
        navigate("/admin/reparaciones");
      }, 1500);
    } catch (error: any) {
      // Mostrar mensaje de error
      toast.error("Error al registrar la reparación", {
        description: error.message || "Ocurrió un error al registrar la reparación.",
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Nueva Reparación | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Nueva Reparación</h1>
            <p className="text-muted-foreground">Registra una nueva reparación o servicio</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/reparaciones">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Volver</span>
            </Link>
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Información del Vehículo</h3>
                    
                    <FormField
                      control={form.control}
                      name="clienteId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cliente</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleClienteChange(value);
                            }}
                            value={field.value}
                            disabled={selectedVehiculo !== ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un cliente" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {clientes.map((cliente) => (
                                <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                  {cliente.nombreCompleto}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vehiculoId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehículo</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleVehiculoChange(value);
                            }}
                            value={field.value}
                            disabled={!selectedCliente || loading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {loading ? (
                                  <span>Cargando vehículos...</span>
                                ) : (
                                  <SelectValue placeholder="Selecciona un vehículo" />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehiculosCliente.length > 0 ? (
                                vehiculosCliente.map((vehiculo) => (
                                  <SelectItem key={vehiculo.id} value={vehiculo.id.toString()}>
                                    {vehiculo.marca} {vehiculo.modelo} - {vehiculo.matricula}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-disponible" disabled>
                                  {selectedCliente ? "No hay vehículos para este cliente" : "Seleccione un cliente primero"}
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="kilometraje"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kilometraje actual</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Ej. 35000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detalles del Servicio</h3>
                    
                    <FormField
                      control={form.control}
                      name="tipoServicio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de servicio</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo de servicio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tiposServicio.map((tipo) => (
                                <SelectItem key={tipo.id} value={tipo.id}>
                                  {tipo.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fechaInicio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de inicio</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fechaEstimadaFin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha estimada de finalización</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Asignación</h3>
                    
                    <FormField
                      control={form.control}
                      name="tecnicoAsignado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Técnico asignado</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Asignar técnico" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tecnicos.length > 0 ? (
                                tecnicos.map((tecnico) => (
                                  <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                                 
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-disponible" disabled>
                                  No hay técnicos disponibles
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="prioridad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prioridad</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona la prioridad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {prioridades.map((prioridad) => (
                                <SelectItem key={prioridad.id} value={prioridad.id}>
                                  {prioridad.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Descripción</h3>
                    
                    <FormField
                      control={form.control}
                      name="descripcion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción del servicio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detalle el servicio a realizar, problemas reportados por el cliente, observaciones, etc."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/reparaciones")}
              >
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Guardar reparación
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default NuevaReparacion;
