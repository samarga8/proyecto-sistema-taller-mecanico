import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { Textarea } from "../components/ui/textarea";
import { Loader2, Mail, Phone, MapPin, Clock } from "lucide-react";
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }),
  telefono: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 dígitos.",
  }),
  asunto: z.string().min(2, {
    message: "El asunto debe tener al menos 2 caracteres.",
  }),
  mensaje: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});
type FormData = z.infer<typeof formSchema>;
const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    },
  });
  function onSubmit(data: FormData) {
    setIsLoading(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      console.log("Contact form data:", data);
      toast.success("Mensaje enviado correctamente");
      form.reset();
      setIsLoading(false);
    }, 1500);
  }
  return (
    <>
      <Helmet>
        <title>Contacto | AutoTaller</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-24 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ¿Tienes alguna pregunta o necesitas agendar un servicio? Estamos aquí para ayudarte.
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-md border-border">
                  <CardHeader>
                    <CardTitle>Envíanos un mensaje</CardTitle>
                    <CardDescription>
                      Completa el formulario y te responderemos a la brevedad
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Juan Pérez" 
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
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
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="telefono"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="1234567890" 
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="asunto"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Asunto</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Consulta sobre servicios" 
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="mensaje"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensaje</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Escribe tu mensaje aquí..." 
                                  className="min-h-32 resize-none"
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
                            "Enviar mensaje"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="shadow-md border-border mb-6">
                  <CardHeader>
                    <CardTitle>Información de contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Teléfono</h3>
                        <p className="text-muted-foreground">(+34) 623 45 78 90</p>
                        <p className="text-muted-foreground">(+34) 698 76 43 21</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Correo electrónico</h3>
                        <p className="text-muted-foreground">info@autotaller.com</p>
                        <p className="text-muted-foreground">soporte@autotaller.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Dirección</h3>
                        <p className="text-muted-foreground">
                          Av. Pintor 123<br />
                          Valencia, CP 46823<br />
                          España
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Horario de atención</h3>
                        <p className="text-muted-foreground">Lunes a Viernes: 8:00 - 19:00</p>
                        <p className="text-muted-foreground">Sábados: 9:00 - 14:00</p>
                        <p className="text-muted-foreground">Domingos: Cerrado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md border-border overflow-hidden">
                  <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="w-full h-64 bg-muted relative">
                      <iframe
                        className="w-full h-full"
                        frameBorder="0"
                        title="Mapa de ubicación"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661742482853!2d-99.16869742373058!3d19.427023081748614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sZocalo%2C%20Centro%20Hist%C3%B3rico%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1690228953902!5m2!1ses-419!2smx"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
export default Contact;