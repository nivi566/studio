import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ana García',
    role: 'Cliente Particular',
    quote: 'Por fin he dejado de perseguir repartidores por todo el barrio. Con el locker de InTrack recojo mis compras de Amazon al salir del gimnasio, incluso si es medianoche. Es la libertad que necesitaba para mi día a día.',
    avatarId: '', // Se deja vacío para que use la inicial
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Comprador Internacional',
    quote: 'Compro mucho en tiendas de EE. UU. y Asia, y siempre tenía problemas con la entrega final en mi domicilio. Ahora uso mi dirección de InTrack y sé que mi paquete internacional me espera seguro en una taquilla blindada. Cero estrés.',
    avatarId: '', // Se deja vacío para que use la inicial
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Martínez',
    role: 'E-commerce Manager',
    quote: 'Integrar el widget de InTrack en nuestra tienda online ha reducido las entregas fallidas a cero. Nuestros clientes valoran muchísimo poder elegir un punto de recogida 24/7. Ha sido un salto de calidad para nuestra logística.',
    avatarId: 'avatar3',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La confianza y satisfacción de nuestros usuarios basada en nuestras soluciones más innovadoras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const avatarImage = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
            return (
              <Card key={testimonial.id} className="flex flex-col">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-4 text-foreground/80 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Avatar>
                      {testimonial.avatarId && avatarImage && (
                        <AvatarImage 
                          src={avatarImage.imageUrl} 
                          alt={testimonial.name}
                          data-ai-hint={avatarImage.imageHint}
                        />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
