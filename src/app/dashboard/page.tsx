'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRight, 
  Bookmark, 
  FileText, 
  ExternalLink,
  LogOut,
  Clock,
  FolderOpen,
  ChevronRight,
  MapPin,
  Phone,
  CreditCard,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { language } = useLanguage(); 
  const router = useRouter();
  
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz11VTa8UXoSJXlRk1e53aOCFxzjexp5DNUhpotDONP3tUISE6bT6bMiTzSRtFqikhn/exec";
  const SHEETDB_DOCS_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=documents";

  const text = useMemo(() => ({
    es: { title: "Panel de cliente", welcome: "Bienvenido", stats: "registros", empty: "Sin actividad reciente", booking: "Gestionar Booking", new: "Nueva solicitud", recent: "Actividad reciente", sub: "Seguimiento de pedidos y reservas de", docs: "Mis documentos", myOrders: "Mis pedidos", noDocs: "No hay facturas disponibles", logout: "Cerrar sesión", view: "Ver" },
    ca: { title: "Panel de client", welcome: "Benvingut", stats: "registres", empty: "Sense activitat recent", booking: "Gestionar Booking", new: "Nova sol·licitud", recent: "Activitat recent", sub: "Seguiment de comandes i reserves de", docs: "Els meus documents", myOrders: "Les meves comandes", noDocs: "No hi ha factures disponibles", logout: "Tancar sessió", view: "Veure" },
    en: { title: "Customer panel", welcome: "Welcome", stats: "records", empty: "No recent activity", booking: "Manage Booking", new: "New request", recent: "Recent activity", sub: "Tracking of orders and bookings for", docs: "My documents", myOrders: "My orders", noDocs: "No invoices available", logout: "Logout", view: "View" },
    fr: { title: "Espace client", welcome: "Bienvenue", stats: "enregistrements", empty: "Aucune activité récente", booking: "Gérer le Booking", new: "Nouvelle demande", recent: "Activité récente", sub: "Suivi des commandes et réservations de", docs: "Mes documents", myOrders: "Mes commandes", noDocs: "Aucune facture disponible", logout: "Déconnexion", view: "Voir" }
  }[language as 'es'|'ca'|'en'|'fr'] || { title: "Panel de cliente", welcome: "Bienvenido", stats: "registros", empty: "Sin actividad", booking: "Gestionar Booking", new: "Nueva solicitud", recent: "Actividad reciente", sub: "Seguimiento", docs: "Documentos", myOrders: "Mis pedidos", noDocs: "Sin facturas", logout: "Cerrar sesión", view: "Ver" }), [language]);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const [resTracking, resBooking, resDocs] = await Promise.all([
        fetch(`${SCRIPT_URL}?sheet=tracking`).then(r => r.json()),
        fetch(`${SCRIPT_URL}?sheet=bookings`).then(r => r.json()),
        fetch(SHEETDB_DOCS_URL).then(r => r.json())
      ]);

      const userEmailLower = String(user.usuari).toLowerCase().trim();
      const userEmpresaLower = String(user.empresa).toLowerCase().trim();

      const filteredTracking = (Array.isArray(resTracking) ? resTracking : [])
        .filter((t: any) => String(t.empresa || "").trim().toLowerCase() === userEmpresaLower)
        .map(t => ({
          tracking_code: t.id || t.tracking_code,
          eta: t.data_entrega || t.eta || t.data,
          status: t.estat || t.status,
          isBooking: false
        }));

      const filteredBookings = (Array.isArray(resBooking) ? resBooking : [])
        .filter((b: any) => String(b.usuari || "").trim().toLowerCase() === userEmailLower)
        .map((b: any) => ({
          tracking_code: b.id,
          eta: b.data,
          status: b.estat || "Pendiente",
          isBooking: true
        }));

      const uniqueDocsMap = new Map();
      (Array.isArray(resDocs) ? resDocs : [])
        .filter((d: any) => String(d.usuari || "").trim().toLowerCase() === userEmailLower)
        .forEach((d: any) => {
          const id = d.num_factura || d.albara;
          if (id && !uniqueDocsMap.has(id)) {
            uniqueDocsMap.set(id, {
              id: id,
              nom: d.num_factura ? `Factura ${id}` : `Albarán ${id}`,
              tipus: d.num_factura ? 'Factura' : 'Albarán',
              data: d.data
            });
          }
        });

      setPedidos([...filteredTracking, ...filteredBookings].reverse());
      setDocumentos(Array.from(uniqueDocsMap.values()));

    } catch (error) {
      console.error("Error cargando Dashboard:", error);
    } finally {
      setIsFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, router, fetchDashboardData]);

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const formatName = (name: string = '') => {
    if (!name) return '';
    return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  if (authLoading || (!user && isFetching)) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8"><Skeleton className="h-64 w-full rounded-lg" /></main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          <div className="mb-10 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-[#f39200]" />
              <span className="text-xs font-bold text-[#f39200] uppercase tracking-widest">{text.title}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight not-italic">
              {text.welcome}, <span className="text-[#f39200]">{formatName(user.nom)}</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="h-2 bg-[#f39200]" />
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar className="h-14 w-14 border-2 border-orange-100">
                    <AvatarFallback className="bg-orange-50 text-[#f39200] font-bold">
                      {getInitials(user.nom)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold not-italic">{formatName(user.nom)}</CardTitle>
                    <CardDescription className="font-medium text-[#f39200] uppercase">{user.empresa}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <Separator className="bg-slate-100" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">ID de usuario:</span>
                      <span className="font-bold text-slate-700">{user.usuari}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Rol:</span>
                      <Badge variant="outline" className="border-orange-200 text-[#f39200] bg-orange-50 uppercase text-[10px] font-black">{user.rol}</Badge>
                    </div>

                    <Separator className="bg-slate-50" />

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-[#f39200] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Dirección</p>
                          <p className="font-bold text-slate-700 leading-tight">{user.adreca || 'No especificada'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-[#f39200] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Teléfono</p>
                          <p className="font-bold text-slate-700">{user.telefon || 'No especificado'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="h-4 w-4 text-[#f39200] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">NIF / CIF</p>
                          <p className="font-bold text-slate-700">{user.fiscalid || '---'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-slate-900 text-white overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white text-lg font-black">
                    <Bookmark className="h-5 w-5 text-[#f39200]" /> {text.booking}
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">{text.sub} <span className="text-white font-bold italic uppercase">{user.empresa}</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => router.push('/booking')}
                    className="w-full bg-[#f39200] hover:bg-white hover:text-black text-white font-black transition-all uppercase tracking-widest py-6"
                  >
                    {text.new} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white overflow-hidden border-l-4 border-l-[#f39200]">
                <CardContent className="p-4">
                  <Button 
                    onClick={() => router.push('/dashboard/mis-pedidos')}
                    variant="ghost"
                    className="w-full h-auto flex items-center justify-between p-4 bg-slate-50 hover:bg-orange-50 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:bg-[#f39200] transition-colors">
                        <FolderOpen className="h-6 w-6 text-[#f39200] group-hover:text-white" />
                      </div>
                      <div className="text-left">
                        <span className="block text-sm font-black text-slate-900 uppercase italic tracking-tighter">{text.myOrders}</span>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Historial Completo</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#f39200] group-hover:translate-x-1 transition-all" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-black italic uppercase flex items-center justify-between text-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#f39200]" /> {text.docs}
                    </div>
                    <Badge variant="secondary" className="text-[9px] bg-slate-100 text-slate-500 border-none font-black">{documentos.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isFetching ? (
                    <div className="space-y-2">
                      <Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" />
                    </div>
                  ) : documentos.length > 0 ? (
                    documentos.slice(0, 3).map((doc: any, i: number) => (
                      <button 
                        key={i} 
                        onClick={() => router.push(`/documents?id=${doc.id}`)}
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/50 hover:bg-orange-50 transition-all group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-slate-400 group-hover:text-[#f39200]" />
                          <div>
                            <p className="text-[11px] font-black text-slate-800 uppercase">{doc.nom}</p>
                            <p className="text-[9px] text-slate-400 uppercase font-bold">{doc.data}</p>
                          </div>
                        </div>
                        <ExternalLink className="h-3 w-3 text-[#f39200] opacity-0 group-hover:opacity-100" />
                      </button>
                    ))
                  ) : (
                    <p className="text-center py-4 text-[10px] text-slate-400 italic font-bold uppercase">{text.noDocs}</p>
                  )}
                </CardContent>
              </Card>

              <Button 
                onClick={logout} 
                variant="ghost" 
                className="w-full text-slate-400 hover:text-red-600 hover:bg-red-50 font-bold text-xs uppercase tracking-widest"
              >
                <LogOut className="mr-2 h-4 w-4" /> {text.logout}
              </Button>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-none shadow-md bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 pb-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-2xl font-black text-slate-900 not-italic">
                      <Clock className="h-6 w-6 text-[#f39200]" /> {text.recent}
                    </CardTitle>
                    <Badge className="bg-orange-100 text-[#f39200] border-none font-black px-3 py-1 text-[10px]">
                      {pedidos.length} {text.stats}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {isFetching ? (
                    <div className="space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
                  ) : (
                    <div className="rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                      <Table>
                        <TableHeader className="bg-slate-50/80">
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="font-black text-slate-500 uppercase text-[9px] tracking-widest px-4">Ref / ID</TableHead>
                            <TableHead className="font-black text-slate-500 uppercase text-[9px] tracking-widest">Fecha</TableHead>
                            <TableHead className="font-black text-slate-500 uppercase text-[9px] tracking-widest">Estado</TableHead>
                            <TableHead className="text-right font-black text-slate-500 uppercase text-[9px] tracking-widest px-4">Acción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.length > 0 ? pedidos.map((item: any, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                              <TableCell className="font-mono font-bold text-[#f39200] px-4 py-4 flex items-center gap-2">
                                {item.isBooking ? (
                                  <div className="bg-orange-50 p-1.5 rounded text-orange-600"><Bookmark className="h-3 w-3" /></div>
                                ) : (
                                  <div className="bg-slate-50 p-1.5 rounded text-slate-400"><Package className="h-3 w-3" /></div>
                                )}
                                {item.tracking_code}
                              </TableCell>
                              <TableCell className="text-slate-600 font-bold text-[11px] uppercase">{item.eta}</TableCell>
                              <TableCell>
                                <Badge className={cn(
                                  "font-black px-2 py-0.5 border-none uppercase text-[8px] tracking-tighter",
                                  item.status === 'Aceptada' || item.status === 'Aprovat' || item.status === 'Entregado' ? 'bg-green-100 text-green-700' : 
                                  item.status === 'Pendiente' || item.status === 'Pendent' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                )}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right px-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-slate-400 hover:text-[#f39200] font-black text-[9px] uppercase tracking-tighter"
                                  onClick={() => router.push(item.isBooking ? '/dashboard/mis-pedidos' : `/documents?id=${item.tracking_code}`)}
                                >
                                  {item.isBooking ? 'VER TICKET' : 'DETALLES'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          )) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-16 text-slate-300 font-bold uppercase text-xs italic tracking-tighter">{text.empty}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
