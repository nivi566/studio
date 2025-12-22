
'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const allPickupPoints = [
  {
    community: 'Andalucía',
    points: [
      { city: 'Almería', address: 'Paseo de Almería, 50, 04001 Almería' },
      { city: 'Cádiz', address: 'Calle Ancha, 1, 11001 Cádiz' },
      { city: 'Córdoba', address: 'Calle Cruz Conde, 2, 14003 Córdoba' },
      { city: 'Granada', address: 'Calle Reyes Católicos, 2, 18009 Granada' },
      { city: 'Huelva', address: 'Plaza de las Monjas, 1, 21001 Huelva' },
      { city: 'Jaén', address: 'Calle Bernabé Soriano, 1, 23001 Jaén' },
      { city: 'Málaga', address: 'Calle Marqués de Larios, 5, 29015 Málaga' },
      { city: 'Sevilla', address: 'Avenida de la Constitución, 20, 41004 Sevilla' },
    ]
  },
  {
    community: 'Aragón',
    points: [
      { city: 'Huesca', address: 'Coso Bajo, 35, 22001 Huesca' },
      { city: 'Teruel', address: 'Plaza del Torico, 1, 44001 Teruel' },
      { city: 'Zaragoza', address: 'Paseo de la Independencia, 21, 50001 Zaragoza' }
    ]
  },
  {
    community: 'Principado de Asturias',
    points: [
      { city: 'Oviedo', address: 'Calle Uría, 5, 33003 Oviedo' },
    ]
  },
  {
    community: 'Illes Balears',
    points: [
       { city: 'Palma', address: 'Passeig des Born, 1, 07012 Palma, Illes Balears' },
    ]
  },
  {
    community: 'Canarias',
    points: [
    ]
  },
  {
    community: 'Cantabria',
    points: [
      { city: 'Santander', address: 'Paseo de Pereda, 20, 39004 Santander' },
    ]
  },
  {
    community: 'Castilla-La Mancha',
    points: [
      { city: 'Albacete', address: 'Calle Ancha, 10, 02001 Albacete' },
      { city: 'Ciudad Real', address: 'Plaza Mayor, 1, 13001 Ciudad Real' },
      { city: 'Cuenca', address: 'Carretería, 20, 16002 Cuenca' },
      { city: 'Guadalajara', address: 'Calle Mayor, 1, 19001 Guadalajara' },
      { city: 'Toledo', address: 'Calle del Comercio, 1, 45001 Toledo' },
    ]
  },
    {
    community: 'Castilla y León',
    points: [
      { city: 'Ávila', address: 'Plaza de Santa Teresa, 5, 05001 Ávila' },
      { city: 'Burgos', address: 'Plaza Mayor, 1, 09003 Burgos' },
      { city: 'León', address: 'Calle Ancha, 2, 24003 León' },
      { city: 'Palencia', address: 'Calle Mayor Principal, 1, 34001 Palencia' },
      { city: 'Salamanca', address: 'Plaza Mayor, 1, 37002 Salamanca' },
      { city: 'Segovia', address: 'Plaza Mayor, 1, 40001 Segovia' },
      { city: 'Soria', address: 'El Collado, 23, 42002 Soria' },
      { city: 'Valladolid', address: 'Calle de Santiago, 1, 47001 Valladolid' },
      { city: 'Zamora', address: 'Calle de Santa Clara, 20, 49015 Zamora' },
    ]
  },
  {
    community: 'Cataluña',
    points: [
      { city: 'Barcelona', address: 'Passeig de Gràcia, 92, 08008 Barcelona' },
      { city: 'Girona', address: 'Rambla de la Llibertat, 1, 17004 Girona' },
      { city: 'Lleida', address: 'Carrer Major, 3, 25007 Lleida' },
      { city: 'Tarragona', address: 'Rambla Nova, 45, 43003 Tarragona' },
    ]
  },
  {
    community: 'Comunidad Valenciana',
    points: [
      { city: 'Alicante', address: 'Avenida Maisonnave, 3, 03003 Alicante' },
      { city: 'Castellón de la Plana', address: 'Carrer d\'Enmig, 33, 12001 Castelló de la Plana' },
      { city: 'Valencia', address: 'Carrer de Colón, 1, 46004 València' },
    ]
  },
  {
    community: 'Extremadura',
    points: [
      { city: 'Badajoz', address: 'Calle Menacho, 49, 06001 Badajoz' },
      { city: 'Cáceres', address: 'Avenida de España, 1, 10002 Cáceres' },
    ]
  },
  {
    community: 'Galicia',
    points: [
      { city: 'A Coruña', address: 'Rúa Real, 22, 15003 A Coruña' },
      { city: 'Lugo', address: 'Praza Maior, 1, 27001 Lugo' },
      { city: 'Ourense', address: 'Rúa do Paseo, 10, 32003 Ourense' },
      { city: 'Pontevedra', address: 'Rúa de Benito Corbal, 1, 36001 Pontevedra' },
    ]
  },
  {
    community: 'Comunidad de Madrid',
    points: [
       { city: 'Madrid', address: 'Calle Gran Vía, 28, 28013 Madrid' },
    ]
  },
  {
    community: 'Región de Murcia',
    points: [
       { city: 'Murcia', address: 'Calle Trapería, 1, 30001 Murcia' },
    ]
  },
  {
    community: 'Comunidad Foral de Navarra',
    points: [
       { city: 'Pamplona', address: 'Plaza del Castillo, 1, 31001 Pamplona' },
    ]
  },
  {
    community: 'País Vasco',
    points: [
      { city: 'Bilbao', address: 'Gran Vía de Don Diego López de Haro, 38, 48009 Bilbao' },
      { city: 'San Sebastián', address: 'Alameda del Boulevard, 1, 20003 San Sebastián' },
      { city: 'Vitoria-Gasteiz', address: 'Calle Dato, 10, 01005 Vitoria-Gasteiz' },
    ]
  },
  {
    community: 'La Rioja',
    points: [
      { city: 'Logroño', address: 'Calle del Laurel, 1, 26001 Logroño' },
    ]
  }
];

export default function PickupPointsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoints, setFilteredPoints] = useState(allPickupPoints);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredPoints(allPickupPoints);
      return;
    }

    setIsLoading(true);
    setError(null);

    // This is a local-only search for demonstration purposes.
    // In a real application, this would be an API call.
    setTimeout(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const results = allPickupPoints.map(communityGroup => {
            const filtered = communityGroup.points.filter(point => 
                point.city.toLowerCase().includes(lowerCaseQuery) || 
                communityGroup.community.toLowerCase().includes(lowerCaseQuery)
            );
            return { ...communityGroup, points: filtered };
        }).filter(communityGroup => communityGroup.points.length > 0);

        setFilteredPoints(results);
        if (results.length === 0) {
            setError("No s'han trobat resultats per a la teva cerca.");
        }
        setIsLoading(false);
    }, 500);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredPoints(allPickupPoints);
    setError(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Nuestros Puntos de Recogida
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Encuentra tu punto InTrack más cercano. Utiliza nuestro buscador para filtrar por ciudad o comunidad autónoma.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-16">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej: 'Andalucía' o 'Cáceres'"
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span className="sr-only">Buscar</span>
                </Button>
                {searchQuery && 
                    <Button variant="outline" onClick={clearSearch} disabled={isLoading}>Limpiar</Button>
                }
              </form>
               {error && !isLoading && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              {isLoading ? (
                 <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
              ) : filteredPoints.length > 0 ? (
                filteredPoints.filter(c => c.points.length > 0).map((communityGroup) => (
                  <div key={communityGroup.community}>
                    <h2 className="text-3xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2">{communityGroup.community}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communityGroup.points.map((point) => (
                            <Card key={point.city} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        {point.city}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{point.address}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                !error && <div className="text-center py-10">
                  <p className="text-muted-foreground">No s'han trobat resultats per a la teva cerca.</p>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    