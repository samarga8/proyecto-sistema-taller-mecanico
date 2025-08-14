import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones | AutoTaller</title>
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
          
          <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el Sistema de Gestión de Taller Mecánico AutoTaller, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos y condiciones o cualquier parte de ellos, no debe utilizar este sistema.
            </p>
            
            <h2>2. Descripción del Servicio</h2>
            <p>
              AutoTaller es un sistema de gestión integral para talleres mecánicos que permite el control de citas, inventario, reparaciones, facturación y administración de clientes y vehículos. El sistema está diseñado para facilitar la operación diaria del taller y mejorar la experiencia del cliente.
            </p>
            
            <h2>3. Registro y Cuenta de Usuario</h2>
            <p>
              Para utilizar completamente el sistema, debe registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de cuenta, incluyendo su contraseña, y de todas las actividades que ocurran bajo su cuenta.
            </p>
            
            <h2>4. Uso Adecuado</h2>
            <p>
              Usted acuerda utilizar el sistema únicamente para propósitos legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sistema por parte de cualquier tercero.
            </p>
            
            <h2>5. Privacidad</h2>
            <p>
              Nuestra política de privacidad, que establece cómo utilizamos su información, forma parte de estos términos y condiciones. Al utilizar nuestro sistema, usted acepta el procesamiento de su información personal de acuerdo con nuestra política de privacidad.
            </p>
            
            <h2>6. Limitación de Responsabilidad</h2>
            <p>
              El sistema se proporciona "tal cual" y no hacemos representaciones o garantías de ningún tipo, expresas o implícitas. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestro sistema.
            </p>
            
            <h2>7. Terminación</h2>
            <p>
              Nos reservamos el derecho de terminar o suspender su acceso a nuestro sistema inmediatamente, sin previo aviso o responsabilidad, por cualquier razón, incluyendo sin limitación si usted incumple estos términos y condiciones.
            </p>
            
            <h2>8. Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Si realizamos cambios materiales a estos términos, le notificaremos mediante un aviso destacado en nuestro sistema o enviándole un correo electrónico.
            </p>
            
            <h2>9. Legislación Aplicable</h2>
            <p>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes mexicanas, y cualquier disputa relacionada con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de México.
            </p>
            
            <h2>10. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos términos y condiciones, por favor contáctenos en legal@autotaller.com.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
export default Terms;