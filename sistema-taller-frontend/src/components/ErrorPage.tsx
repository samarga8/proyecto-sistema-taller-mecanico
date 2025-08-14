import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | AutoTaller</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">Error 404</h1>
            <p className="text-xl mb-6">La página que buscas no existe.</p>
            <Link to="/" className="text-primary hover:underline">
              Volver a la página principal
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ErrorPage;