import axios from "axios";
import baseUrl from "./helper";
import { 
  FacturaDTO, 
  EstadisticasFacturacionDTO, 
  IngresoMensualDTO, 
  FiltrosFacturacionDTO,
  RespuestaFacturacionDTO 
} from "../models/FacturaDTO";
import { FacturaDetalleDTO } from "../models/FacturaDetalleDTO"; // Nueva importación

// Obtener todas las facturas con filtros opcionales
export const obtenerFacturas = async (filtros?: FiltrosFacturacionDTO): Promise<RespuestaFacturacionDTO> => {
  try {
    const params = new URLSearchParams();
    
    if (filtros?.estado && filtros.estado.length > 0) {
      filtros.estado.forEach(estado => params.append('estado', estado));
    }
    if (filtros?.fechaInicio) {
      params.append('fechaInicio', filtros.fechaInicio.toISOString());
    }
    if (filtros?.fechaFin) {
      params.append('fechaFin', filtros.fechaFin.toISOString());
    }
    if (filtros?.clienteId) {
      params.append('clienteId', filtros.clienteId.toString());
    }
    if (filtros?.busqueda) {
      params.append('busqueda', filtros.busqueda);
    }

    const response = await axios.get(`${baseUrl}/facturas?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las facturas');
  }
};


export const obtenerFacturaPorId = async (id: string): Promise<FacturaDetalleDTO> => {
  try {
    const response = await axios.get(`${baseUrl}/facturas/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Factura no encontrada');
    }
    throw new Error('Error al obtener la factura');
  }
};

// Obtener estadísticas de facturación
export const obtenerEstadisticasFacturacion = async (): Promise<EstadisticasFacturacionDTO> => {
  try {
    const response = await axios.get(`${baseUrl}/facturas/estadisticas`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error al obtener las estadísticas de facturación');
  }
};

// Obtener ingresos mensuales
export const obtenerIngresosMensuales = async (anio?: number): Promise<IngresoMensualDTO[]> => {
  try {
    const params = anio ? `?anio=${anio}` : '';
    const response = await axios.get(`${baseUrl}/facturas/ingresos-mensuales${params}`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error al obtener los ingresos mensuales');
  }
};

// Crear nueva factura
export const crearFactura = async (facturaData: Partial<FacturaDTO>): Promise<FacturaDTO> => {
  try {
    const response = await axios.post(`${baseUrl}/facturas`, facturaData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al crear la factura');
  }
};

// Actualizar estado de factura
export const actualizarEstadoFactura = async (id: string, estado: string): Promise<FacturaDTO> => {
  try {
    const response = await axios.patch(`${baseUrl}/facturas/${id}/estado`, { estado });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al actualizar el estado de la factura');
  }
};

// Registrar pago de factura
export const registrarPagoFactura = async (id: string, datosPago: { metodoPago: string; fechaPago: Date; observaciones?: string }): Promise<FacturaDTO> => {
  try {
    const response = await axios.post(`${baseUrl}/facturas/${id}/pago`, datosPago);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al registrar el pago');
  }
};

// Generar factura desde orden de trabajo
export const generarFacturaDesdeOrden = async (ordenId: string): Promise<FacturaDTO> => {
  try {
    const response = await axios.post(`${baseUrl}/facturas/desde-orden/${Number(ordenId)}`);
    return response.data;
  } catch (error: any) {
  if (error.response?.data?.error?.includes("Ya existe una factura")) {
    throw new Error("Esta orden ya tiene una factura generada.");
  }
  throw new Error('Error al generar la factura desde la orden');
}

};

// Exportar facturas (PDF, Excel)
export const exportarFacturas = async (formato: 'pdf' | 'excel', filtros?: FiltrosFacturacionDTO): Promise<Blob> => {
  try {
    const params = new URLSearchParams();
    params.append('formato', formato);
    
    if (filtros?.estado && filtros.estado.length > 0) {
      filtros.estado.forEach(estado => params.append('estado', estado));
    }
    if (filtros?.fechaInicio) {
      params.append('fechaInicio', filtros.fechaInicio.toISOString());
    }
    if (filtros?.fechaFin) {
      params.append('fechaFin', filtros.fechaFin.toISOString());
    }

    const response = await axios.get(`${baseUrl}/facturas/exportar?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Error al exportar las facturas');
  }
};

// Obtener todas las facturas sin filtros
export const obtenerTodas = async (): Promise<FacturaDTO[]> => {
  try {
    const response = await axios.get(`${baseUrl}/facturas`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener todas las facturas');
  }
};

// Enviar factura por email
export const enviarFacturaPorEmail = async (id: string, datosEmail: {
  email: string;
  asunto: string;
  mensaje: string;
}): Promise<void> => {
  try {
    await axios.post(`${baseUrl}/api/enviar-factura`, datosEmail);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al enviar la factura por email');
  }
};