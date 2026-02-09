'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Label } from '@/components/ui/label';
// Importamos Select de Shadcn para un look profesional
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                ¿Necesitas ayuda con tu paquete?
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Nuestro equipo humano está al otro lado de la tecnología. Escríbenos y te responderemos lo antes posible para que tu experiencia con los lockers sea perfecta.
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
                                <h3 className="font-semibold text-lg text-foreground">Sede Operativa</h3>
                                <p className="text-muted-foreground">Calle Resina, 41<br />28021, Madrid, España</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Atención al Cliente</h3>
                                <p className="text-muted-foreground">info@intrack-logistics.cat</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Teléfono Soporte</h3>
                                <p className="text-muted-foreground">+34 912 345 678</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cuadro de ayuda rápida adicional */}
                    <div className="p-6 bg-muted rounded-xl border border-border">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <MessageSquare className="h-5 w-5 text-primary" /> 
                            ¿Duda urgente?
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Si has perdido tu código de recogida, recuerda que puedes encontrarlo en el SMS o Email de confirmación que te enviamos al depositar el paquete.
                        </p>
                    </div>
                </div>

                <div>
                     <Card className="border-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Cuéntanos qué ocurre</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Importante: Mantener el action de Formspree */}
                            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" name="name" placeholder="Tu nombre" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Motivo de la consulta</Label>
                                    <Select name="reason" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="codigo">Problema con mi código / Locker</SelectItem>
                                            <SelectItem value="internacional">Envío Internacional</SelectItem>
                                            <SelectItem value="ecommerce">Soy un E-commerce / Empresa</SelectItem>
                                            <SelectItem value="otro">Otros asuntos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order">ID de Pedido o Locker (Opcional)</Label>
                                    <Input id="order" name="order_id" placeholder="Ej: INT-12345" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" name="message" placeholder="¿En qué podemos ayudarte hoy?" className="min-h-[100px]" required />
                                </div>

                                <Button type="submit" className="w-full text-lg h-12">
                                    Contactar ahora
                                </Button>
                            </form>
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