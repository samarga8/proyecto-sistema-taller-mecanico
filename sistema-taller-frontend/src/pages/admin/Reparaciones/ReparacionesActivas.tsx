import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Wrench, Search, MoreHorizontal, Filter, Download, Eye, Check } from "lucide-react";
const reparaciones = [
  { id: 1, vehiculo: "Toyota Corolla 2020", cliente: "Carlos Rodríguez", servicio: "Cambio de frenos", fechaInicio: "17/07/2025", fechaEstimada: "20/07/2025", tecnico: "Miguel Álvarez", estado: "En progreso", progreso: 75 },
  { id: 2, vehiculo: "Honda Civic 2019", cliente: "María González", servicio: "Afinación completa", fechaInicio: "18/07/2025", fechaEstimada: "21/07/2025", tecnico: "Pedro Ruiz", estado: "En progreso", progreso: 45 },
  { id: 3, vehiculo: "Nissan Sentra 2021", cliente: "Juan Pérez", servicio: "Cambio de aceite", fechaInicio: "19/07/2025", fechaEstimada: "19/07/2025", tecnico: "Luis Torres", estado: "En progreso", progreso: 90 },
  { id: 4, vehiculo: "Chevrolet Cruze 2022", cliente: "Roberto Sánchez", servicio: "Diagnóstico general", fechaInicio: "19/07/2025", fechaEstimada: "20/07/2025", tecnico: "Miguel Álvarez", estado: "Esperando repuestos", progreso: 30 },
  { id: 5, vehiculo: "Volkswagen Jetta 2018", cliente: "Ana Martínez", servicio: "Cambio de suspensión", fechaInicio: "16/07/2025", fechaEstimada: "22/07/2025", tecnico: "Pedro Ruiz", estado: "En progreso", progreso: 60 },
];
const ReparacionesActivas = () => {
  return (
    <>
      <Helmet>
        <title>Reparaciones Activas | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Reparaciones Activas</h1>
            <p className="text-muted-foreground">Reparaciones y servicios en curso actualmente</p>
          </div>
          <Button>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Nueva reparación</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Lista de reparaciones activas</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>
            <CardDescription>Total de reparaciones activas: {reparaciones.length}</CardDescription>
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar reparación..." className="pl-8" />
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
                  <TableHead>Inicio</TableHead>
                  <TableHead>Fecha est.</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
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
                    <TableCell>{reparacion.fechaEstimada}</TableCell>
                    <TableCell>{reparacion.tecnico}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={reparacion.estado === "En progreso" ? "default" : "outline"}
                      >
                        {reparacion.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={reparacion.progreso} className="h-2 w-[60px]" />
                        <span className="text-xs">{reparacion.progreso}%</span>
                      </div>
                    </TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Actualizar progreso
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Marcar como completada
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
export default ReparacionesActivas;