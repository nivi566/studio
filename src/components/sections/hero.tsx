'use client';

import Image from 'next/image';
import { ShippingCalculator } from '@/components/shipping-calculator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');
  
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center bg-background">
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
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative container mx-auto px-4 z-10 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 text-center md:text-left text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Envíos rápidos, seguros y al mejor precio
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto md:mx-0 drop-shadow-md">
            Tu paquete, a tu ritmo.
          </p>
        </div>
        <div className="w-full">
            <ShippingCalculator />
        </div>
      </div>
    </section>
  );
}
