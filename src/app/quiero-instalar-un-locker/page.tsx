
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const benefits = [
    {
        icon: CheckCircle2,
        title: 'Sin coste ni complicaciones',
        description: 'Nosotros nos encargamos de la instalación, el mantenimiento y el soporte técnico del Locker, todo sin ningún coste para tu negocio.'
    },
    {
        icon: DollarSign,
        title: 'Genera ingresos pasivos',
        description: 'Recibe una comisión por cada paquete gestionado desde tu Locker. Una fuente de ingresos adicional sin esfuerzo.'
    },
    {
        icon: Users,
        title: 'Atrae más clientes',
        description: 'Conviértete en un punto de referencia en tu barrio. Los usuarios que recogen paquetes a menudo realizan compras adicionales en tu establecimiento.'
    }
];

export default function InstallLockerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative bg-primary/5 py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                            Convierte tu negocio en un punto InTrack
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Aprovecha la oportunidad de unirte a nuestra red de Lockers inteligentes. Ofrece un servicio valioso a tu comunidad, atrae nuevos clientes y genera ingresos adicionales sin ninguna inversión.
                        </p>
                        <Button size="lg" asChild>
                           <a href="#contact-form">Solicita información</a>
                        </Button>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/locker.png"
                            alt="Taquilla intel·ligent de InTrack en un negoci local"
                            data-ai-hint="smart locker"
                            width={600}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24">
             <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Beneficios para tu negocio
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Descubre por qué instalar un Locker InTrack es una decisión inteligente.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit) => (
                        <Card key={benefit.title} className="text-center p-6 border-0 shadow-lg">
                             <CardHeader className="items-center p-0">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <benefit.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="mt-4 text-xl">{benefit.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="contact-form" className="py-16 sm:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                 <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">¿Estás interesado?</CardTitle>
                        <p className="text-muted-foreground pt-2">Déjanos tus datos y uno de nuestros especialistas se pondrá en contacto contigo para explicarte todos los detalles sin compromiso.</p>
                    </CardHeader>
                    <CardContent>
                        <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre y apellidos</Label>
                                    <Input id="name" name="name" placeholder="Tu nombre" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="business-name">Nombre del negocio</Label>
                                    <Input id="business-name" name="business-name" placeholder="Nombre de tu negocio" required />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="Tu teléfono de contacto" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Mensaje (opcional)</Label>
                                <Textarea id="message" name="message" placeholder="Cuéntanos un poco sobre tu negocio o si tienes alguna pregunta..." className="min-h-[100px]" />
                            </div>
                            <Button type="submit" className="w-full" size="lg">Enviar solicitud</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
