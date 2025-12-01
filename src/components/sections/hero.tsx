'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-truck');
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Store data in sessionStorage to pass to the other component
    sessionStorage.setItem('heroFormData', JSON.stringify({
      origin,
      destination,
      packageWeight: weight,
      packageDimensions: dimensions
    }));

    // Navigate to the optimizer section
    const optimizerElement = document.getElementById('ai-optimizer');
    if (optimizerElement) {
        optimizerElement.scrollIntoView({ behavior: 'smooth' });
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
      
      <div className="relative container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Envíos rápidos, seguros y al mejor precio
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
            Soluciones de paquetería nacional e internacional para empresas y particulares.
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-foreground">
                Calcula tu envío al instante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="origin-hero">Origen</Label>
                  <Input id="origin-hero" placeholder="Código postal o ciudad" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination-hero">Destino</Label>
                  <Input id="destination-hero" placeholder="Código postal o ciudad" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight-hero">Peso (kg)</Label>
                    <Input id="weight-hero" type="number" placeholder="Ej: 5" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions-hero">Dimensiones (cm)</Label>
                    <Input id="dimensions-hero" placeholder="Ej: 30x20x10" value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                  Calcular envío
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
