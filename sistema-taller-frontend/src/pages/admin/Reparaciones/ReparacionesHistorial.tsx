import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Wrench, Search, MoreHorizontal, Filter, Download, FileText, Receipt } from "lucide-react";
const reparaciones = [
  { id: 1, vehiculo: "Ford Focus 2017", cliente: "Roberto Sánchez", servicio: "Cambio de suspensión", fechaInicio: "01/07/2025", fechaFin: "03/07/2025", tecnico: "Miguel Álvarez", estado: "Completado", costo: "$1,250.00" },
  { id: 2, vehiculo: "Mazda 3 2020", cliente: "Ana Martínez", servicio: "Cambio de batería", fechaInicio: "10/07/2025", fechaFin: "10/07/2025", tecnico: "Pedro Ruiz", estado: "Completado", costo: "$350.00" },
  { id: 3, vehiculo: "Volkswagen Jetta 2018", cliente: "Luis Ramírez", servicio: "Reparación de alternador", fechaInicio: "05/07/2025", fechaFin: "07/07/2025", tecnico: "Luis Torres", estado: "Completado", costo: "$480.00" },
  { id: 4, vehiculo: "Kia Rio 2019", cliente: "Carmen Flores", servicio: "Cambio de aceite y filtros", fechaInicio: "12/07/2025", fechaFin: "12/07/2025", tecnico: "Miguel Álvarez", estado: "Completado", costo: "$180.00" },
  { id: 5, vehiculo: "Hyundai Elantra 2021", cliente: "Jorge Mendoza", servicio: "Alineación y balanceo", fechaInicio: "08/07/2025", fechaFin: "08/07/2025", tecnico: "Pedro Ruiz", estado: "Completado", costo: "$220.00" },
];
const ReparacionesHistorial = () => {
  return (
    <>
      <Helmet>
        <title>Historial de Reparaciones | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Historial de Reparaciones</h1>
            <p className="text-muted-foreground">Reparaciones y servicios completados</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            <span>Exportar historial</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Servicios completados</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
            <CardDescription>Total de servicios: {reparaciones.length}</CardDescription>
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar servicio..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha inicio</TableHead>
                  <TableHead>Fecha fin</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead className="w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reparaciones.map((reparacion) => (
                  <TableRow key={reparacion.id}>
                    <TableCell>{reparacion.vehiculo}</TableCell>
                    <TableCell>{reparacion.cliente}</TableCell>
                    <TableCell>{reparacion.servicio}</TableCell>
                    <TableCell>{reparacion.fechaInicio}</TableCell>
                    <TableCell>{reparacion.fechaFin}</TableCell>
                    <TableCell>{reparacion.tecnico}</TableCell>
                    <TableCell>{reparacion.costo}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" />
                            Ver factura
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Crear servicio similar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
};
export default ReparacionesHistorial;