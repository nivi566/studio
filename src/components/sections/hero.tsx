import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-truck');

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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origen</Label>
                  <Input id="origin" placeholder="Código postal o ciudad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" placeholder="Código postal o ciudad" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input id="weight" type="number" placeholder="Ej: 5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                    <Input id="dimensions" placeholder="Ej: 30x20x10" />
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
