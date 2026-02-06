import { FileText, ListChecks, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Regístrate',
    description: 'Contacta con nosotros y selecciona el punto de recogida Intrack que mejor te venga.',
  },
  {
    icon: ListChecks,
    title: 'Compra online',
    description: 'Selecciona la opción de envío que mejor se adapte a tu necesidad y presupuesto.',
  },
  {
    icon: Truck,
    title: 'Prepara para la recogida',
    description: 'Un mensajero recogerá el paquete en la dirección que nos indiques.',
  },
  {
    icon: CheckCircle2,
    title: 'Entrega en destino',
    description: 'Tu paquete llega a su destino de forma rápida y segura.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Recoger tus compras nunca fue tan fácil
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            En solo cuatro sencillos pasos, tu envío estará en camino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 z-0" />
              )}
              <div className="relative z-10">
                <div className="flex items-center justify-center h-24 w-24 rounded-full bg-background border-4 border-[#0B3C5D] shadow-lg">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#0B3C5D] text-white">
                    <span className="text-sm font-bold uppercase tracking-wider">Paso {index + 1}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <step.icon className="h-10 w-10 text-[#0B3C5D] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
