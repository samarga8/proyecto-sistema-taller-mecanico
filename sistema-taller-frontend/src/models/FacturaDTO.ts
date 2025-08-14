import { ServicioOrdenDTO } from "./ServicioOrdenDTO";


export interface FacturaDTO {
  id: string;
  numeroFactura?: string;
  clienteId: number;
  clienteNombre: string;
  vehiculoId: number;
  vehiculoInfo: string;
  ordenTrabajoId?: string;
  fecha: string;
  fechaVencimiento: string;
  subtotal: number;
  impuestos?: number;
  total: number;
  estadoFactura: EstadoFactura;
  metodoPago?: string;
  notas?: string;
  fechaCreacion?: Date;
  fechaPago?: Date;
  servicios?: ServicioOrdenDTO[]; 
}

export type EstadoFactura = "PAGADA" | "PENDIENTE" | "VENCIDA" | "CANCELADA";

export interface EstadisticasFacturacionDTO {
  totalFacturadoMes: number;
  totalPendiente: number;
  totalVencido: number;
  facturasPendientes: number;
  facturasVencidas: number;
  porcentajeCambioMes: number;
}

export interface IngresoMensualDTO {
  mes: string;
  anio: number;
  ingresos: number;
  servicios: number;
  facturas: number;
}

export interface FiltrosFacturacionDTO {
  estado?: EstadoFactura[];
  fechaInicio?: Date;
  fechaFin?: Date;
  clienteId?: number;
  busqueda?: string;
}

export interface RespuestaFacturacionDTO {
  facturas: FacturaDTO[];
  estadisticas: EstadisticasFacturacionDTO;
  total: number;
}