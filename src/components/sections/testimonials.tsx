import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ana García',
    role: 'CEO, TechSolutions',
    quote: 'La eficiencia y fiabilidad de InTrack han sido clave para la logística de nuestro e-commerce. ¡El seguimiento en tiempo real es fantástico!',
    avatarId: 'avatar1',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Particular',
    quote: 'Envié un paquete urgente a otra ciudad y llegó al día siguiente tal como prometieron. Un servicio impecable y una atención al cliente excelente.',
    avatarId: 'avatar2',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Martínez',
    role: 'Manager de Logística',
    quote: 'Gestionamos todos nuestros envíos internacionales con ellos. Su plataforma es intuitiva y su red global nos da la tranquilidad que necesitamos.',
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
            La confianza y satisfacción de nuestros usuarios es nuestra mejor carta de presentación.
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
                    <blockquote className="mt-4 text-foreground/80">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Avatar>
                      {avatarImage && (
                        <AvatarImage 
                          src={avatarImage.imageUrl} 
                          alt={testimonial.name}
                          data-ai-hint={avatarImage.imageHint}
                        />
                      )}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
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
