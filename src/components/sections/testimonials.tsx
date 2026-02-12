"use client";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-5 w-5",
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const { title, subtitle, items } = t.testimonials;

  const styleMap = [
    { fallbackClass: 'bg-orange-500 text-white' },
    { fallbackClass: 'bg-blue-600 text-white' },
    { fallbackClass: 'bg-emerald-500 text-white' }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((testimonial, index) => {
            const styles = styleMap[index % styleMap.length];
            return (
              <Card key={index} className="flex flex-col border-none shadow-md">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <StarRating rating={5} />
                    <blockquote className="mt-4 text-foreground/80 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarFallback className={cn("font-bold text-lg", styles.fallbackClass)}>
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
