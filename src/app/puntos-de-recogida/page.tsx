import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MapPin } from 'lucide-react';

const pickupPoints = [
    { city: 'A Coruña', address: 'Rúa Real, 22, 15003 A Coruña' },
    { city: 'Albacete', address: 'Calle Ancha, 10, 02001 Albacete' },
    { city: 'Alicante', address: 'Avenida Maisonnave, 3, 03003 Alicante' },
    { city: 'Almería', address: 'Paseo de Almería, 50, 04001 Almería' },
    { city: 'Ávila', address: 'Plaza de Santa Teresa, 5, 05001 Ávila' },
    { city: 'Badajoz', address: 'Calle Menacho, 49, 06001 Badajoz' },
    { city: 'Barcelona', address: 'Passeig de Gràcia, 92, 08008 Barcelona' },
    { city: 'Bilbao', address: 'Gran Vía de Don Diego López de Haro, 38, 48009 Bilbao' },
    { city: 'Burgos', address: 'Plaza Mayor, 1, 09003 Burgos' },
    { city: 'Cáceres', address: 'Avenida de España, 1, 10002 Cáceres' },
    { city: 'Cádiz', address: 'Calle Ancha, 1, 11001 Cádiz' },
    { city: 'Castellón de la Plana', address: 'Carrer d\'Enmig, 33, 12001 Castelló de la Plana' },
    { city: 'Ciudad Real', address: 'Plaza Mayor, 1, 13001 Ciudad Real' },
    { city: 'Córdoba', address: 'Calle Cruz Conde, 2, 14003 Córdoba' },
    { city: 'Cuenca', address: 'Carretería, 20, 16002 Cuenca' },
    { city: 'Girona', address: 'Rambla de la Llibertat, 1, 17004 Girona' },
    { city: 'Granada', address: 'Calle Reyes Católicos, 2, 18009 Granada' },
    { city: 'Guadalajara', address: 'Calle Mayor, 1, 19001 Guadalajara' },
    { city: 'Huelva', address: 'Plaza de las Monjas, 1, 21001 Huelva' },
    { city: 'Huesca', address: 'Coso Bajo, 35, 22001 Huesca' },
    { city: 'Jaén', address: 'Calle Bernabé Soriano, 1, 23001 Jaén' },
    { city: 'León', address: 'Calle Ancha, 2, 24003 León' },
    { city: 'Lleida', address: 'Carrer Major, 3, 25007 Lleida' },
    { city: 'Logroño', address: 'Calle del Laurel, 1, 26001 Logroño' },
    { city: 'Lugo', address: 'Praza Maior, 1, 27001 Lugo' },
    { city: 'Madrid', address: 'Calle Gran Vía, 28, 28013 Madrid' },
    { city: 'Málaga', address: 'Calle Marqués de Larios, 5, 29015 Málaga' },
    { city: 'Murcia', address: 'Calle Trapería, 1, 30001 Murcia' },
    { city: 'Ourense', address: 'Rúa do Paseo, 10, 32003 Ourense' },
    { city: 'Oviedo', address: 'Calle Uría, 5, 33003 Oviedo' },
    { city: 'Palencia', address: 'Calle Mayor Principal, 1, 34001 Palencia' },
    { city: 'Palma', address: 'Passeig des Born, 1, 07012 Palma, Illes Balears' },
    { city: 'Pamplona', address: 'Plaza del Castillo, 1, 31001 Pamplona' },
    { city: 'Pontevedra', address: 'Rúa de Benito Corbal, 1, 36001 Pontevedra' },
    { city: 'Salamanca', address: 'Plaza Mayor, 1, 37002 Salamanca' },
    { city: 'San Sebastián', address: 'Alameda del Boulevard, 1, 20003 San Sebastián' },
    { city: 'Santander', address: 'Paseo de Pereda, 20, 39004 Santander' },
    { city: 'Segovia', address: 'Plaza Mayor, 1, 40001 Segovia' },
    { city: 'Sevilla', address: 'Avenida de la Constitución, 20, 41004 Sevilla' },
    { city: 'Soria', address: 'El Collado, 23, 42002 Soria' },
    { city: 'Tarragona', address: 'Rambla Nova, 45, 43003 Tarragona' },
    { city: 'Teruel', address: 'Plaza del Torico, 1, 44001 Teruel' },
    { city: 'Toledo', address: 'Calle del Comercio, 1, 45001 Toledo' },
    { city: 'Valencia', address: 'Carrer de Colón, 1, 46004 València' },
    { city: 'Valladolid', address: 'Calle de Santiago, 1, 47001 Valladolid' },
    { city: 'Vitoria-Gasteiz', address: 'Calle Dato, 10, 01005 Vitoria-Gasteiz' },
    { city: 'Zamora', address: 'Calle de Santa Clara, 20, 49015 Zamora' },
    { city: 'Zaragoza', address: 'Paseo de la Independencia, 21, 50001 Zaragoza' }
];

export default function PickupPointsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Nuestros Puntos de Recogida
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Encuentra tu punto InTrack más cercano. Recoge tus paquetes con comodidad en cualquiera de nuestras sedes en las capitales de provincia.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {pickupPoints.map((point) => (
                         <AccordionItem value={point.city} key={point.city}>
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">
                                {point.city}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-md">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <p className="text-muted-foreground">{point.address}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
