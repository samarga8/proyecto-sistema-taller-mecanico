import { OrdenServicioDTO } from "@/models/OrdenServicioDTO";
import { IReparacion } from "@/models/tipos";
import axios from "axios";
import baseUrl from "./helper";

export const registrarReparacion = async (datosReparacion: any) => {
  try {
    // Transformar los datos del formulario al formato esperado por la API
    const ordenServicio: OrdenServicioDTO = {
      clienteId: parseInt(datosReparacion.clienteId),
      vehiculoId: parseInt(datosReparacion.vehiculoId),
      empleadoId: parseInt(datosReparacion.tecnicoAsignado),
      fecha: new Date(datosReparacion.fechaInicio),
      esUrgente: datosReparacion.prioridad === "1", 
      descripcion: datosReparacion.descripcion,
      estado: "PENDIENTE",
      servicios: [
        {
          servicioId: parseInt(datosReparacion.tipoServicio),
          nombre: obtenerNombreServicio(datosReparacion.tipoServicio),
          precio: 0, 
          cantidad: 1,
          subtotal: 0,
          tipo: "servicio"
        }
      ]
    };

    const response = await axios.post(`${baseUrl}/reparaciones`, ordenServicio);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al registrar la reparación');
  }
};


const obtenerNombreServicio = (servicioId: string): string => {
  const servicios = [
    { id: "1", nombre: "Mantenimiento preventivo" },
    { id: "2", nombre: "Reparación mecánica" },
    { id: "3", nombre: "Diagnóstico" },
    { id: "4", nombre: "Cambio de aceite" },
    { id: "5", nombre: "Sistema eléctrico" },
    { id: "6", nombre: "Frenos" },
    { id: "7", nombre: "Suspensión" },
  ];
  
  const servicio = servicios.find(s => s.id === servicioId);
  return servicio ? servicio.nombre : "Servicio";
};

// Método para obtener reparaciones activas
export const obtenerReparacionesActivas = async (): Promise<IReparacion[]> => {
  try {
    const response = await axios.get(`${baseUrl}/reparaciones/activas`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las reparaciones activas');
  }
};

// Método para obtener reparaciones completadas
export const obtenerReparacionesCompletadas = async (): Promise<IReparacion[]> => {
  try {
    const response = await axios.get(`${baseUrl}/reparaciones/completadas`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las reparaciones completadas');
  }
};