import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
const ComingSoon = () => {
  return (
    <>
      <Helmet>
        <title>Próximamente | AutoTaller</title>
      </Helmet>
      
      <div className="flex flex-col min-h-screen items-center justify-center p-8 bg-background text-center">
        <div className="flex flex-col items-center max-w-md space-y-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight">Próximamente</h1>
          
          <p className="text-lg text-muted-foreground">
            Esta funcionalidad está en desarrollo y estará disponible muy pronto.
            Estamos trabajando para ofrecerte la mejor experiencia posible.
          </p>
          
          <Button asChild className="mt-8">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al dashboard
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};
export default ComingSoon;