
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
        icon: Users,
        title: 'Atrae más clientes',
        description: 'Converteix-te en un punt de referència al teu barri. Els usuaris que recullen paquets sovint realitzen compres addicionals al teu establiment.'
    },
    {
        icon: DollarSign,
        title: 'Genera ingressos passius',
        description: 'Rep una comissió per cada paquet gestionat des del teu Locker. Una font d\'ingressos addicional sense esforç.'
    },
    {
        icon: CheckCircle2,
        title: 'Sense cap cost per a tu',
        description: 'Nosaltres ens encarreguem de la instal·lació, el manteniment i el suport tècnic del Locker, tot sense cap cost per al teu negoci.'
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
                            Converteix el teu negoci en un punt InTrack
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Aprofita l'oportunitat d'unir-te a la nostra xarxa de Lockers intel·ligents. Ofereix un servei valuós a la teva comunitat, atrau nous clients i genera ingressos addicionals sense cap inversió.
                        </p>
                        <Button size="lg" asChild>
                           <a href="#contact-form">Sol·licita informació</a>
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
                        Beneficis per al teu negoci
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Descobreix per què instal·lar un Locker InTrack és una decisió intel·ligent.
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
                        <CardTitle className="text-3xl">¿Estàs interessat?</CardTitle>
                        <p className="text-muted-foreground pt-2">Deixa'ns les teves dades i un dels nostres especialistes es posarà en contacte amb tu per explicar-te tots els detalls sense compromís.</p>
                    </CardHeader>
                    <CardContent>
                        <form action="https://formspree.io/f/xrbnkanl" method="POST" className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom i cognoms</Label>
                                    <Input id="name" name="name" placeholder="El teu nom" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="business-name">Nom del negoci</Label>
                                    <Input id="business-name" name="business-name" placeholder="Nom del teu negoci" required />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correu electrònic</Label>
                                    <Input id="email" name="email" type="email" placeholder="el_teu@email.com" required />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="phone">Telèfon</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="El teu telèfon de contacte" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Missatge (opcional)</Label>
                                <Textarea id="message" name="message" placeholder="Explica'ns una mica sobre el teu negoci o si tens alguna pregunta..." className="min-h-[100px]" />
                            </div>
                            <Button type="submit" className="w-full" size="lg">Enviar sol·licitud</Button>
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
