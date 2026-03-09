'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, Printer, CheckCircle, ArrowLeft, Info, ChevronRight, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz11VTa8UXoSJXlRk1e53aOCFxzjexp5DNUhpotDONP3tUISE6bT6bMiTzSRtFqikhn/exec";

  const fetchPedidos = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?sheet=bookings`, { cache: 'no-store' });
      const data = await response.json();
      
      const userEmail = String(user.usuari).toLowerCase().trim();
      const filtered = (Array.isArray(data) ? data : []).filter(
        (p: any) => String(p.usuari || "").toLowerCase().trim() === userEmail
      );
      
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

  // Gestión de impresión fiable
  useEffect(() => {
    if (selectedPedido) {
      const timer = setTimeout(() => {
        window.print();
      }, 300); // Pequeño delay para asegurar el renderizado

      const handleAfterPrint = () => setSelectedPedido(null);
      window.addEventListener('afterprint', handleAfterPrint);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    }
  }, [selectedPedido]);

  const isAceptado = (estat: string) => {
    const s = String(estat || "").toLowerCase().trim();
    return s === 'aceptada' || s === 'aprovat' || s === 'aceptado' || s === 'aprobado' || s === 'entregado';
  };

  if (authLoading || (!user && isLoading)) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-8 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-[#f39200] p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al panel
          </Button>

          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Mis Pedidos</h1>
            <p className="text-lg text-slate-500 font-medium italic mt-2">
              Historial de servicios y reservas de <span className="text-[#f39200] font-bold">{user?.empresa}</span>
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : pedidos.length > 0 ? (
            <div className="grid gap-6">
              {pedidos.map((pedido) => {
                const aceptado = isAceptado(pedido.estat);
                return (
                  <Card key={pedido.id} className="border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-all">
                    <div className={cn("h-2 w-full", aceptado ? "bg-green-500" : "bg-[#f39200]")} />
                    
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        
                        <div className="flex items-center gap-5 w-full md:w-auto">
                          <div className={cn("p-4 rounded-2xl shrink-0", aceptado ? "bg-green-50" : "bg-orange-50")}>
                            {pedido.id.startsWith('BK') ? (
                              <Bookmark className={cn("h-8 w-8", aceptado ? "text-green-600" : "text-[#f39200]")} />
                            ) : (
                              <Package className={cn("h-8 w-8", aceptado ? "text-green-600" : "text-[#f39200]")} />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Referencia</p>
                            <h3 className="text-2xl font-black text-slate-900">{pedido.id}</h3>
                            <p className="text-sm font-bold text-slate-500 uppercase italic">{pedido.data}</p>
                          </div>
                        </div>

                        <div className="flex-1 w-full md:px-10">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Detalles del Servicio</p>
                          <p className="text-sm font-bold text-slate-700 italic line-clamp-2">{pedido.detalls || 'Servicio estándar'}</p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                          <div className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full font-black uppercase text-[10px] border",
                            aceptado ? "bg-green-50 text-green-700 border-green-200" : "bg-orange-50 text-[#f39200] border-orange-200"
                          )}>
                            {aceptado ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3 animate-pulse" />}
                            {aceptado ? 'Confirmado' : 'Pendiente de Validación'}
                          </div>
                          
                          {aceptado && (
                            <Button size="sm" onClick={() => setSelectedPedido(pedido)} className="bg-slate-900 hover:bg-[#f39200] text-white font-black uppercase text-[10px] shadow-lg">
                              <Printer className="h-4 w-4 mr-2" /> Imprimir Comprobante
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-slate-100">
              <Info className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h2 className="text-xl font-black text-slate-400 uppercase italic">Aún no hay reservas registradas</h2>
              <Button onClick={() => router.push('/booking')} className="mt-8 bg-[#f39200] hover:bg-slate-900 text-white font-black uppercase text-xs px-8 py-6 h-auto rounded-xl shadow-lg shadow-orange-100">
                Hacer mi primera reserva <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* DISEÑO DEL TICKET DE IMPRESIÓN - Visible solo al imprimir */}
      {selectedPedido && (
        <div id="print-receipt" className="hidden print:block fixed inset-0 bg-white p-8 z-[9999]">
          <div className="max-w-3xl mx-auto border-[12px] border-slate-900 p-12 min-h-[600px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-6xl font-black italic uppercase leading-none text-slate-900 mb-2">INTRACK</h1>
                  <p className="text-2xl font-bold text-[#f39200] tracking-widest">LOGISTICS SERVICE</p>
                </div>
                <div className="text-right border-l-4 border-slate-900 pl-6">
                  <p className="text-sm font-black uppercase text-slate-400 mb-1">Referencia de Servicio</p>
                  <p className="text-4xl font-black text-slate-900">{selectedPedido.id}</p>
                </div>
              </div>
              
              <div className="space-y-10">
                <div className="border-t-2 border-slate-100 pt-8">
                  <p className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Cliente / Empresa Solicitante</p>
                  <p className="text-3xl font-bold uppercase italic text-slate-800">{selectedPedido.empresa}</p>
                  <p className="text-lg text-slate-500 font-medium">ID Usuario: {selectedPedido.usuari}</p>
                </div>
                
                <div className="border-t-2 border-slate-100 pt-8">
                  <p className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Especificaciones del Envío</p>
                  <p className="text-2xl font-medium italic leading-relaxed text-slate-700">{selectedPedido.detalls}</p>
                </div>

                <div className="grid grid-cols-2 gap-12 border-t-2 border-slate-100 pt-8">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Fecha de Registro</p>
                    <p className="text-xl font-black">{selectedPedido.data}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-black uppercase text-slate-400 mb-2">Validación</p>
                     <p className="text-xl font-black text-green-600 uppercase border-2 border-green-600 inline-block px-4 py-1 rotate-[-2deg]">CONFIRMADO</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t-4 border-slate-900 text-[11px] text-slate-500 leading-tight">
              <p className="font-bold mb-2">AVISO LEGAL:</p>
              <p className="italic">Este documento es un comprobante oficial de reserva emitido por InTrack Logistics S.L. La confirmación del servicio implica la aceptación de los términos y condiciones de transporte vigentes. Para cualquier incidencia, contacte con info@intrack-logistics.cat indicando su referencia {selectedPedido.id}.</p>
              <p className="mt-4 text-slate-900 font-black text-xs uppercase">Sede Central: Calle Resina, 41, 28021, Madrid, España.</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          /* Ocultar todo el contenido de la web */
          body * { visibility: hidden; }
          /* Mostrar solo el contenedor del ticket */
          #print-receipt, #print-receipt * { visibility: visible; }
          #print-receipt { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            display: block !important;
            background: white !important;
          }
          /* Quitar márgenes de página del navegador */
          @page { margin: 0; size: auto; }
        }
      `}</style>
    </div>
  );
}
