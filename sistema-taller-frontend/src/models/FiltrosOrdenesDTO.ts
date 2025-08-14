import { EstadisticasOrdenesDTO } from "./EstadisticasOrdenesDTO";
import { EstadoOrden, OrdenTrabajoDTO } from "./OrdenTrabajoDTO";

export interface FiltrosOrdenesDTO {
  estado?: EstadoOrden[];
  fechaInicio?: Date;
  fechaFin?: Date;
  clienteId?: number;
  empleadoId?: number;
  esUrgente?: boolean;
  busqueda?: string;
}

export interface PaginacionDTO {
  pagina: number;
  tamanoPagina: number;
  total: number;
}

export interface RespuestaOrdenesDTO {
  ordenes: OrdenTrabajoDTO[];
  paginacion: PaginacionDTO;
  estadisticas?: EstadisticasOrdenesDTO;
}