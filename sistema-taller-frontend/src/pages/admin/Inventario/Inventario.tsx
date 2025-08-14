import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Package, Search, MoreHorizontal, Filter, Download, Plus, FileText, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { isLoggedIn, getToken } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { listarProductos, eliminarProducto } from "../../../services/inventarioService";
import { InventarioDTO } from "@/models/InventarioDTO";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";

function Inventario() {
  const navigate = useNavigate();
  const [inventario, setInventario] = useState<InventarioDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productoAEliminar, setProductoAEliminar] = useState<number | null>(null);
  const [eliminando, setEliminando] = useState<boolean>(false);

  // Función para cargar los productos
  const cargarProductos = async () => {
    // Verificar autenticación antes de hacer peticiones
    if (!isLoggedIn()) {
      console.log('Usuario no autenticado, redirigiendo al login');
      setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
      navigate('/login');
      return;
    }

    try {
      setCargando(true);
           
      const productos = await listarProductos();
      // Asegurarse de que productos sea un array
      if (Array.isArray(productos)) {
        setInventario(productos);
      } else {
        // Si no es un array, establecer un array vacío
        console.error('La respuesta de la API no es un array:', productos);
        setInventario([]);
        setError('Formato de respuesta incorrecto');
      }
    } catch (err: any) {
      console.error('Error al cargar productos:', err);
      
      setError(err.message || 'Error al cargar los productos');
      setInventario([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para manejar la eliminación de un producto
  const handleEliminarProducto = async () => {
    if (productoAEliminar === null) return;

    try {
      setEliminando(true);
      await eliminarProducto(productoAEliminar);
      toast.success("Producto eliminado correctamente");
      // Recargar la lista de productos
      await cargarProductos();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar el producto");
    } finally {
      setEliminando(false);
      setProductoAEliminar(null);
    }
  };

  // Calcular productos con stock bajo y crítico de manera segura
  const productosStockBajo = Array.isArray(inventario) ?
    inventario.filter(p => p && p.estado === "Bajo").length : 0;

  const productosStockCritico = Array.isArray(inventario) ?
    inventario.filter(p => p && p.estado === "Crítico").length : 0;

  return (
    <>
      <Helmet>
        <title>Inventario | AutoTaller</title>
      </Helmet>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={productoAEliminar !== null} onOpenChange={(open) => !open && setProductoAEliminar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={eliminando}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEliminarProducto}
              disabled={eliminando}
              className="bg-red-600 hover:bg-red-700"
            >
              {eliminando ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Inventario</h1>
              <p className="text-muted-foreground">Gestiona el inventario de repuestos y productos</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/inventario/nuevo")}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Nuevo producto</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventario.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                En {Array.isArray(inventario) && inventario.length > 0 ?
                  new Set(inventario.map(p => p.categoria)).size : 0} categorías diferentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Productos con stock bajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{productosStockBajo}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requieren reabastecimiento pronto
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Stock crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{productosStockCritico}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requieren atención inmediata
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Lista de productos</CardTitle>

            </div>
            <CardDescription>Total de productos: {inventario.length}</CardDescription>
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar producto..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {cargando ? (
              <div className="text-center py-4">Cargando productos...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : inventario.length === 0 ? (
              <div className="text-center py-4">No hay productos en el inventario</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Mínimo</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[80px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventario.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{producto.nombre}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell>{producto.stockActual}</TableCell>
                      <TableCell>{producto.stockMinimo}</TableCell>
                      <TableCell>{producto.precio}€</TableCell>
                      <TableCell>{producto.ubicacion}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            producto.estado === "Normal" ? "secondary" :
                              producto.estado === "Bajo" ? "outline" :
                                "destructive"
                          }
                        >
                          {producto.estado}
                        </Badge>
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
                            <DropdownMenuItem onClick={() => navigate(`/admin/inventario/detalles/${producto.id}`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/admin/inventario/editar/${producto.id}`)}>
                            Editar producto
                          </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => navigate(`/admin/inventario/stock/${producto.id}`)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Añadir stock
                          </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setProductoAEliminar(producto.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Inventario;