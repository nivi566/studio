"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, DollarSign, Warehouse, Smartphone, Globe, ShieldCheck, Package, Ship, ShoppingCart, Plane } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Zap,
    title: 'Envíos Urgentes 24h',
    description: 'Entregas en tiempo récord para cuando no puedes esperar. Cobertura nacional garantizada.',
  },
  {
    icon: DollarSign,
    title: 'Envíos Económicos',
    description: 'La opción más rentable para tus envíos no urgentes, con la misma seguridad y fiabilidad.',
  },
  {
    icon: Smartphone,
    title: 'Seguimiento en Tiempo Real',
    description: 'Controla la ubicación de tu paquete en cada momento, desde la recogida hasta la entrega final.',
  },
  {
    icon: ShieldCheck,
    title: 'Entregas Garantizadas',
    description: 'Todos nuestros envíos incluyen un seguro básico y la garantía de entrega en perfectas condiciones.',
  },
];

const integralLogisticsService = {
  icon: Warehouse,
  title: 'Logística Integral',
  description: 'Soluciones completas de almacenaje, preparación de pedidos (picking) y distribución para tu e-commerce.',
};

const internationalTransportService = {
  icon: Globe,
  title: 'Transporte Internacional',
  description: 'Conectamos tu negocio con el mundo a través de nuestra extensa red de transporte multimodal.',
};


export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Una solución para cada necesidad
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ofrecemos una amplia gama de servicios diseñados para adaptarse a los requisitos de tu envío, ya seas particular o empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <integralLogisticsService.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{integralLogisticsService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{integralLogisticsService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Warehouse className="h-6 w-6 text-primary" />
                  Logística Integral para E-commerce
                </DialogTitle>
                <DialogDescription>
                  Una solución completa para que puedas centrarte en vender, mientras nosotros nos encargamos del resto.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>Nuestra solución de logística integral está diseñada para e-commerce y empresas que buscan externalizar sus operaciones de almacenaje, preparación y envío.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Almacenaje flexible:</span> Guarda tu stock en nuestros almacenes seguros y optimizados.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <ShoppingCart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Picking y Packing:</span> Preparamos tus pedidos con precisión y los empaquetamos profesionalmente para proteger tus productos.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Ship className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Distribución nacional e internacional:</span> Nos encargamos de la entrega final a tus clientes con nuestras tarifas competitivas.</div>
                  </li>
                </ul>
                <p>Integramos nuestra plataforma con tu tienda online para automatizar todo el proceso. ¡Ideal para escalar tu negocio sin preocuparte por la logística!</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">Cerrar</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
           <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <internationalTransportService.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{internationalTransportService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{internationalTransportService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  Transporte Internacional
                </DialogTitle>
                <DialogDescription>
                  Llevamos tus envíos a cualquier rincón del mundo con la máxima eficiencia y seguridad.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>Nuestra red global nos permite ofrecer soluciones de transporte internacional adaptadas a tus necesidades, combinando diferentes medios para optimizar tiempo y coste.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Plane className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Transporte Aéreo:</span> La opción más rápida para envíos urgentes a cualquier destino internacional.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Ship className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Transporte Marítimo:</span> Ideal para grandes volúmenes y cargas no urgentes, ofreciendo la solución más económica.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Gestión Aduanera:</span> Nos encargamos de todos los trámites y documentación necesarios para un despacho de aduanas sin complicaciones.</div>
                  </li>
                </ul>
                <p>Con nuestro seguimiento avanzado, siempre sabrás dónde está tu envío, desde la recogida hasta la entrega final en el país de destino.</p>
              </div>
               <DialogClose asChild>
                <Button type="button" variant="secondary">Cerrar</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
