'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, MapPin, Package, Clock, Ship, Plane, Truck, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: 'Pendent' | 'Aprovat' | 'Rebutjat';
  detalls: string;
};

const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=solicituds";

export default function BookingPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const b = t.booking;

  const [history, setHistory] = useState<BookingRequest[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Form states
  const [service, setService] = useState('');
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
      fetchHistory();
    }
  }, [user, authLoading, router]);

  const fetchHistory = async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const response = await fetch(SHEETDB_URL);
      const data: BookingRequest[] = await response.json();
      // Filtrar por el usuario actual (case insensitive)
      const userHistory = data.filter(item => 
        item.usuari && item.usuari.toLowerCase() === user.usuari.toLowerCase()
      );
      setHistory(userHistory.sort((a, b) => b.id.localeCompare(a.id)));
    } catch (error) {
      console.error("Error fetching booking history:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !service || !origin || !dest) return;

    setIsSubmitting(true);

    const randomId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('es-ES');
    
    // Concatenación robusta
    const concatenatedDetails = `Servei: ${service} | Origen: ${origin} | Destí: ${dest} | Càrrega: ${cargo}`;

    const newRequest = {
      id: randomId,
      data: today,
      usuari: user.usuari,
      estat: 'Pendent',
      detalls: concatenatedDetails
    };

    try {
      const response = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [newRequest] })
      });

      if (response.ok) {
        // Reset form
        setService('');
        setOrigin('');
        setDest('');
        setCargo('');
        // Refresh list
        fetchHistory();
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovat': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rebutjat': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (authLoading || (!user && !isFetching)) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* CABECERA */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                {b.title}
              </h1>
              <p className="mt-2 text-lg text-slate-500 font-medium">
                {b.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* FORMULARIO (Lg: 5 cols) */}
              <div className="lg:col-span-5">
                <Card className="border-none shadow-2xl overflow-hidden bg-white sticky top-24">
                  <div className="h-2 bg-primary w-full" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase">{b.formTitle}</CardTitle>
                    <CardDescription className="font-medium">Completa la información logística.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{b.serviceLabel}</Label>
                        <Select onValueChange={setService} value={service} required>
                          <SelectTrigger className="h-12 font-bold border-2">
                            <SelectValue placeholder="Selecciona..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marítim" className="font-bold">Transport Marítim</SelectItem>
                            <SelectItem value="Aeri" className="font-bold">Transport Aeri</SelectItem>
                            <SelectItem value="Terrestre" className="font-bold">Transport Terrestre</SelectItem>
                            <SelectItem value="Magatzem" className="font-bold">Magatzem / Almacén</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{b.originLabel}</Label>
                          <Input 
                            value={origin} 
                            onChange={(e) => setOrigin(e.target.value)} 
                            required 
                            className="h-12 font-bold border-2" 
                            placeholder="BCN, Madrid..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{b.destLabel}</Label>
                          <Input 
                            value={dest} 
                            onChange={(e) => setDest(e.target.value)} 
                            required 
                            className="h-12 font-bold border-2" 
                            placeholder="NYC, Paris..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{b.cargoLabel}</Label>
                        <Textarea 
                          value={cargo} 
                          onChange={(e) => setCargo(e.target.value)} 
                          required 
                          className="min-h-[100px] font-bold border-2" 
                          placeholder={b.cargoPlaceholder}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full h-14 text-lg font-black uppercase tracking-widest bg-primary hover:bg-primary/90 transition-all active:scale-95 shadow-xl"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : b.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* HISTÓRICO (Lg: 7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-black tracking-tighter uppercase text-slate-800">{b.historyTitle}</h2>
                </div>

                {isFetching ? (
                  <div className="space-y-4">
                    <div className="h-32 bg-white rounded-xl border-2 animate-pulse" />
                    <div className="h-32 bg-white rounded-xl border-2 animate-pulse" />
                  </div>
                ) : history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <Card key={item.id} className="border-none shadow-md bg-white hover:shadow-lg transition-all group overflow-hidden border-l-4 border-l-primary/20">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-3">
                                <span className="font-mono font-black text-primary text-xl">{item.id}</span>
                                <Badge variant="outline" className={cn("font-bold px-3 uppercase tracking-widest text-[10px]", getStatusColor(item.estat))}>
                                  {item.estat === 'Pendent' ? b.pending : item.estat === 'Aprovat' ? b.approved : b.rejected}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                <Calendar className="h-3 w-3" />
                                {item.data}
                              </div>
                              <p className="mt-4 text-slate-700 text-sm font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                {item.detalls}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed border-2 bg-transparent text-center py-20">
                    <CardContent>
                      <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold italic">{b.noHistory}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
