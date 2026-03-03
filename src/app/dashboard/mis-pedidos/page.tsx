'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Clock, Printer, CheckCircle, ArrowLeft, Info, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';

type Pedido = {
  id: string;
  data: string;
  usuari: string;
  empresa: string;
  detalls: string;
  estat: 'Pendiente' | 'Aceptada' | string;
};

export default function MisPedidosPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const router = useRouter();

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwn7kGe--3mFqaD6BjtK08diNQ-vcj3jtmW-HIO7Vs-RrfK4sFKWgIq5gIEacsd01xB/exec";

  const fetchPedidos = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      
      // Filtramos por el usuario logueado (insensible a mayúsculas)
      const userLower = String(user.usuari).toLowerCase();
      const filtered = (Array.isArray(data) ? data : []).filter(
        (p: Pedido) => String(p.usuari).toLowerCase() === userLower
      );
      
      setPedidos(filtered.reverse()); // Los más recientes primero
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
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          {/* BOTÓN VOLVER */}
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-8 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-primary p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al panel
          </Button>

          {/* CABECERA */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Mis Pedidos
            </h1>
            <p className="text-lg text-slate-500 font-medium italic mt-2">
              Historial de solicitudes de envío registradas por <span className="text-primary font-bold">{user?.empresa}</span>
            </p>
          </div>

          {/* LISTADO DE PEDIDOS */}
          {isLoading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
            </div>
          ) : pedidos.length > 0 ? (
            <div className="grid gap-6">
              {pedidos.map((pedido) => (
                <Card key={pedido.id} className="border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className={cn(
                    "h-1.5 w-full",
                    pedido.estat === 'Aceptada' ? "bg-green-500" : "bg-orange-500"
                  )} />
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      <div className="flex items-start gap-5">
                        <div className={cn(
                          "p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform",
                          pedido.estat === 'Aceptada' ? "bg-green-50" : "bg-orange-50"
                        )}>
                          <Package className={cn(
                            "h-8 w-8",
                            pedido.estat === 'Aceptada' ? "text-green-600" : "text-orange-600"
                          )} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Referencia</p>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{pedido.id}</h3>
                          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase italic">
                            <Clock className="h-3 w-3" /> {pedido.data}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 border-l border-slate-100 pl-6 hidden lg:block">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Detalles del destinatario</p>
                        <p className="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-line">
                          {pedido.detalls}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                        {/* BADGE DE ESTADO */}
                        {pedido.estat === 'Aceptada' ? (
                          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-green-200">
                            <CheckCircle className="h-3 w-3" /> Confirmado
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-orange-200">
                            <Clock className="h-3 w-3" /> Pendiente de Validación
                          </div>
                        )}

                        {/* BOTÓN IMPRIMIR (Solo si está aceptada) */}
                        {pedido.estat === 'Aceptada' && (
                          <Button 
                            onClick={() => handlePrint(pedido)}
                            className="bg-slate-900 hover:bg-primary text-white font-black uppercase text-[10px] tracking-widest h-11 px-6 shadow-lg shadow-slate-200 active:scale-95 transition-all"
                          >
                            <Printer className="mr-2 h-4 w-4" /> Imprimir Comprobante
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
              <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Info className="h-10 w-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter italic">No hay pedidos registrados</h2>
              <p className="text-slate-400 font-medium mt-2">Tus solicitudes de envío aparecerán aquí una vez que las registres.</p>
              <Button 
                onClick={() => router.push('/pedidos')}
                className="mt-8 bg-primary font-black uppercase text-xs tracking-widest px-8"
              >
                Hacer mi primer pedido
              </Button>
            </div>
          )}

        </div>
      </main>
      <Footer />

      {/* COMPROBANTE PARA IMPRESIÓN (OCULTO EN PANTALLA) */}
      {selectedPedido && (
        <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-12 text-slate-900">
          <div className="max-w-4xl mx-auto border-t-8 border-t-slate-900 pt-10">
            <div className="flex justify-between items-start border-b pb-8 mb-10">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">COMPROBANTE DE ENVÍO</h1>
                <p className="text-xl font-bold text-slate-500 uppercase">Referencia: {selectedPedido.id}</p>
                <p className="text-lg font-medium text-slate-400 mt-1">Fecha de registro: {selectedPedido.data}</p>
                <Badge className="mt-4 bg-green-100 text-green-700 border-green-200 font-black uppercase px-4 py-1 text-sm">
                  PEDIDO CONFIRMADO
                </Badge>
              </div>
              <Logo className="scale-150 origin-top-right" />
            </div>

            <div className="grid grid-cols-2 gap-16 mb-12">
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Remitente:</h2>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-900 uppercase italic">{selectedPedido.empresa}</p>
                  <p className="font-bold text-slate-600">Usuario: {selectedPedido.usuari}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Operador Logístico:</h2>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-900 uppercase italic">InTrack Logistics, S.L.</p>
                  <p className="font-bold text-slate-600">Sede Operativa: Madrid, España</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border mb-12">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Información del Envío
              </h2>
              <p className="text-xl font-bold text-slate-800 leading-relaxed italic whitespace-pre-line">
                {selectedPedido.detalls}
              </p>
            </div>

            <div className="pt-8 border-t">
              <p className="text-[10px] text-slate-400 leading-relaxed text-center uppercase font-bold italic tracking-wider">
                Este documento es una confirmación de registro de pedido en la red de Lockers de InTrack. <br />
                Presente este comprobante en nuestras instalaciones si le es requerido. <br />
                InTrack Logistics S.L. - Gestión Integral de Mercancías &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ESTILOS DE IMPRESIÓN */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print\:block, .print\:block * { visibility: visible; }
          .print\:block { position: absolute; left: 0; top: 0; width: 100%; }
          header, footer, button, nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
