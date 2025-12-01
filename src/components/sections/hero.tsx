'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-truck');
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('services');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      <div className="relative container mx-auto px-4 z-10 flex flex-col items-center">
        <div className="space-y-6 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Envíos rápidos, seguros y al mejor precio
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto drop-shadow-md">
            Soluciones de paquetería nacional e internacional para empresas y particulares.
          </p>
           <div className="flex justify-center gap-4">
             <Button asChild size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              <Link href="#">
                Registrarse ahora <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
                <Link href="#services" onClick={handleScroll}>
                    Ver servicios
                </Link>
            </Button>
           </div>
        </div>
      </div>
    </section>
  );
}
