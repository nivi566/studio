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
import { useLanguage } from '@/context/LanguageContext';

export default function TrackingPage() {
  const { t } = useLanguage();
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
        setError(t.tracking.error);
      }
    } catch (err) {
      setError(t.tracking.connError);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (status: string) => {
    const s = status?.toLowerCase() || '';
    
    if (s.includes('entregado') || s.includes('lliurat') || s.includes('delivered')) {
      return { width: '100%', color: 'bg-emerald-500', icon: <CheckCircle2 className="text-emerald-500 h-6 w-6" />, label: t.tracking.states.delivered };
    }
    if (s.includes('enviado') || s.includes('enviat') || s.includes('shipped') || s.includes('transito')) {
      return { width: '75%', color: 'bg-primary', icon: <Truck className="text-primary h-6 w-6" />, label: t.tracking.states.shipped };
    }
    if (s.includes('preparado') || s.includes('preparat') || s.includes('prepared')) {
      return { width: '40%', color: 'bg-primary/70', icon: <Package className="text-primary/70 h-6 w-6" />, label: t.tracking.states.prepared };
    }
    return { width: '15%', color: 'bg-slate-400', icon: <Clock className="text-slate-400 h-6 w-6" />, label: t.tracking.states.processing };
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-20 bg-primary/5 border-b border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Link href="/" className="inline-flex items-center text-sm font-black text-primary hover:underline mb-6 tracking-tighter uppercase">
                <ChevronLeft className="h-4 w-4 mr-1" /> {t.nav.home}
              </Link>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground mb-4">
                {t.tracking.title}
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                {t.tracking.subtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-2 shadow-2xl overflow-hidden">
                <div className="h-1.5 bg-primary w-full" />
                <CardContent className="pt-8 p-6">
                  <form onSubmit={handleSearch} className="flex flex-col sm:row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder={t.tracking.placeholder} 
                        className="pl-12 h-14 text-lg font-black tracking-tight border-2 focus-visible:ring-primary"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="lg" className="h-14 px-10 text-lg font-black tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
                      {loading ? t.tracking.searching : t.tracking.button}
                    </Button>
                  </form>
                  {error && (
                    <div className="mt-4 p-4 bg-destructive/5 border-2 border-destructive/20 rounded-xl text-destructive text-sm text-center font-bold animate-in fade-in slide-in-from-top-2">
                      ⚠️ {error}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {result && (
          <section className="py-16 container mx-auto px-4 animate-in fade-in zoom-in duration-500">
            <Card className="max-w-4xl mx-auto overflow-hidden border-2 shadow-2xl">
              <CardHeader className="bg-slate-50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-8 sm:p-10">
                <div>
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-1 block">{t.tracking.refLabel}</Label>
                  <CardTitle className="text-3xl font-black font-mono text-primary tracking-tighter">{result.tracking_code}</CardTitle>
                </div>
                <div className="sm:text-right bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-1 block">{t.tracking.statusLabel}</Label>
                  <div className="flex items-center gap-3 sm:justify-end">
                    {getProgress(result.status).icon}
                    <span className="text-2xl font-black tracking-tighter text-slate-900">{getProgress(result.status).label}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 sm:p-12">
                <div className="mb-20">
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-6 p-1 border shadow-inner">
                    <div 
                      className={`h-full ${getProgress(result.status).color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: getProgress(result.status).width }}
                    />
                  </div>
                  <div className="grid grid-cols-4 text-[9px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                    <span className={result.status ? 'text-primary' : ''}>{t.tracking.states.processing}</span>
                    <span className="text-center">{t.tracking.states.prepared}</span>
                    <span className="text-center">{t.tracking.states.shipped}</span>
                    <span className="text-right">{t.tracking.states.delivered}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                  <DetailBox label={t.tracking.origin} value={result.origen} icon={<MapPin className="h-6 w-6" />} />
                  <DetailBox label={t.tracking.destination} value={result.destination} icon={<ArrowRight className="h-6 w-6" />} />
                  <DetailBox label={t.tracking.location} value={result.location} icon={<Truck className="h-6 w-6" />} />
                  <DetailBox label={t.tracking.eta} value={result.eta} icon={<Calendar className="h-6 w-6" />} />
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
    <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border-2 border-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all group">
      <div className="bg-slate-50 p-3 rounded-xl shadow-sm border-2 border-white text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
        <p className="text-slate-900 font-black text-xl leading-tight tracking-tighter">{value || '---'}</p>
      </div>
    </div>
  );
}
