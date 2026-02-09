'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Package, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronLeft 
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${SHEETDB_URL}/search?sheet=tracking&tracking_code=${trackingCode.toUpperCase()}`);
      if (!response.ok) throw new Error('Error en la red');
      const data = await response.json();

      if (data && data.length > 0) {
        setResult(data[0]);
      } else {
        setError('Código no encontrado. Por favor, verifica tu referencia (Ej: TRK-001).');
      }
    } catch (err) {
      setError('Error en la conexión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (status: string) => {
    const s = status?.toLowerCase() || '';
    
    // ENTREGADO -> VERDE
    if (s.includes('entregado') || s.includes('lliurat')) {
      return { width: '100%', color: 'bg-green-500', icon: <CheckCircle2 className="text-green-500 h-6 w-6" /> };
    }
    // ENVIADO -> AZUL
    if (s.includes('enviado') || s.includes('enviat')) {
      return { width: '75%', color: 'bg-blue-500', icon: <Truck className="text-blue-500 h-6 w-6" /> };
    }
    // PREPARADO -> ROJO
    if (s.includes('preparado') || s.includes('preparat')) {
      return { width: '40%', color: 'bg-red-500', icon: <Package className="text-red-500 h-6 w-6" /> };
    }
    // PROCESANDO -> GRIS
    return { width: '15%', color: 'bg-gray-400', icon: <Clock className="text-gray-400 h-6 w-6" /> };
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" /> Volver al inicio
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                Localiza tu envío
              </h1>
              <p className="text-lg text-muted-foreground">
                Introduce tu código de seguimiento para conocer el estado de tu paquete en tiempo real.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-2 shadow-xl">
                <CardContent className="pt-8">
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Ej: TRK-001" 
                        className="pl-10 h-12 text-lg"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="lg" className="h-12 px-8 text-lg font-semibold" disabled={loading}>
                      {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                  </form>
                  {error && (
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">
                      ⚠️ {error}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="py-12 container mx-auto px-4 animate-in fade-in zoom-in duration-500">
            <Card className="max-w-4xl mx-auto overflow-hidden border-2 shadow-lg">
              <CardHeader className="bg-muted/50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-8">
                <div>
                  <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Referencia de envío</Label>
                  <CardTitle className="text-2xl font-mono text-primary">{result.tracking_code}</CardTitle>
                </div>
                <div className="sm:text-right">
                  <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Estado del paquete</Label>
                  <div className="flex items-center gap-2 sm:justify-end">
                    {getProgress(result.status).icon}
                    <span className="text-xl font-bold">{result.status}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 sm:p-12">
                {/* Visual Progress Bar */}
                <div className="mb-16">
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full ${getProgress(result.status).color} transition-all duration-1000 ease-in-out`}
                      style={{ width: getProgress(result.status).width }}
                    />
                  </div>
                  <div className="grid grid-cols-4 text-[9px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span className="text-left">Procesando</span>
                    <span className="text-center">Preparado</span>
                    <span className="text-center">Enviado</span>
                    <span className="text-right">Entregado</span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DetailBox label="Origen" value={result.origen} icon={<MapPin className="h-5 w-5" />} />
                  <DetailBox label="Destino Final" value={result.destination} icon={<ArrowRight className="h-5 w-5" />} />
                  <DetailBox label="Ubicación Actual" value={result.location} icon={<Truck className="h-5 w-5" />} />
                  <DetailBox label="Fecha Entrega (ETA)" value={result.eta} icon={<Calendar className="h-5 w-5" />} />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function DetailBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/20 border border-transparent hover:border-border hover:bg-muted/30 transition-all">
      <div className="bg-background p-2.5 rounded-lg shadow-sm border text-primary">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
        <p className="text-foreground font-bold text-lg leading-tight">{value || 'En proceso...'}</p>
      </div>
    </div>
  );
}