'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Clock, Printer, CheckCircle, ArrowLeft, Info, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';

type Pedido = {
  id: string;
  data: string;
  usuari: string;
  empresa: string;
  detalls: string;
  estat: string;
};

export default function MisPedidosPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const router = useRouter();

  // URL de tu Apps Script. IMPORTANTE: Debe ser la misma que usas en el formulario de Booking
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwn7kGe--3mFqaD6BjtK08diNQ-vcj3jtmW-HIO7Vs-RrfK4sFKWgIq5gIEacsd01xB/exec";

  const fetchPedidos = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // Forzamos el parámetro ?sheet=solicituds para leer la hoja donde se guardan los bookings
      const response = await fetch(`${SCRIPT_URL}?sheet=solicituds`);
      const data = await response.json();
      
      console.log("Datos recibidos del Excel:", data); // Para depuración

      const userEmail = String(user.usuari).toLowerCase().trim();
      
      // Filtramos: El campo 'usuari' del Excel debe coincidir con el email del usuario logueado
      const filtered = (Array.isArray(data) ? data : []).filter(
        (p: any) => String(p.usuari || "").toLowerCase().trim() === userEmail
      );
      
      console.log("Pedidos filtrados para este usuario:", filtered);
      setPedidos(filtered.reverse()); 
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchPedidos();
    }
  }, [user, authLoading, router, fetchPedidos]);

  const handlePrint = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (authLoading || (!user && isLoading)) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12"><Skeleton className="h-64 w-full rounded-2xl" /></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-8 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-[#f39200] p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al panel
          </Button>

          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Mis Pedidos</h1>
            <p className="text-lg text-slate-500 font-medium italic mt-2">
              Historial de <span className="text-[#f39200] font-bold">{user?.empresa}</span>
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : pedidos.length > 0 ? (
            <div className="grid gap-6">
              {pedidos.map((pedido) => (
                <Card key={pedido.id} className="border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-all group">
                  <div className={cn("h-1.5 w-full", pedido.estat === 'Aceptada' || pedido.estat === 'Aprovat' ? "bg-green-500" : "bg-[#f39200]")} />
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex items-start gap-5">
                        <div className="p-4 rounded-2xl bg-orange-50 shrink-0">
                          <Package className="h-8 w-8 text-[#f39200]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400">ID Pedido</p>
                          <h3 className="text-2xl font-black text-slate-900">{pedido.id}</h3>
                          <p className="text-sm font-bold text-slate-500 uppercase italic">{pedido.data}</p>
                        </div>
                      </div>
                      <div className="flex-1 lg:max-w-md">
                         <p className="text-[10px] font-black uppercase text-slate-400">Instrucciones / Detalles</p>
                         <p className="text-sm font-bold text-slate-700">{pedido.detalls || 'Sin detalles adicionales'}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={cn("font-black uppercase text-[10px] px-4 py-2 rounded-full", 
                          pedido.estat === 'Aceptada' || pedido.estat === 'Aprovat' ? "bg-green-100 text-green-700" : "bg-orange-100 text-[#f39200]"
                        )}>
                          {pedido.estat || 'Pendiente'}
                        </Badge>
                        {(pedido.estat === 'Aceptada' || pedido.estat === 'Aprovat') && (
                          <Button size="sm" onClick={() => handlePrint(pedido)} className="bg-slate-900 text-white font-black uppercase text-[10px]">
                            <Printer className="h-4 w-4 mr-2" /> Ticket
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-slate-100">
              <Info className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h2 className="text-xl font-black text-slate-400 uppercase italic">Aún no hay registros</h2>
              <p className="text-slate-400 mt-2">Tus reservas aparecerán aquí tras completarlas en la sección Booking.</p>
              <Button 
                onClick={() => router.push('/booking')}
                className="mt-8 bg-[#f39200] hover:bg-slate-900 text-white font-black uppercase text-xs tracking-widest px-8 py-6 h-auto rounded-xl transition-all"
              >
                Hacer mi primer pedido <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* SECCIÓN DE IMPRESIÓN */}
      {selectedPedido && (
        <div className="hidden print:block fixed inset-0 bg-white p-10">
          <div className="border-4 border-slate-900 p-8">
            <h1 className="text-4xl font-black uppercase italic mb-4">Comprobante InTrack</h1>
            <p className="text-2xl font-bold">REFERENCIA: {selectedPedido.id}</p>
            <div className="my-6 border-y py-4">
               <p className="font-bold uppercase tracking-widest text-slate-400 text-xs">Detalles:</p>
               <p className="text-xl italic font-bold">{selectedPedido.detalls}</p>
            </div>
            <p className="text-sm font-bold">Cliente: {selectedPedido.empresa}</p>
            <p className="text-sm text-slate-500">Fecha: {selectedPedido.data}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print\:block, .print\:block * { visibility: visible; }
          .print\:block { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}