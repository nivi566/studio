
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
    const { toast } = useToast()

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    function onSubmit(data: ContactFormValues) {
        console.log(data);
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarnos. Te responderemos lo antes posible.",
        })
        form.reset();
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Contacta con Nosotros
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros datos de contacto.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground">Información de Contacto</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Nuestra Oficina</h3>
                                <p className="text-muted-foreground">Calle de la Logística, 123<br />28080, Madrid, España</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Email</h3>
                                <p className="text-muted-foreground">info@swiftsend.com</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Teléfono</h3>
                                <p className="text-muted-foreground">+34 912 345 678</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Tu nombre" {...field} />
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
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="tu@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Asunto</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Asunto del mensaje" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mensaje</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Escribe tu mensaje aquí..." className="min-h-[120px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Enviar Mensaje</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
