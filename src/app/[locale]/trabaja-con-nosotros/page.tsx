

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const jobOpenings = [
  {
    title: 'Especialista en Logística',
    location: 'Madrid, España',
    type: 'Jornada Completa',
    description: 'Buscamos un especialista en logística con experiencia para unirse a nuestro equipo de operaciones. Serás responsable de la planificación y optimización de rutas.'
  },
  {
    title: 'Desarrollador/a de Software',
    location: 'Remoto',
    type: 'Jornada Completa',
    description: 'Únete a nuestro equipo de tecnología para desarrollar y mantener nuestra plataforma logística de vanguardia. Experiencia en Next.js y TypeScript es un plus.'
  },
  {
    title: 'Atención al Cliente',
    location: 'Barcelona, España',
    type: 'Media Jornada',
    description: 'Buscamos una persona proactiva y con excelentes habilidades de comunicación para dar soporte a nuestros clientes y resolver incidencias.'
  }
];

export default function WorkWithUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Forma parte de nuestro equipo
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              En InTrack, creemos que nuestro equipo es nuestro mayor activo. Buscamos personas apasionadas, innovadoras y comprometidas que quieran revolucionar el sector de la logística con nosotros.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Ofertas de empleo activas</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 pt-2">
                       <div className="flex items-center gap-2">
                         <Briefcase className="h-4 w-4" />
                         <span>{job.type}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <MapPin className="h-4 w-4" />
                         <span>{job.location}</span>
                       </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-4 text-primary">
                      <Link href="#" className="flex items-center gap-1">
                        Saber más <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <Card className="mt-12 bg-primary/5 text-center">
                <CardHeader>
                    <CardTitle>¿No encuentras tu oferta ideal?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Siempre estamos buscando talento. Si crees que puedes encajar en InTrack, ¡nos encantaría saber de ti!</p>
                    <Button asChild>
                        <a href="mailto:rrhh@intrack-logistics.es">Envíanos tu CV</a>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
