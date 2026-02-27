'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Printer, 
  Clock, 
  AlertCircle,
  FileText,
  Package
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/logo';

type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: string;
  detalls: string;
  servei?: string;
};

export default function BookingPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { language, t } = useLanguage();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<BookingRequest[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [printingBooking, setPrintingBooking] = useState<BookingRequest | null>(null);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=solicituds";

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const response = await fetch(SHEETDB_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        const userRequests = data.filter(
          (req: any) => req.usuari?.toLowerCase() === user.usuari.toLowerCase()
        );
        setHistory(userRequests.reverse()); // Más recientes primero
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchHistory();
    }
  }, [user, authLoading, router, fetchHistory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const service = formData.get('service') as string;
    const origin = formData.get('origin') as string;
    const dest = formData.get('destination') as string;
    const cargo = formData.get('cargo') as string;

    // Concatenación para la columna 'detalls' según requerimiento
    const fullDetails = `Servicio: ${service} | Origen: ${origin} | Destino: ${dest} | Carga: ${cargo}`;

    const newBooking = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      data: new Date().toLocaleDateString('es-ES'),
      usuari: user.usuari,
      estat: "Pendent",
      detalls: fullDetails
    };

    try {
      const response = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [newBooking] })
      });

      if (response.ok) {
        setSubmitted(true);
        fetchHistory();
        setTimeout(() => setSubmitted(false), 5000);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el envío.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = (booking: BookingRequest) => {
    setPrintingBooking(booking);
    setTimeout(() => {
      window.print();
      setPrintingBooking(null);
    }, 100);
  };

  if (authLoading || !user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      {/* VISTA DE IMPRESIÓN (OCULTA EN PANTALLA) */}
      {printingBooking && (
        <div className="fixed inset-0 z-[100] bg-white p-12 hidden print:block text-slate-900">
          <div className="max-w-4xl mx-auto border-4 border-slate-900 p-10">
            <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-8">
              <div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Confirmación de Servicio</h1>
                <p className="text-xl font-bold text-slate-500">ID Reserva: {printingBooking.id}</p>
                <p className="text-xl font-bold text-slate-500">Fecha: {printingBooking.data}</p>
              </div>
              <Logo className="scale-150 origin-top-right" />
            </div>
            
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Cliente</h2>
                <p className="text-2xl font-black uppercase">{user.nom}</p>
                <p className="text-lg font-bold text-slate-600">{user.empresa}</p>
              </div>
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Estado</h2>
                <p className="text-2xl font-black uppercase text-green-600 italic">Solicitud Aprobada</p>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border-2 border-slate-100 mb-12">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Detalles del Servicio</h2>
              <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap">{printingBooking.detalls}</p>
            </div>

            <div className="border-t-2 border-slate-100 pt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
              InTrack Logistics S.L. - Calle Resina, 41, 28021, Madrid - info@intrack-logistics.cat
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 py-10 print:hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-6 text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.nav.profile}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* COLUMNA IZQUIERDA: FORMULARIO */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-none shadow-2xl overflow-hidden bg-white">
                <div className="h-2 bg-primary" />
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    {t.booking.formTitle}
                  </CardTitle>
                  <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-[0.2em] mt-2">
                    {t.booking.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-10 animate-in fade-in zoom-in">
                      <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-black italic uppercase">¡Solicitud Enviada!</h3>
                      <p className="text-slate-500 text-sm font-medium mt-2">Hemos registrado tu petición correctamente.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          {t.booking.serviceLabel}
                        </Label>
                        <Select name="service" required>
                          <SelectTrigger className="h-12 border-2 border-slate-100 bg-slate-50 focus:ring-primary font-bold">
                            <SelectValue placeholder="Selecciona servicio..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Transporte Marítimo" className="font-bold">Transporte Marítimo</SelectItem>
                            <SelectItem value="Transporte Aéreo" className="font-bold">Transporte Aéreo</SelectItem>
                            <SelectItem value="Transporte Terrestre" className="font-bold">Transporte Terrestre</SelectItem>
                            <SelectItem value="Almacenaje" className="font-bold">Magatzem / Almacenaje</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.booking.originLabel}</Label>
                          <Input name="origin" required placeholder="Ciudad/Puerto" className="h-12 border-2 border-slate-100 bg-slate-50 font-bold" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.booking.destLabel}</Label>
                          <Input name="destination" required placeholder="Destino final" className="h-12 border-2 border-slate-100 bg-slate-50 font-bold" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          {t.booking.cargoLabel}
                        </Label>
                        <Textarea 
                          name="cargo" 
                          placeholder={t.booking.cargoPlaceholder}
                          required 
                          className="min-h-[100px] border-2 border-slate-100 bg-slate-50 font-bold resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-slate-900 text-white h-14 font-black uppercase italic tracking-widest transition-all shadow-xl active:scale-95"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            {t.booking.submit} <Send className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* COLUMNA DERECHA: HISTORIAL */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" /> {t.booking.historyTitle}
                </h2>
                <Badge className="bg-primary/10 text-primary border-none font-black px-3 py-1">
                  {history.length}
                </Badge>
              </div>

              {isLoadingHistory ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Cargando solicitudes...</p>
                </div>
              ) : history.length > 0 ? (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                  {history.map((item) => {
                    const isApproved = item.estat === 'Aprovat' || item.estat === 'Aprobado';
                    const isPending = item.estat === 'Pendent' || item.estat === 'Pendiente';
                    
                    return (
                      <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group bg-white border-l-4 border-l-transparent hover:border-l-primary overflow-hidden">
                        <CardHeader className="p-5 pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.data}</span>
                                <Badge className={cn(
                                  "text-[9px] font-black uppercase tracking-widest border-none px-2 py-0.5",
                                  isApproved ? "bg-green-100 text-green-700" : 
                                  isPending ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                                )}>
                                  {item.estat}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg font-black tracking-tight font-mono text-primary uppercase">
                                {item.id}
                              </CardTitle>
                            </div>
                            
                            {/* BOTÓN IMPRIMIR SI ESTÁ APROBADO */}
                            {isApproved && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handlePrint(item)}
                                className="border-2 border-slate-100 text-slate-400 hover:text-primary hover:border-primary font-black text-[10px] uppercase tracking-widest h-8"
                              >
                                <Printer className="h-3 w-3 mr-2" /> PDF
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-xs font-bold text-slate-600 line-clamp-2 italic leading-relaxed">
                              {item.detalls}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
                  <AlertCircle className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm font-bold text-slate-400 italic">{t.booking.noHistory}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
