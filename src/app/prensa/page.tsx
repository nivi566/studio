
'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

const pressReleases = [
    {
        date: "2024-08-20",
        title: "InTrack revoluciona la logística de última milla con IA",
        description: "Nuestra nueva plataforma optimiza las rutas de entrega en tiempo real, reduciendo los tiempos de espera en un 30%.",
        fullContent: `
            <p class="mb-4"><strong>MADRID, 20 de agosto de 2024</strong> – InTrack, la empresa líder en soluciones logísticas innovadoras, ha anunciado hoy el lanzamiento de su nueva plataforma de optimización de última milla basada en Inteligencia Artificial (IA). Esta tecnología de vanguardia está diseñada para transformar la eficiencia de las entregas finales, prometiendo una reducción de hasta un 30% en los tiempos de espera para los clientes y una disminución significativa en la huella de carbono de las operaciones.</p>
            <p class="mb-4">La plataforma utiliza algoritmos avanzados para analizar en tiempo real variables como el tráfico, las condiciones meteorológicas y la disponibilidad de los repartidores para asignar y ajustar las rutas de entrega de manera dinámica. "Estamos redefiniendo lo que es posible en la logística", afirmó el CEO de InTrack. "No se trata solo de entregar más rápido, sino de hacerlo de manera más inteligente y sostenible".</p>
            <p>La nueva herramienta ya está siendo implementada en las principales ciudades españolas y se espera que esté disponible para toda la red nacional a finales de año.</p>
        `
    },
    {
        date: "2024-07-15",
        title: "InTrack anuncia su expansión a Portugal y Francia",
        description: "Ampliamos nuestra red para ofrecer soluciones de envío fiables y rápidas en los mercados vecinos.",
        fullContent: `
            <p class="mb-4"><strong>MADRID, 15 de julio de 2024</strong> – Como parte de su ambicioso plan de crecimiento europeo, InTrack ha anunciado hoy el inicio de sus operaciones en Portugal y Francia. Esta expansión estratégica permitirá a la compañía ofrecer su gama completa de servicios logísticos, incluyendo envíos urgentes y soluciones para e-commerce, en dos de los mercados más importantes de Europa Occidental.</p>
            <p class="mb-4">"Nuestra entrada en Portugal y Francia es un paso natural en nuestra misión de conectar negocios y personas sin fronteras", explicó el Director de Expansión Internacional. "Hemos establecido una sólida infraestructura local en ambos países para garantizar los mismos estándares de calidad y fiabilidad que nos caracterizan en España".</p>
            <p>Con esta medida, InTrack fortalece su posición como un actor clave en el panorama logístico europeo, facilitando el comercio transfronterizo para miles de empresas.</p>
        `
    },
    {
        date: "2024-06-01",
        title: "InTrack lanza su iniciativa de embalaje 100% sostenible",
        description: "Nos comprometemos a utilizar únicamente materiales reciclados y biodegradables en todos nuestros envíos.",
        fullContent: `
            <p class="mb-4"><strong>MADRID, 1 de junio de 2024</strong> – En un firme compromiso con el medio ambiente, InTrack ha lanzado hoy su nueva iniciativa "Green Pack", con el objetivo de utilizar embalajes 100% sostenibles en todas sus operaciones para finales de 2025. La compañía sustituirá progresivamente los plásticos de un solo uso por materiales reciclados, reciclables y biodegradables.</p>
            <p class="mb-4">Esta iniciativa incluye el uso de cajas de cartón con certificación FSC, cintas adhesivas de papel y rellenos protectores compostables. "La sostenibilidad no es una opción, es una responsabilidad", declaró la Directora de Sostenibilidad de InTrack. "Queremos liderar el cambio en la industria logística hacia un modelo más respetuoso con el planeta, y el embalaje es un pilar fundamental de esta transformación".</p>
            <p>InTrack también colaborará con sus clientes para fomentar la reutilización y el reciclaje de los materiales de embalaje, cerrando así el ciclo de la economía circular.</p>
        `
    }
]

export default function PrensaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Sala de Prensa
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Aquí encontrarás las últimas noticias, comunicados y recursos de medios sobre InTrack.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Columna Izquierda: Notas de Prensa */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <Newspaper className="h-8 w-8 text-primary" />
                  Últimos comunicados
                </h2>
                <div className="space-y-8">
                  {pressReleases.map((release, index) => (
                    <Dialog key={index}>
                      <Card className="overflow-hidden">
                        <CardHeader>
                          <CardDescription>
                            {new Date(release.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </CardDescription>
                          <CardTitle className="text-xl">
                            {release.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{release.description}</p>
                           <DialogTrigger asChild>
                             <Button variant="link" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 mt-4 p-0 h-auto">
                                Leer comunicado <ArrowRight className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                        </CardContent>
                      </Card>
                      <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{release.title}</DialogTitle>
                            <DialogDescription>
                              {new Date(release.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </DialogDescription>
                          </DialogHeader>
                          <div 
                            className="py-4 text-muted-foreground prose prose-sm dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: release.fullContent }}
                          />
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">Cerrar</Button>
                          </DialogClose>
                        </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Contacto y Kit de Medios */}
              <div className="lg:col-span-1 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Contacto de Prensa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Para consultas de medios, entrevistas o más información, por favor contacta con nuestro equipo.</p>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">prensa@intrack-logistics.es</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Kit de Medios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Descarga nuestro kit de medios para acceder a logotipos, imágenes en alta resolución y la historia de nuestra compañía.</p>
                    <Button className="w-full">
                      <Download className="mr-2 h-5 w-5" />
                      Descargar Kit de Medios (.zip)
                    </Button>
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
