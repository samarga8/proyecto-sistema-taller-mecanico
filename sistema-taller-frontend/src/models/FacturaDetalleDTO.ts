import { PiezaMovimientoDTO } from './PiezaMovimientoDTO';
import { ServicioOrdenDTO } from './ServicioOrdenDTO';

export interface FacturaDetalleDTO {
  id: number;
  numeroFactura: string;
  fecha: Date;
  fechaVencimiento: Date;
  subtotal: number;
  impuestos: number;
  total: number;
  estadoFactura: string;
  metodoPago?: string;
  notas?: string;

  // Cliente
  clienteNombreCompleto: string;
  clienteDireccion: string;
  clienteTelefono: string;
  clienteEmail: string;

  // Vehículo
  vehiculoMarca: string;
  vehiculoModelo: string;
  vehiculoAno: number;
  vehiculoMatricula: string;

  // Orden y servicios
  ordenId: number;
  ordenNumero: string;
  servicios: ServicioOrdenDTO[];

  piezas: PiezaMovimientoDTO[];
}