import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Car, 
  CheckCircle, 
  Battery, 
  Gauge, 
  Sparkles, 
  Fuel, 
  Cog, 
  FileCheck, 
  Clock, 
  Settings 
} from "lucide-react";
const Services = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  const services = [
    {
      id: "mantenimiento",
      title: "Mantenimiento Preventivo",
      description: "Servicios para mantener tu vehículo en óptimas condiciones y prevenir problemas futuros.",
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      items: [
        {
          id: "mantenimiento-1", // Añadir un ID único
          title: "Cambio de aceite y filtros",
          description: "Cambio de aceite, filtro de aceite, filtro de aire y filtro de combustible según las especificaciones del fabricante.",
          icon: <Sparkles className="h-6 w-6" />,
          price: "$800 - $1,500"
        },
        {
          title: "Afinación completa",
          description: "Revisión y ajuste de bujías, cables, bobinas, inyectores y sistemas de encendido.",
          icon: <Settings className="h-6 w-6" />,
          price: "$1,200 - $3,000"
        },
        {
          title: "Revisión de frenos",
          description: "Inspección de pastillas, discos, tambores y líquido de frenos con ajuste o reemplazo según sea necesario.",
          icon: <FileCheck className="h-6 w-6" />,
          price: "$600 - $2,500"
        },
        {
          title: "Servicio de suspensión",
          description: "Revisión de amortiguadores, resortes, bujes y componentes del sistema de suspensión.",
          icon: <Cog className="h-6 w-6" />,
          price: "$800 - $4,000"
        }
      ]
    },
    {
      id: "reparacion",
      title: "Reparación Mecánica",
      description: "Diagnóstico y solución de problemas mecánicos para todos los sistemas de tu vehículo.",
      icon: <Wrench className="h-10 w-10 text-secondary" />,
      items: [
        {
          title: "Reparación de motor",
          description: "Diagnóstico y reparación de problemas del motor, incluyendo sobrecalentamiento, pérdida de potencia y ruidos anormales.",
          icon: <Wrench className="h-6 w-6" />,
          price: "$2,000 - $15,000"
        },
        {
          title: "Sistema de transmisión",
          description: "Reparación de transmisión manual, automática o CVT, incluyendo embrague y componentes relacionados.",
          icon: <Cog className="h-6 w-6" />,
          price: "$3,500 - $20,000"
        },
        {
          title: "Sistema eléctrico",
          description: "Diagnóstico y reparación de problemas eléctricos, incluyendo batería, alternador, arranque y cableado.",
          icon: <Battery className="h-6 w-6" />,
          price: "$800 - $5,000"
        },
        {
          title: "Sistema de combustible",
          description: "Limpieza y reparación de inyectores, bombas de combustible y componentes relacionados.",
          icon: <Fuel className="h-6 w-6" />,
          price: "$1,200 - $6,000"
        }
      ]
    },
    {
      id: "diagnostico",
      title: "Diagnóstico Computarizado",
      description: "Utilizamos tecnología avanzada para identificar con precisión los problemas de tu vehículo.",
      icon: <Gauge className="h-10 w-10 text-accent" />,
      items: [
        {
          title: "Diagnóstico por escáner",
          description: "Lectura y análisis de códigos de error mediante escáner computarizado compatible con todas las marcas.",
          icon: <Car className="h-6 w-6" />,
          price: "$500 - $800"
        },
        {
          title: "Análisis de rendimiento",
          description: "Evaluación completa del rendimiento del vehículo, potencia, consumo y emisiones.",
          icon: <Gauge className="h-6 w-6" />,
          price: "$800 - $1,500"
        },
        {
          title: "Diagnóstico eléctrico",
          description: "Pruebas especializadas para sistemas eléctricos y electrónicos del vehículo.",
          icon: <Battery className="h-6 w-6" />,
          price: "$600 - $1,200"
        },
        {
          title: "Revisión pre-compra",
          description: "Evaluación completa del estado de un vehículo antes de su adquisición.",
          icon: <FileCheck className="h-6 w-6" />,
          price: "$1,200 - $2,000"
        }
      ]
    }
  ];
  return (
    <>
      <Helmet>
        <title>Servicios | AutoTaller</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-24 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ofrecemos una amplia gama de servicios de mantenimiento y reparación para todo tipo de vehículos.
                Nuestros técnicos certificados utilizan herramientas y equipos de última generación para garantizar
                la mejor calidad en cada servicio.
              </p>
            </div>
            
            <Tabs defaultValue="mantenimiento" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 max-w-xl mx-auto">
                <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
                <TabsTrigger value="reparacion">Reparación</TabsTrigger>
                <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
              </TabsList>
              
              {services.map((service) => (
                <TabsContent key={service.id} value={service.id} className="mt-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-10">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div className="text-center md:text-left md:mt-2">
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {service.items.map((item,index) => (
                      <motion.div
                        key={item.id} 
                        custom={index} 
                        variants={fadeInUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Card className="h-full border-border shadow-sm transition-all hover:shadow-md">
                          <CardHeader>
                            <div className="mb-3 text-primary">
                              {item.icon}
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="text-sm">
                              Desde {item.price}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link to="/contacto">Solicitar servicio</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">¿Necesitas un servicio urgente?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Contamos con servicio de atención prioritaria para emergencias mecánicas.
                Contáctanos y te atenderemos lo antes posible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contacto">Contactar ahora</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+521234567890">Llamar: (123) 456-7890</a>
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
export default Services;