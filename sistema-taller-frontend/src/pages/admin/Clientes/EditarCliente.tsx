import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { actualizarCliente, obtenerClientePorId } from "../../../services/clienteService";
import { ICliente } from "@/models/ICliente";


const EditarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const clienteId = parseInt(id || "0");

  const [nombreCompleto, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    direccion: ""
  });

  // Cargar datos del cliente
  useEffect(() => {
    const cargarDatosCliente = async () => {
      try {
        setLoading(true);
        const clienteData = await obtenerClientePorId(clienteId);

        // Actualizar estados con los datos del cliente
        setNombre(clienteData.nombreCompleto);
        setEmail(clienteData.email);
        setTelefono(clienteData.telefono);
        setDireccion(clienteData.direccion);
        setDni(clienteData.dni || "");

      } catch (error: any) {
        toast.error(error.message || "Error al cargar los datos del cliente");
        navigate("/admin/clientes");
      } finally {
        setLoading(false);
      }
    };

    if (clienteId > 0) {
      cargarDatosCliente();
    }
  }, [clienteId, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validación manual
    const errors = {
      nombreCompleto: "",
      email: "",
      telefono: "",
      direccion: ""
    };

    let hasError = false;

    if (nombreCompleto.length < 2) {
      errors.nombreCompleto = "El nombre debe tener al menos 2 caracteres";
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email inválido";
      hasError = true;
    }

    if (!/^\d{6,15}$/.test(telefono)) {
      errors.telefono = "Teléfono inválido (solo números, mínimo 6 dígitos)";
      hasError = true;
    }

    if (direccion.length < 5) {
      errors.direccion = "Dirección inválida";
      hasError = true;
    }

    setFormErrors(errors);

    if (hasError) {
      return;
    }

    try {
      setLoading(true);

      // Crear objeto cliente con los datos actualizados
      const clienteActualizado: ICliente = {
        id: clienteId,
        nombreCompleto: nombreCompleto,
        email: email,
        telefono: telefono,
        direccion: direccion,
        dni: dni
      };

      // Llamar al servicio para actualizar el cliente
      await actualizarCliente(clienteId, clienteActualizado);

      toast.success("Cliente actualizado correctamente");
      navigate(`/admin/clientes`);
    } catch (error) {
      toast.error("Error al actualizar el cliente");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Editar Cliente | AutoTaller</title>
      </Helmet>

      <main className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/admin/clientes/detalle/${clienteId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Editar Cliente</h1>
            <p className="text-muted-foreground">Modifica la información del cliente</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Información del cliente</CardTitle>
            <CardDescription>
              Modifica los datos del cliente. Los campos marcados con * son obligatorios.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo *</Label>
                <Input
                  id="nombre"
                  placeholder="Nombre y apellidos"
                  value={nombreCompleto}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={loading}
                />
                {formErrors.nombreCompleto && (
                  <p className="text-sm font-medium text-destructive">{formErrors.nombreCompleto}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                {formErrors.email && (
                  <p className="text-sm font-medium text-destructive">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  placeholder="111-11-11-11"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={loading}
                />
                {formErrors.telefono && (
                  <p className="text-sm font-medium text-destructive">{formErrors.telefono}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  placeholder="Calle, número, ciudad..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  disabled={loading}
                />
                {formErrors.direccion && (
                  <p className="text-sm font-medium text-destructive">{formErrors.direccion}</p>
                )}
              </div>

            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/admin/clientes/detalle/${clienteId}`)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </>
  );
};

export default EditarCliente;