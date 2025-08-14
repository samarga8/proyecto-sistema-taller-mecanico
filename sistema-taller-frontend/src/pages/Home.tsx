import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  UserCheck, 
  Car, 
  ArrowRight, 
  Calendar, 
  Cog, 
  ChevronRight 
} from "lucide-react";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>AutoTaller | Sistema de Gestión para Talleres Mecánicos</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-6">
                  <ShieldCheck size={16} />
                  <span className="text-sm font-medium">Software confiable y seguro</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Sistema de Gestión para <span className="text-primary">Talleres Mecánicos</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Optimiza la administración de tu taller con nuestra plataforma integral. 
                  Gestiona citas, inventario, clientes y facturación en un solo lugar.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/registro">Registrarse</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">Iniciar sesión</Link>
                  </Button>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">JD</div>
                      <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium text-secondary">MP</div>
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent">AL</div>
                    </div>
                    <span className="ml-3 text-sm text-muted-foreground">+500 talleres confían en nosotros</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">4.9/5 calificación</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full filter blur-3xl"></div>
                
                <div className="relative bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-primary/10 px-6 py-4 border-b border-border">
                    <div className="flex items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="ml-4 text-sm font-medium">Dashboard - Taller Mecánico</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Citas del día</h3>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-2xl font-bold">8</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span className="text-green-500">↑ 12%</span> vs. semana pasada
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Vehículos en taller</h3>
                          <Car className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-2xl font-bold">5</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          3 en mantenimiento, 2 en reparación
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-background p-4 rounded-lg border border-border mb-4">
                      <h3 className="text-sm font-medium mb-3">Citas programadas</h3>
                      <ul className="space-y-3">
                        {[
                          { time: "09:00", client: "Carlos Rodríguez", service: "Cambio de aceite" },
                          { time: "10:30", client: "María González", service: "Afinación completa" },
                          { time: "13:15", client: "Juan Pérez", service: "Revisión de frenos" }
                        ].map((appointment, index) => (
                          <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              <span className="font-medium mr-2">{appointment.time}</span>
                              <span>{appointment.client}</span>
                            </div>
                            <div className="text-muted-foreground">{appointment.service}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <div className="flex items-center justify-center">
                          <span>Ver todas las citas</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas para tu taller</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nuestra plataforma está diseñada específicamente para talleres mecánicos, 
                ofreciendo todas las herramientas que necesitas para optimizar tu operación.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="h-8 w-8 text-primary" />,
                  title: "Gestión de Citas",
                  description: "Programa y administra citas de forma eficiente. Envía recordatorios automáticos y reduce las inasistencias."
                },
                {
                  icon: <Car className="h-8 w-8 text-primary" />,
                  title: "Historial de Vehículos",
                  description: "Mantén un registro completo de cada vehículo, incluyendo servicios, reparaciones y recomendaciones."
                },
                {
                 
                  icon: <Wrench className="h-8 w-8 text-primary" />,
                  title: "Inventario de Repuestos",
                  description: "Controla tu inventario en tiempo real. Recibe alertas de stock bajo y genera órdenes de compra automáticamente."
                },
                {
                  icon: <UserCheck className="h-8 w-8 text-primary" />,
                  title: "Gestión de Clientes",
                  description: "Crea perfiles detallados de clientes, con historial de servicios, preferencias y comunicaciones."
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: "Control de Tiempos",
                  description: "Monitorea los tiempos de servicio y maximiza la eficiencia de tu equipo de técnicos."
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary" />,
                  title: "Facturación Integrada",
                  description: "Genera facturas y recibos directamente desde la plataforma, con integración a sistemas fiscales."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-border h-full transition-all hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2 filter blur-3xl"></div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3">
                  <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu taller?</h2>
                  <p className="text-muted-foreground mb-6">
                    Únete a más de 500 talleres que ya están aprovechando nuestra plataforma para mejorar su eficiencia, 
                    aumentar la satisfacción del cliente y hacer crecer su negocio.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link to="/registro">Comenzar ahora</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/contacto">Solicitar demo</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-background p-6 rounded-lg border border-border">
                    <h3 className="text-lg font-medium mb-4">Beneficios rápidos</h3>
                    <ul className="space-y-3">
                      {[
                        "Reducción del 30% en tiempo administrativo",
                        "Incremento del 25% en satisfacción del cliente",
                        "Disminución de errores en facturación",
                        "Mejor control de inventario y costos"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};
export default Home;