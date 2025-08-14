import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Loader2, KeyRound } from "lucide-react";
const formSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }),
});
type FormData = z.infer<typeof formSchema>;
const RecoverPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: FormData) {
    setIsLoading(true);
    
    // Simulación de envío de correo de recuperación
    setTimeout(() => {
      console.log("Recovery email sent to:", data.email);
      toast.success("Instrucciones enviadas a tu correo");
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  }
  return (
    <>
      <Helmet>
        <title>Recuperar Contraseña | AutoTaller</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center px-4 py-16 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-border shadow-lg">
              <CardHeader className="space-y-2 text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <KeyRound className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">Recuperar contraseña</CardTitle>
                <CardDescription>
                  Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ejemplo@correo.com" 
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar instrucciones"
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Correo enviado</h3>
                    <p className="text-muted-foreground mb-6">
                      Hemos enviado las instrucciones para restablecer tu contraseña al correo proporcionado.
                      Por favor revisa tu bandeja de entrada y sigue los pasos indicados.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/login">Volver a inicio de sesión</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  ¿Recordaste tu contraseña?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Iniciar sesión
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
export default RecoverPassword;