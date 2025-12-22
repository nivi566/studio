
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
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
                                <p className="text-muted-foreground">Calle Resina, 41<br />28021, Madrid, España</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Email</h3>
                                <p className="text-muted-foreground">info@intrack-logistics.es</p>
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
                            <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" name="name" placeholder="Tu nombre" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Asunto</Label>
                                    <Input id="subject" name="subject" placeholder="Asunto del mensaje" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[120px]" required />
                                </div>
                                <Button type="submit" className="w-full">Enviar Mensaje</Button>
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
