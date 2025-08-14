import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "../components/ui/separator";
const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-medium mb-4">AutoTaller</h3>
            <p className="text-muted-foreground mb-4">
              Servicio profesional de mecánica automotriz con más de 15 años de experiencia.
              Ofrecemos diagnóstico preciso y reparaciones garantizadas para todo tipo de vehículos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Inicio</Link>
              </li>
              <li>
                <Link to="/servicios" className="text-muted-foreground hover:text-primary">Servicios</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary">Contacto</Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/registro" className="text-muted-foreground hover:text-primary">Registrarse</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5 text-secondary" />
                <span className="text-muted-foreground">+52 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 text-secondary" />
                <span className="text-muted-foreground">info@autotaller.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-secondary" />
                <span className="text-muted-foreground">Av. Pintor 123, Valencia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AutoTaller. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link to="/terminos" className="text-sm text-muted-foreground hover:text-primary">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-sm text-muted-foreground hover:text-primary">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;