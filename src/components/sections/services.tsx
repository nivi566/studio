import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, DollarSign, Warehouse, Smartphone, Globe, ShieldCheck } from 'lucide-react';

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
    icon: Warehouse,
    title: 'Logística Integral',
    description: 'Soluciones completas de almacenaje, preparación de pedidos (picking) y distribución para tu e-commerce.',
  },
  {
    icon: Smartphone,
    title: 'Seguimiento en Tiempo Real',
    description: 'Controla la ubicación de tu paquete en cada momento, desde la recogida hasta la entrega final.',
  },
  {
    icon: Globe,
    title: 'Transporte Internacional',
    description: 'Conectamos tu negocio con el mundo a través de nuestra extensa red de transporte multimodal.',
  },
  {
    icon: ShieldCheck,
    title: 'Entregas Garantizadas',
    description: 'Todos nuestros envíos incluyen un seguro básico y la garantía de entrega en perfectas condiciones.',
  },
];

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
        </div>
      </div>
    </section>
  );
}
