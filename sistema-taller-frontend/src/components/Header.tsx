import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu, X, Wrench, Car } from "lucide-react";
import { motion } from "framer-motion";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Contacto", href: "/contacto" }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Car className="h-8 w-8 text-secondary mr-2" />
            <span className="font-bold text-lg text-foreground">
              <span className="text-primary">Auto</span>
              <span className="text-secondary">Taller</span>
            </span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="hidden md:flex space-x-4">
            <Button asChild variant="ghost" className="text-foreground hover:text-primary hover:bg-muted">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/registro">Registrarse</Link>
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Car className="h-6 w-6 text-secondary mr-2" />
                    <span className="font-bold text-lg">
                      <span className="text-primary">Auto</span>
                      <span className="text-secondary">Taller</span>
                    </span>
                  </div>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8">
                  <ul className="space-y-4">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.href}
                          className="text-foreground hover:text-primary text-lg block py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 space-y-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
                    </Button>
                    <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <Link to="/registro" onClick={() => setIsOpen(false)}>Registrarse</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;