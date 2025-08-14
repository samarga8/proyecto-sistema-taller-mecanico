
// Interfaces base sin dependencias circulares
export interface IClienteBase {
  id: number;
  nombreCompleto: string;
  email: string;
  telefono: string;
  direccion: string;
  dni: string;
  
}

export interface IVehiculoBase {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  matricula: string;
  color: string;
  kilometraje: number;
  combustible?: string; 
  transmision?: string; 
  estadoVehiculo:string
}

export interface IReparacionBase {
  id?: number;
  vehiculo: IVehiculoBase;
  tipoServicio: string;
  descripcion: string;
  fechaInicio: string;
  fechaEstimadaFin?: string;
  tecnicoAsignado: string;
  prioridad: string;
  notificarCliente: boolean;
  estado?: string;
  progreso?: number;
}

// Interfaces completas con relaciones
export interface ICliente extends IClienteBase {
  vehiculos?: IVehiculoBase[];
}

export interface IVehiculo extends IVehiculoBase {
  cliente: IClienteBase;
}

export interface IReparacion extends IReparacionBase {
  vehiculos?: IVehiculoBase[];
  cliente: ICliente;
}



