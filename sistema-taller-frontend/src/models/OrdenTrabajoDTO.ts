import { ServicioOrdenDTO } from "./ServicioOrdenDTO";

export interface OrdenTrabajoDTO {
  id: string;
  numeroOrden: string;
  clienteId: number;
  clienteNombre: string;
  vehiculoId: number;
  vehiculoInfo: string; 
  empleadoId: number;
  tecnicoNombre: string;
  fecha: string;
  fechaCreacion: Date;
  fechaFinalizacion?: Date;
  servicio: string; 
  servicios: ServicioOrdenDTO[];
  estado: EstadoOrden;
  esUrgente: boolean;
  descripcion: string;
  totalGeneral?: number;
  observaciones?: string;
}

export type EstadoOrden = "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA" | "CANCELADA" | "PAUSADA";
