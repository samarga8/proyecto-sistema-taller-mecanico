import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad | AutoTaller</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-24">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 inline-flex items-center text-muted-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="lead">
              En AutoTaller, la privacidad de nuestros usuarios es de suma importancia. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información personal cuando utiliza nuestro Sistema de Gestión de Taller Mecánico.
            </p>
            
            <h2>1. Información que Recopilamos</h2>
            <p>
              Recopilamos la siguiente información personal:
            </p>
            <ul>
              <li>Información de identificación (nombre, apellidos, correo electrónico, teléfono)</li>
              <li>Información sobre vehículos (marca, modelo, año, número de serie, placa)</li>
              <li>Historial de servicios y reparaciones</li>
              <li>Información de facturación y pagos</li>
              <li>Datos de uso del sistema y preferencias</li>
            </ul>
            
            <h2>2. Cómo Utilizamos su Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul>
              <li>Proporcionar y mantener nuestro sistema</li>
              <li>Procesar citas, servicios y pagos</li>
              <li>Enviar notificaciones relacionadas con su cuenta o vehículo</li>
              <li>Mejorar nuestro sistema y desarrollar nuevas funcionalidades</li>
              <li>Analizar tendencias de uso y optimizar la experiencia del usuario</li>
              <li>Prevenir actividades fraudulentas y proteger la seguridad de nuestros usuarios</li>
            </ul>
            
            <h2>3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger la información personal que recopilamos. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de su información.
            </p>
            
            <h2>4. Compartición de Información</h2>
            <p>
              No vendemos su información personal a terceros. Podemos compartir su información en las siguientes circunstancias:
            </p>
            <ul>
              <li>Con proveedores de servicios que nos ayudan a operar nuestro sistema</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
              <li>En caso de fusión, venta o transferencia de activos empresariales</li>
              <li>Con su consentimiento explícito</li>
            </ul>
            
            <h2>5. Sus Derechos</h2>
            <p>
              Usted tiene derecho a:
            </p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Eliminar su información (con ciertas limitaciones)</li>
              <li>Oponerse o limitar el procesamiento de sus datos</li>
              <li>Recibir una copia de su información en un formato estructurado</li>
            </ul>
            
            <h2>6. Retención de Datos</h2>
            <p>
              Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que se requiera o permita un período de retención más largo por ley.
            </p>
            
            <h2>7. Cambios a esta Política</h2>
            <p>
              Podemos actualizar nuestra Política de Privacidad periódicamente. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y, si los cambios son significativos, le enviaremos una notificación.
            </p>
            
            <h2>8. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta Política de Privacidad, por favor contáctenos en privacidad@autotaller.com.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
export default Privacy;