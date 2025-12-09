
'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2, CheckCircle, Package, Truck, Warehouse } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ShipmentStatus = 'Processant' | 'En magatzem' | 'Preparat per a l\'enviament' | 'En trànsit' | 'Lliurat';

type ShipmentData = {
  tracking_code: string;
  origen: string;
  destination: string;
  eta: string;
  location: string;
  status: ShipmentStatus;
};

const timelineSteps: { status: ShipmentStatus; icon: React.ElementType; color: string; label: string }[] = [
  { status: 'Processant', icon: Warehouse, color: 'bg-yellow-500', label: 'Processant' },
  { status: 'Preparat per a l\'enviament', icon: Package, color: 'bg-orange-500', label: 'Preparat' },
  { status: 'En trànsit', icon: Truck, color: 'bg-blue-500', label: 'En trànsit' },
  { status: 'Lliurat', icon: CheckCircle, color: 'bg-green-500', label: 'Lliurat' },
];

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/r7rclmv3hog7m/search?tracking_code=${trackingCode}`);
      const data: ShipmentData[] = await response.json();

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('Codi no trobat. Si us plau, verifica el codi i torna a intentar-ho.');
      }
    } catch (err) {
      setError('Hi ha hagut un problema en connectar amb el servidor. Intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const currentStatusIndex = shipment ? timelineSteps.findIndex(step => step.status === shipment.status) : -1;


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Localitza el teu enviament
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Introdueix el teu codi de seguiment per veure l'estat actual del teu paquet.
              </p>
            </div>

            <Card className="max-w-xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Escriu el codi de seguiment"
                    className="flex-grow text-base"
                    aria-label="Codi de seguiment"
                  />
                  <Button type="submit" disabled={isLoading} className="sm:w-auto w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cercant...
                      </>
                    ) : 'Cercar'}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {error && (
              <Alert variant="destructive" className="max-w-xl mx-auto mt-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                      {error}
                  </AlertDescription>
              </Alert>
            )}

            {shipment && (
              <Card className="max-w-3xl mx-auto mt-12 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Resultats del teu enviament</CardTitle>
                  <p className="text-muted-foreground">Codi: <span className="font-mono text-primary">{shipment.tracking_code}</span></p>
                </CardHeader>
                <CardContent className="space-y-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                      <div>
                          <p className="font-medium text-muted-foreground">Origen</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.origen}</p>
                      </div>
                      <div>
                          <p className="font-medium text-muted-foreground">Destí</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.destination}</p>
                      </div>
                      <div>
                          <p className="font-medium text-muted-foreground">Data prevista (ETA)</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.eta}</p>
                      </div>
                      <div>
                          <p className="font-medium text-muted-foreground">Ubicació actual</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.location}</p>
                      </div>
                  </div>

                  <div>
                     <p className="font-medium text-muted-foreground mb-4">Estat de l'enviament</p>
                     <div className="flex items-center">
                        {timelineSteps.map((step, index) => {
                            const isActive = currentStatusIndex >= index;
                            const isCurrent = currentStatusIndex === index;
                            
                            return (
                                <React.Fragment key={step.status}>
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                                            isActive ? `border-transparent ${step.color}` : 'bg-muted border-muted-foreground/30',
                                            isCurrent ? 'scale-110' : ''
                                        )}>
                                            <step.icon className={cn("w-5 h-5", isActive ? 'text-white' : 'text-muted-foreground')} />
                                        </div>
                                        <p className={cn(
                                            "mt-2 text-xs font-semibold",
                                            isActive ? 'text-foreground' : 'text-muted-foreground'
                                        )}>{step.label}</p>
                                    </div>

                                    {index < timelineSteps.length - 1 && (
                                         <div className={cn(
                                            "flex-1 h-1 mx-2 transition-colors duration-300",
                                            currentStatusIndex > index ? step.color : 'bg-muted'
                                         )}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                     </div>
                  </div>

                </CardContent>
              </Card>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
