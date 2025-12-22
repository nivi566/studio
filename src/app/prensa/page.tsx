
'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pressReleases } from '@/lib/press-releases';

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
                  {pressReleases.map((release) => (
                    <Card key={release.slug} className="overflow-hidden">
                      <CardHeader>
                        <CardDescription>
                          {new Date(release.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </CardDescription>
                        <CardTitle className="text-xl">
                           <Link href={`/prensa/${release.slug}`} className="hover:text-primary transition-colors">
                            {release.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{release.description}</p>
                        <Link href={`/prensa/${release.slug}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 mt-4">
                          Leer comunicado <ArrowRight className="w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>
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
