"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, DollarSign, Smartphone, Globe, ShieldCheck, ShoppingCart, Rocket, ArrowRight, Bell, Lock, CreditCard, Clock, MapPin, Package, Ship, Plane, PiggyBank } from 'lucide-react';
import Link from 'next/link';
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

const urgentShipmentsService = {
  icon: Zap,
  title: 'Envíos Urgentes 24h',
  description: 'Entregas en tiempo récord para cuando no puedes esperar. Cobertura nacional garantizada.',
};

const guaranteedDeliveriesService = {
  icon: ShieldCheck,
  title: 'Recepción de paquetería nacional',
  description: 'Tu paquete está protegido en nuestras taquillas de alta seguridad hasta que tú lo retires.',
};

const realTimeTrackingService = {
  icon: Smartphone,
  title: 'Seguimiento en Tiempo Real',
  description: 'Controla la ubicación de tu paquete en cada momento, desde la recogida hasta la entrega final.',
};

const pricingService = {
  icon: DollarSign,
  title: 'Tarifas',
  description: 'Consulta nuestros precios competitivos para envíos nacionales, urgentes e internacionales.',
};

const internationalShoppingService = {
  icon: ShoppingCart,
  title: 'Compras Internacionales',
  description: 'Compra en cualquier tienda del mundo y recibe tus paquetes de forma segura en nuestra red de lockers.',
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
            La red de lockers inteligentes que se adapta a tu ritmo de vida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <urgentShipmentsService.icon className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{urgentShipmentsService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{urgentShipmentsService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-[#0B3C5D]" />
                  Envíos Urgentes 24h
                </DialogTitle>
                <DialogDescription>
                  La solución más rápida para tus envíos más importantes.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>Cuando el tiempo apremia, nuestro servicio de Envíos Urgentes 24h es tu mejor aliado. Garantizamos la entrega de tu paquete en cualquier punto de la península en un plazo máximo de 24 horas laborables.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Máxima Prioridad:</span> Tu envío es tratado con la máxima urgencia en todos nuestros procesos logísticos.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Entrega al Día Siguiente:</span> Recogemos tu paquete y lo entregamos a lo largo del siguiente día laborable.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Seguimiento Detallado:</span> Incluye nuestro seguimiento en tiempo real para que no pierdas de vista tu envío ni un segundo.</div>
                  </li>
                </ul>
                <p>Perfecto para documentos importantes, regalos de última hora o cualquier situación que requiera velocidad y fiabilidad.</p>
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
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <guaranteedDeliveriesService.icon className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{guaranteedDeliveriesService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{guaranteedDeliveriesService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-[#0B3C5D]" />
                  Recepción de paquetería nacional
                </DialogTitle>
                <DialogDescription>
                  Tu tranquilidad es nuestra prioridad. Por eso, tu paquete está protegido desde que llega a nuestras manos hasta que tú lo retiras.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">Custodia Blindada:</span> Una vez recibido en nuestro punto, tu paquete se almacena en taquillas de alta seguridad con vigilancia, evitando robos o daños en el portal de tu casa.
                    </div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">Notificación Instantánea:</span> Garantizamos el aviso inmediato vía App/SMS en cuanto tu pedido es depositado. Sabrás en tiempo real que tu compra ya está a salvo con nosotros.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">Garantía de Disponibilidad 24/7:</span> Nos comprometemos a que el punto de recogida elegido esté operativo y accesible para ti en el momento que decidas, sin errores de acceso.
                    </div>
                  </li>
                </ul>
                <p className="pt-2 font-bold">Compra con la confianza de que tus pedidos nacionales están en las mejores manos, protegidos de imprevistos y esperas innecesarias.</p>
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
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <realTimeTrackingService.icon className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{realTimeTrackingService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{realTimeTrackingService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-[#0B3C5D]" />
                  Seguimiento en Tiempo Real
                </DialogTitle>
                <DialogDescription>
                  Ten el control total sobre tu envío con nuestra tecnología de seguimiento avanzada.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>Nuestra plataforma de seguimiento te ofrece tranquilidad al permitirte ver la ubicación exacta de tu paquete en cada etapa del viaje, desde cualquier dispositivo.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Visualización en Mapa:</span> Observa el progreso de tu envío en un mapa interactivo y en tiempo real.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Actualizaciones de Estado:</span> Recibe notificaciones automáticas en cada punto clave: recogida, en tránsito, en reparto y entregado.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Estimación de Entrega:</span> Accede a una ventana de tiempo de entrega estimada que se actualiza dinámicamente según las condiciones del tráfico y la ruta.</div>
                  </li>
                </ul>
                <p>El seguimiento en tiempo real está incluido en todos nuestros servicios sin coste adicional.</p>
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
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <pricingService.icon className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{pricingService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pricingService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-[#0B3C5D]" />
                  Nuestras Tarifas
                </DialogTitle>
                <DialogDescription>
                  Planes de precios claros y competitivos para cada tipo de envío.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>Ofrecemos una estructura de precios transparente para que siempre sepas cuánto te costará tu envío. Sin sorpresas ni costes ocultos.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <PiggyBank className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Precios competitivos:</span> Tarifas ajustadas para envíos nacionales, urgentes e internacionales.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Calculadora online:</span> Usa nuestra herramienta para obtener un presupuesto al instante para tu envío.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Sin costes ocultos:</span> El precio que ves es el precio que pagas. Incluimos seguimiento y seguro básico.</div>
                  </li>
                </ul>
                <p>Consulta nuestra página de tarifas para ver todos los detalles y encontrar el plan que mejor se adapta a ti.</p>
              </div>
                <div className="flex gap-2">
                   <DialogClose asChild>
                    <Button type="button" variant="secondary" className="w-full">Cerrar</Button>
                  </DialogClose>
                  <Button asChild className="w-full">
                    <Link href="/tarifas" className="flex items-center gap-2">
                        Ver Tarifas <ArrowRight />
                    </Link>
                  </Button>
                </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
               <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader className="items-center">
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <internationalShoppingService.icon className="h-8 w-8 text-[#0B3C5D]" />
                  </div>
                  <CardTitle className="mt-4">{internationalShoppingService.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{internationalShoppingService.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-[#0B3C5D]" />
                  Compras Internacionales
                </DialogTitle>
                <DialogDescription>
                  Compra en tus tiendas favoritas de EE.UU., China o Europa y recíbelo aquí.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 text-sm text-muted-foreground">
                <p>¿Quieres comprar en una tienda que no envía a tu país? Con nuestro servicio de Compras Internacionales, te proporcionamos una dirección de entrega en los principales hubs logísticos del mundo.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Dirección Global:</span> Compra como si vivieras allí y nosotros nos encargamos de traerlo a tu locker local.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Consolidación de Paquetes:</span> Agrupamos varias compras en un solo envío para que ahorres en gastos de transporte.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Gestión de Aduanas:</span> Olvídate de papeleos complicados. Tramitamos los impuestos y aranceles por ti.</div>
                  </li>
                </ul>
                <p className="font-bold">Expande tus posibilidades de compra sin fronteras y con la seguridad de InTrack.</p>
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
                  <div className="bg-[#0B3C5D]/10 p-3 rounded-full">
                    <internationalTransportService.icon className="h-8 w-8 text-[#0B3C5D]" />
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
                  <Globe className="h-6 w-6 text-[#0B3C5D]" />
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
                    <Plane className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Transporte Aéreo:</span> La opción más rápida para envíos urgentes a cualquier destino internacional.</div>
                  </li>
                   <li className="flex items-start gap-3">
                    <Ship className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div><span className="font-semibold text-foreground">Transporte Marítimo:</span> Ideal para grandes volúmenes y cargas no urgentes, ofreciendo la solución más económica.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
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
