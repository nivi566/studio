'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ShipmentData = {
  tracking_code: string;
  origen: string;
  destination: string;
  eta: string;
  location: string;
  status: string;
};

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
                <CardContent className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Origen</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.origen}</p>
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Destí</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.destination}</p>
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Data prevista (ETA)</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.eta}</p>
                      </div>
                      <div>
                          <p className="text-sm font-medium text-muted-foreground">Ubicació actual</p>
                          <p className="text-lg font-semibold text-foreground">{shipment.location}</p>
                      </div>
                       <div>
                          <p className="text-sm font-medium text-muted-foreground">Estat</p>
                          <p className="text-lg font-bold text-primary">{shipment.status}</p>
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
