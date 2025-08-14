export enum EstadoCita {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  CANCELADA = "Cancelada",
  COMPLETADA = "Completada"
}

export interface CitaDTO {
  id: number;
  clienteId: number;
  vehiculoId: number;
  cliente: string;
  vehiculo: string;
  fecha: string;
  hora: string;
  servicio: string;
  telefono: string;
  estado: EstadoCita;
  descripcion?: string;
}

export interface FiltrosCitasDTO {
  fecha?: string;
  clienteId?: number;
  vehiculoId?: number;
  estado?: EstadoCita[];
  busqueda?: string;
}

export interface RespuestaCitasDTO {
  citas: CitaDTO[];
  total: number;
}