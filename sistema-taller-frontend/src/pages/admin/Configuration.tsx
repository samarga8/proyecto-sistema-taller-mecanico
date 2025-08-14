import { Helmet } from "react-helmet-async";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../../components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, User, Building, Bell, Shield, Save, Users, Database } from "lucide-react";
const Configuracion = () => {
  return (
    <>
      <Helmet>
        <title>Configuración | AutoTaller</title>
      </Helmet>
      
      <main className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Configuración</h1>
          <p className="text-muted-foreground">Gestiona las configuraciones del sistema</p>
        </div>
        
        <Tabs defaultValue="empresa" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="empresa">
              <Building className="h-4 w-4 mr-2" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="usuarios">
              <Users className="h-4 w-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="notificaciones">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="seguridad">
              <Shield className="h-4 w-4 mr-2" />
              Seguridad
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="empresa" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Información de la empresa</CardTitle>
                <CardDescription>Configura la información básica de tu taller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del taller</Label>
                    <Input id="nombre" defaultValue="AutoTaller Mecánica General" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC</Label>
                    <Input id="rfc" defaultValue="ATM010101ABC" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" defaultValue="Av. Revolución #1234, Col. Centro" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input id="ciudad" defaultValue="Ciudad de México" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" defaultValue="CDMX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cp">Código Postal</Label>
                    <Input id="cp" defaultValue="01000" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" defaultValue="55-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contacto@autotaller.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="horario">Horario de atención</Label>
                  <Input id="horario" defaultValue="Lunes a Viernes 9:00 - 18:00, Sábados 9:00 - 14:00" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuración fiscal</CardTitle>
                <CardDescription>Configura los datos para la facturación electrónica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="regimen">Régimen fiscal</Label>
                    <Select defaultValue="601">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar régimen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="601">General de Ley Personas Morales</SelectItem>
                        <SelectItem value="612">Personas Físicas con Actividades Empresariales</SelectItem>
                        <SelectItem value="621">Régimen de Incorporación Fiscal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificado">Certificado SAT</Label>
                    <div className="flex gap-2">
                      <Input id="certificado" defaultValue="CSD12345678.cer" disabled />
                      <Button variant="outline" size="sm" className="shrink-0">
                        Examinar
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="facturacion-auto" defaultChecked />
                  <Label htmlFor="facturacion-auto">Habilitar facturación automática</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="usuarios" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de usuarios</CardTitle>
                <CardDescription>Administra los usuarios que tienen acceso al sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { nombre: "Juan Díaz", email: "juan@autotaller.com", rol: "Administrador", activo: true },
                    { nombre: "Miguel Álvarez", email: "miguel@autotaller.com", rol: "Técnico", activo: true },
                    { nombre: "Pedro Ruiz", email: "pedro@autotaller.com", rol: "Técnico", activo: true },
                    { nombre: "Luis Torres", email: "luis@autotaller.com", rol: "Técnico", activo: true },
                    { nombre: "Ana García", email: "ana@autotaller.com", rol: "Recepcionista", activo: false },
                  ].map((usuario, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{usuario.nombre}</p>
                          <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{usuario.rol}</Badge>
                        <Switch id={`usuario-${index}`} checked={usuario.activo} />
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Agregar nuevo usuario
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notificaciones" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificaciones por email</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Citas nuevas</p>
                        <p className="text-sm text-muted-foreground">Recibir notificación cuando se agende una cita nueva</p>
                      </div>
                      <Switch id="email-citas" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios de citas</p>
                        <p className="text-sm text-muted-foreground">Enviar recordatorios de citas 24 horas antes</p>
                      </div>
                      <Switch id="email-recordatorios" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Stock bajo</p>
                        <p className="text-sm text-muted-foreground">Alertar cuando los productos alcancen el stock mínimo</p>
                      </div>
                      <Switch id="email-stock" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Facturas emitidas</p>
                        <p className="text-sm text-muted-foreground">Recibir copia de las facturas emitidas</p>
                      </div>
                      <Switch id="email-facturas" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificaciones SMS</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Confirmación de citas</p>
                        <p className="text-sm text-muted-foreground">Enviar SMS de confirmación al agendar citas</p>
                      </div>
                      <Switch id="sms-confirmacion" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios de citas</p>
                        <p className="text-sm text-muted-foreground">Enviar recordatorios por SMS 24 horas antes</p>
                      </div>
                      <Switch id="sms-recordatorios" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Servicio completado</p>
                        <p className="text-sm text-muted-foreground">Notificar cuando el servicio esté listo</p>
                      </div>
                      <Switch id="sms-servicio" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="seguridad" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad y privacidad</CardTitle>
                <CardDescription>Configura las opciones de seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contraseñas</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cambiar contraseña cada 90 días</p>
                        <p className="text-sm text-muted-foreground">Solicitar cambio de contraseña periódicamente</p>
                      </div>
                      <Switch id="cambio-password" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Contraseñas complejas</p>
                        <p className="text-sm text-muted-foreground">Requerir mínimo 8 caracteres con mayúsculas, minúsculas y números</p>
                      </div>
                      <Switch id="password-compleja" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bloqueo tras intentos fallidos</p>
                        <p className="text-sm text-muted-foreground">Bloquear cuenta tras 5 intentos fallidos de inicio de sesión</p>
                      </div>
                      <Switch id="bloqueo-intentos" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Respaldos</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Respaldo automático diario</p>
                        <p className="text-sm text-muted-foreground">Realizar respaldo de la base de datos diariamente</p>
                      </div>
                      <Switch id="respaldo-diario" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Almacenamiento en la nube</p>
                        <p className="text-sm text-muted-foreground">Guardar respaldos en almacenamiento seguro en la nube</p>
                      </div>
                      <Switch id="respaldo-nube" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-start pt-2">
                    <Button variant="outline">
                      <Database className="mr-2 h-4 w-4" />
                      Realizar respaldo manual
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};
const Badge = ({ children, variant }: { children: React.ReactNode, variant?: "default" | "secondary" | "outline" | "destructive" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      variant === "default" ? "bg-primary text-primary-foreground" :
      variant === "secondary" ? "bg-secondary text-secondary-foreground" :
      variant === "destructive" ? "bg-destructive text-destructive-foreground" :
      "border border-border text-muted-foreground"
    }`}>
      {children}
    </span>
  );
};
export default Configuracion;