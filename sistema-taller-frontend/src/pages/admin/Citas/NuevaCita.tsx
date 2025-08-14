import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Calendar } from "../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, ArrowLeft, Save, User, Car, Phone, FileText } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { listarClientes, registrarCliente } from "../../../services/clienteService";
import { listarVehiculos, guardarVehiculo } from "../../../services/vehiculoService";
import { crearCita } from "../../../services/citasService";
import { ICliente } from "../../../models/ICliente";
import { IVehiculo } from "../../../models/IVehiculo";
import { EstadoCita } from "../../../models/CitaDTO";

// Horas disponibles para citas (esto podría venir del backend en el futuro)
const horasDisponibles = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00"
];

// Tipos de servicio (esto podría venir del backend en el futuro)
const tiposServicio = [
  "Cambio de aceite",
  "Revisión general",
  "Afinación completa",
  "Cambio de frenos",
  "Alineación y balanceo",
  "Diagnóstico electrónico",
  "Cambio de batería",
  "Reparación de suspensión",
  "Cambio de filtros",
  "Servicio de aire acondicionado",
  "Otro"
];

const NuevaCita = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHora, setSelectedHora] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedVehiculo, setSelectedVehiculo] = useState<string>("");
  const [selectedServicio, setSelectedServicio] = useState<string>("");
  const [notas, setNotas] = useState<string>("");
  const [nuevoClienteMode, setNuevoClienteMode] = useState(false);
  const [nuevoClienteNombre, setNuevoClienteNombre] = useState("");
  const [nuevoClienteTelefono, setNuevoClienteTelefono] = useState("");
  const [nuevoVehiculoModelo, setNuevoVehiculoModelo] = useState("");
  const [nuevoVehiculoPlaca, setNuevoVehiculoPlaca] = useState("");
  
  // Estados para almacenar datos del backend
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [vehiculos, setVehiculos] = useState<IVehiculo[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Cargar clientes y vehículos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const clientesData = await listarClientes();
        const vehiculosData = await listarVehiculos();
        
        setClientes(clientesData);
        setVehiculos(vehiculosData);
      } catch (error) {
        toast.error("Error al cargar los datos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, []);
  
  // Filtrar vehículos del cliente seleccionado
  const vehiculosCliente = vehiculos.filter(
    vehiculo => vehiculo.cliente.id === Number(selectedCliente)
  );
  
  // Función para registrar un nuevo cliente y su vehículo
  const registrarNuevoCliente = async () => {
    if (!nuevoClienteNombre || !nuevoClienteTelefono) {
      toast.error("Por favor ingresa los datos del nuevo cliente");
      return null;
    }
    
    try {
      // Crear objeto con datos del cliente
      const nuevoCliente = {
        nombreCompleto: nuevoClienteNombre,
        telefono: nuevoClienteTelefono,
        email: "", // Campos requeridos según el modelo
        dni: "PENDIENTE", // Valor temporal
        direccion: ""
      };
      
      // Registrar cliente
      const clienteRegistrado = await registrarCliente(nuevoCliente);
      
      // Actualizar lista de clientes
      setClientes([...clientes, clienteRegistrado]);
      
      return clienteRegistrado;
    } catch (error) {
      toast.error("Error al registrar el cliente");
      console.error(error);
      return null;
    }
  };
  
  // Función para registrar un nuevo vehículo
  const registrarNuevoVehiculo = async (clienteId: number) => {
    if (!nuevoVehiculoModelo || !nuevoVehiculoPlaca) {
      toast.error("Por favor ingresa los datos del vehículo");
      return null;
    }
    
    try {
      // Extraer marca y modelo del texto ingresado
      const partes = nuevoVehiculoModelo.split(' ');
      const marca = partes[0] || "";
      const modelo = partes.slice(1).join(' ') || "";
      
      // Crear objeto con datos del vehículo
      const nuevoVehiculo = {
        marca: marca,
        modelo: modelo,
        anio: new Date().getFullYear(), // Valor por defecto
        matricula: nuevoVehiculoPlaca,
        color: "",
        kilometraje: 0,
        dni: "PENDIENTE", // Se actualizará con el DNI del cliente
      };
      
      // Registrar vehículo
      const vehiculoRegistrado = await guardarVehiculo(nuevoVehiculo);
      
      // Actualizar lista de vehículos
      setVehiculos([...vehiculos, vehiculoRegistrado]);
      
      return vehiculoRegistrado;
    } catch (error) {
      toast.error("Error al registrar el vehículo");
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!date || !selectedHora || !selectedServicio) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    
    if (!selectedCliente && !nuevoClienteMode) {
      toast.error("Por favor selecciona un cliente");
      return;
    }
    
    if (nuevoClienteMode && (!nuevoClienteNombre || !nuevoClienteTelefono)) {
      toast.error("Por favor ingresa los datos del nuevo cliente");
      return;
    }
    
    if (!selectedVehiculo && !nuevoClienteMode) {
      toast.error("Por favor selecciona un vehículo");
      return;
    }
    
    if (nuevoClienteMode && (!nuevoVehiculoModelo || !nuevoVehiculoPlaca)) {
      toast.error("Por favor ingresa los datos del vehículo");
      return;
    }
    
    try {
      setLoading(true);
      
      let clienteId = Number(selectedCliente);
      let vehiculoId = Number(selectedVehiculo);
      let clienteNombre = "";
      let vehiculoInfo = "";
      let telefonoCliente = "";
      
      // Si estamos creando un nuevo cliente
      if (nuevoClienteMode) {
        const nuevoCliente = await registrarNuevoCliente();
        if (!nuevoCliente) return;
        
        clienteId = nuevoCliente.id;
        clienteNombre = nuevoCliente.nombre;
        telefonoCliente = nuevoCliente.telefono;
        
        // Registrar el vehículo para el nuevo cliente
        const nuevoVehiculo = await registrarNuevoVehiculo(clienteId);
        if (!nuevoVehiculo) return;
        
        vehiculoId = nuevoVehiculo.id;
        vehiculoInfo = `${nuevoVehiculo.marca} ${nuevoVehiculo.modelo} (${nuevoVehiculo.matricula})`;
      } else {
        // Obtener información del cliente y vehículo seleccionados
        const cliente = clientes.find(c => c.id === clienteId);
        const vehiculo = vehiculos.find(v => v.id === vehiculoId);
        
        if (!cliente || !vehiculo) {
          toast.error("Error al obtener información del cliente o vehículo");
          return;
        }
        
        clienteNombre = cliente.nombreCompleto;
        telefonoCliente = cliente.telefono;
        vehiculoInfo = `${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.matricula})`;
      }
      
      // Formatear la fecha para enviar al backend
      const fechaFormateada = date ? format(date, "yyyy-MM-dd") : "";
      
      // Crear objeto de cita para enviar al backend
      const nuevaCita = {
        clienteId,
        vehiculoId,
        cliente: clienteNombre,
        vehiculo: vehiculoInfo,
        fecha: fechaFormateada,
        hora: selectedHora,
        servicio: selectedServicio,
        telefono: telefonoCliente,
        estado: EstadoCita.PENDIENTE,
        descripcion: notas
      };
      
      // Enviar al backend
      await crearCita(nuevaCita);
      
      // Mostrar toast de éxito y redirigir
      toast.success("Cita agendada correctamente");
      navigate("/admin/citas");
    } catch (error) {
      toast.error("Error al crear la cita");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Nueva Cita | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Nueva Cita</h1>
            <p className="text-muted-foreground">Agenda una nueva cita para un cliente</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard/citas")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a citas
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>Selecciona un cliente existente o crea uno nuevo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!nuevoClienteMode ? (
                  <>
                    <div className="space-y-2">
                      <FormLabel>Cliente</FormLabel>
                      <Select value={selectedCliente} onValueChange={setSelectedCliente}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id.toString()}>
                              {cliente.nombreCompleto} - {cliente.telefono}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Vehículo</FormLabel>
                      <Select 
                        value={selectedVehiculo} 
                        onValueChange={setSelectedVehiculo}
                        disabled={!selectedCliente}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={selectedCliente ? "Selecciona un vehículo" : "Selecciona un cliente primero"} />
                        </SelectTrigger>
                        <SelectContent>
                          {vehiculosCliente.map((vehiculo) => (
                            <SelectItem key={vehiculo.id} value={vehiculo.id.toString()}>
                              {vehiculo.modelo} ({vehiculo.matricula})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setNuevoClienteMode(true)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Crear nuevo cliente
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <FormLabel>Nombre completo</FormLabel>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input 
                          placeholder="Nombre del cliente" 
                          value={nuevoClienteNombre}
                          onChange={(e) => setNuevoClienteNombre(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Teléfono</FormLabel>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input 
                          placeholder="Teléfono de contacto" 
                          value={nuevoClienteTelefono}
                          onChange={(e) => setNuevoClienteTelefono(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Información del vehículo</FormLabel>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input 
                          placeholder="Marca, modelo y año del vehículo" 
                          value={nuevoVehiculoModelo}
                          onChange={(e) => setNuevoVehiculoModelo(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Placa</FormLabel>
                      <Input 
                        placeholder="Número de placa" 
                        value={nuevoVehiculoPlaca}
                        onChange={(e) => setNuevoVehiculoPlaca(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setNuevoClienteMode(false)}
                    >
                      Usar cliente existente
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Cita</CardTitle>
                <CardDescription>Configura la fecha, hora y servicio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Deshabilitar fechas pasadas y fines de semana
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const day = date.getDay();
                          return date < today || day === 0 || day === 6;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Hora</FormLabel>
                  <Select value={selectedHora} onValueChange={setSelectedHora}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {horasDisponibles.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            {hora}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Tipo de servicio</FormLabel>
                  <Select value={selectedServicio} onValueChange={setSelectedServicio}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposServicio.map((servicio) => (
                        <SelectItem key={servicio} value={servicio}>
                          {servicio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Notas adicionales</FormLabel>
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-2 text-muted-foreground" />
                    <Textarea 
                      placeholder="Describe detalles adicionales sobre la cita o el servicio"
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/citas")}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Guardar cita
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};
export default NuevaCita;