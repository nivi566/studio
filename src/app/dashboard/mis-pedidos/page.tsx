'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Clock, 
  Printer, 
  CheckCircle, 
  ArrowLeft, 
  Info, 
  ChevronRight, 
  Bookmark,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/logo'; // Asegúrate de que la ruta sea correcta
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz11VTa8UXoSJXlRk1e53aOCFxzjexp5DNUhpotDONP3tUISE6bT6bMiTzSRtFqikhn/exec";

  const fetchPedidos = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // Añadimos timestamp para evitar caché del navegador y ver cambios del Excel al instante
      const response = await fetch(`${SCRIPT_URL}?sheet=bookings&t=${Date.now()}`, { cache: 'no-store' });
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

  const handlePrint = () => {
    window.print();
  };

  const isAceptado = (estat: string) => {
    const s = String(estat || "").toLowerCase().trim();
    return s === 'aceptada' || s === 'aprovat' || s === 'aceptado' || s === 'aprobado' || s === 'entregado';
  };

  const openDocument = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setIsPreviewOpen(true);
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
            className="mb-8 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-[#f39200] p-0 h-auto transition-colors"
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
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ) : pedidos.length > 0 ? (
            <div className="grid gap-6">
              {pedidos.map((pedido) => {
                const aceptado = isAceptado(pedido.estat);
                return (
                  <Card key={pedido.id} className="border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-all duration-300 group">
                    <div className={cn("h-2 w-full transition-colors", aceptado ? "bg-green-500" : "bg-[#f39200]")} />
                    
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        
                        <div className="flex items-center gap-5 w-full md:w-auto">
                          <div className={cn("p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-110", aceptado ? "bg-green-50" : "bg-orange-50")}>
                            {pedido.id.startsWith('BK') ? (
                              <Bookmark className={cn("h-8 w-8", aceptado ? "text-green-600" : "text-[#f39200]")} />
                            ) : (
                              <Package className={cn("h-8 w-8", aceptado ? "text-green-600" : "text-[#f39200]")} />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Referencia</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{pedido.id}</h3>
                            <p className="text-sm font-bold text-slate-500 uppercase italic">{pedido.data}</p>
                          </div>
                        </div>

                        <div className="flex-1 w-full md:px-10">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Resumen del Servicio</p>
                          <p className="text-sm font-bold text-slate-700 italic line-clamp-2">
                            {pedido.detalls?.split('|')[0] || 'Servicio estándar'}
                          </p>
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
                            <Button 
                              size="sm" 
                              onClick={() => openDocument(pedido)} 
                              className="bg-slate-900 hover:bg-[#f39200] text-white font-black uppercase text-[10px] shadow-lg group/btn"
                            >
                              <FileText className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" /> 
                              Abrir Comprobante
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

      {/* DIALOG DE PREVISUALIZACIÓN ESTILO FACTURA PROFESIONAL */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-slate-100">
          <DialogHeader className="p-6 bg-white border-b sticky top-0 z-50 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                <FileText className="text-[#f39200]" /> Comprobante de Servicio
              </DialogTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePrint} className="bg-[#f39200] hover:bg-slate-900 text-white font-black uppercase text-xs shadow-md">
                <Printer className="h-4 w-4 mr-2" /> Imprimir Documento
              </Button>
            </div>
          </DialogHeader>

          {selectedPedido && (
            <div className="p-4 md:p-12 bg-slate-100 min-h-full">
              {/* EL TICKET - CONTENEDOR DE IMPRESIÓN */}
              <div id="print-receipt" className="bg-white mx-auto border-[1px] border-slate-200 p-8 md:p-16 shadow-2xl relative font-sans text-slate-900">
                
                {/* CABECERA INDUSTRIAL */}
                <div className="flex justify-between items-start mb-16 pb-8 border-b-4 border-slate-900">
                  <div>
                    <div className="mb-6 scale-150 origin-left">
                      <Logo /> 
                    </div>
                    <div className="text-[11px] uppercase tracking-tighter text-slate-500 font-bold space-y-0.5 leading-tight">
                      <p className="text-slate-900 font-black mb-1">InTrack Logistics S.L.</p>
                      <p>CIF: B-67890123</p>
                      <p>Carrer de la Resina, 41</p>
                      <p>28021, Madrid, España</p>
                      <p className="text-[#f39200]">www.intrack-logistics.cat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none mb-2">BOOKING</h2>
                    <div className="bg-slate-900 text-white px-6 py-1.5 inline-block uppercase text-[10px] font-black tracking-[0.2em] italic">
                      VALIDADO / CONFIRMADO
                    </div>
                  </div>
                </div>

                {/* BLOQUE DE DATOS CLIENTE Y REFERENCIA */}
                <div className="grid grid-cols-2 gap-20 mb-16">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest">Cliente Final</p>
                    <div>
                      <p className="text-3xl font-black uppercase italic leading-none text-slate-900 mb-2">{selectedPedido.empresa}</p>
                      <p className="text-sm font-bold text-slate-500">ID SISTEMA: <span className="font-mono">{selectedPedido.usuari}</span></p>
                    </div>
                  </div>
                  <div className="text-right space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest">Información del Registro</p>
                    <div className="space-y-1">
                      <p className="text-sm font-bold uppercase text-slate-500 tracking-tight">Referencia: <span className="text-slate-900 font-black">{selectedPedido.id}</span></p>
                      <p className="text-sm font-bold uppercase text-slate-500 tracking-tight">Fecha Emisión: <span className="text-slate-900 font-black">{selectedPedido.data}</span></p>
                    </div>
                  </div>
                </div>

                {/* TABLA DE DETALLES TIPO FACTURA */}
                <div className="mb-20">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-y-2 border-slate-900">
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-900">Descripción del Servicio Solicitado</th>
                        <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest text-slate-900">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                      <tr className="border-b border-slate-100 group">
                        <td className="py-10 px-2 align-top">
                          <p className="font-bold text-xl mb-3 text-slate-900 uppercase italic">
                            {selectedPedido.detalls?.split('|')[0]?.replace('SERVICIO:', '').trim() || 'Servicio de Logística'}
                          </p>
                          <div className="text-slate-500 leading-relaxed uppercase text-[11px] space-y-1 bg-slate-50 p-4 border-l-4 border-[#f39200]">
                            {selectedPedido.detalls?.split('|').slice(1).map((info, i) => (
                              <p key={i} className="flex items-center gap-2">
                                <span className="text-[#f39200] font-black">»</span> {info.trim()}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="py-10 px-2 text-right align-top">
                          <span className="font-black text-green-600 uppercase italic text-lg border-2 border-green-600 px-3 py-1">
                            OK ✓
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* PIE DE PÁGINA / SELLOS */}
                <div className="mt-32 border-t-2 border-slate-100 pt-10 flex justify-between items-end">
                  <div className="max-w-md space-y-4">
                    <div className="text-[9px] text-slate-400 leading-tight uppercase font-bold italic">
                      <p className="text-slate-900 font-black mb-1">Nota Legal:</p>
                      <p>Este documento es un comprobante de reserva generado por el portal de clientes InTrack. La validez de este comprobante queda supeditada a la verificación física de la mercancía. InTrack Logistics S.L. se reserva el derecho de ajustar tarifas si las medidas declaradas no coinciden con la realidad.</p>
                    </div>
                    <p className="text-[10px] font-black text-slate-900 italic uppercase">Sede Central: Madrid, España</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-tighter">Sello de Validación Digital</p>
                    <div className="relative inline-block px-8 py-4 border-[6px] border-green-600 text-green-600 font-black uppercase text-3xl rotate-[-4deg] opacity-80 select-none">
                      VALIDADO
                      <div className="text-[8px] absolute bottom-1 right-2 rotate-0">INTRACK-LOGISTICS</div>
                    </div>
                  </div>
                </div>

                {/* LÍNEA DE CORTE DE SEGURIDAD (SOLO VISUAL) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @media print {
          /* Ocultar todo */
          body * { 
            visibility: hidden !important; 
          }
          
          /* Solo el ticket y sus hijos son visibles */
          #print-receipt, #print-receipt * { 
            visibility: visible !important; 
          }
          
          #print-receipt { 
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            padding: 1.5cm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            display: block !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Ajustes de tipografía para impresión */
          .font-mono {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
          }

          @page { 
            margin: 0; 
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}