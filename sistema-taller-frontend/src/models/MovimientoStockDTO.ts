// Interfaz para el movimiento de stock
export interface MovimientoStockDTO {
  productoId: number;
  cantidad: number;
  tipoMovimiento: 'entrada' | 'salida';
  proveedor?: string;
  costo?: number;
  factura?: string;
  notas?: string;
}