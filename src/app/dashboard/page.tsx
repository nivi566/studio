'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext'; // IMPORTANTE: Añadido
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
import { LayoutDashboard, Package, ArrowRight, Bookmark } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const { language } = useLanguage(); // Detectamos el idioma actual
  const router = useRouter();
  
  const [pedidos, setPedidos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  // Diccionario de textos para el Dashboard (ES, CA, EN)
  const text = {
    es: { title: "Panel de Cliente", welcome: "Bienvenido", stats: "Registros", empty: "Sin actividad reciente", booking: "Gestionar Booking", new: "NUEVA SOLICITUD", recent: "ACTIVIDAD RECIENTE", sub: "Seguimiento de pedidos y reservas de" },
    ca: { title: "Panel de Client", welcome: "Benvingut", stats: "Registres", empty: "Sense activitat recent", booking: "Gestionar Booking", new: "NOVA SOL·LICITUD", recent: "ACTIVITAT RECENT", sub: "Seguiment de comandes i reserves de" },
    en: { title: "Customer Panel", welcome: "Welcome", stats: "Records", empty: "No recent activity", booking: "Manage Booking", new: "NEW REQUEST", recent: "RECENT ACTIVITY", sub: "Tracking of orders and bookings for" }
  }[language as 'es'|'ca'|'en'] || { title: "Panel", welcome: "Bienvenido", stats: "Registros", empty: "Sin actividad", booking: "Booking", new: "NUEVA SOLICITUD", recent: "ACTIVIDAD", sub: "Seguimiento" };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
    if (user) {
      fetchDashboardData();
    }
  }, [user, isLoading, router]);

  const fetchDashboardData = async () => {
    setIsFetching(true);
    try {
      const resTracking = await fetch(`${SHEETDB_URL}/search?sheet=tracking&client=${encodeURIComponent(user.empresa)}`);
      const dataTracking = await resTracking.json();

      const resBooking = await fetch(`${SHEETDB_URL}?sheet=solicituds`);
      const dataBooking = await resBooking.json();
      
      const filteredBookings = (Array.isArray(dataBooking) ? dataBooking : [])
        .filter((b: any) => b.usuari && b.usuari.toLowerCase() === user.usuari.toLowerCase())
        .map((b: any) => ({
          tracking_code: b.id,
          eta: b.data,
          status: b.estat,
          isBooking: true
        }));

      setPedidos([...(Array.isArray(dataTracking) ? dataTracking : []), ...filteredBookings]);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Función de navegación corregida para evitar que la página se recargue
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8"><Skeleton className="h-64 w-full rounded-lg" /></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-[#f39200]" />
              <span className="text-xs font-bold text-[#f39200] uppercase tracking-widest">{text.title}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
              {text.welcome}, <span className="text-[#f39200]">{user.nom}</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="h-2 bg-[#f39200]" />
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-orange-100">
                    <AvatarFallback className="bg-orange-50 text-[#f39200] font-bold">
                      {getInitials(user.nom)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold">{user.nom}</CardTitle>
                    <CardDescription className="font-medium text-[#f39200]">{user.empresa}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <Separator className="bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">ID Usuario:</span>
                    <span className="font-bold text-slate-700">{user.usuari}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Rol:</span>
                    <Badge variant="outline" className="border-orange-200 text-[#f39200] bg-orange-50 uppercase text-[10px]">{user.rol}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* ACCESO RÁPIDO A BOOKING - CORREGIDO */}
              <Card className="border-none shadow-md bg-slate-900 text-white overflow-hidden group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white italic uppercase text-lg">
                    <Bookmark className="h-5 w-5 text-[#f39200]" /> {text.booking}
                  </CardTitle>
                  <CardDescription className="text-slate-400">{text.sub} {user.empresa}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleNavigation('/booking')}
                    className="w-full bg-[#f39200] hover:bg-[#d88200] text-white font-bold transition-all uppercase tracking-widest py-6"
                  >
                    {text.new} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardContent className="pt-6">
                  <Button onClick={logout} className="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none font-bold" variant="outline">
                    Cerrar sesión
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="border-b border-slate-50 pb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-black italic uppercase">
                        <Package className="h-6 w-6 text-[#f39200]" /> {text.recent}
                      </CardTitle>
                    </div>
                    <Badge className="bg-orange-100 text-[#f39200] border-none font-bold px-3">
                      {pedidos.length} {text.stats}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {isFetching ? (
                    <div className="space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
                  ) : (
                    <div className="rounded-md border border-slate-100 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className="font-bold text-slate-700 uppercase text-[10px]">Ref / Tracking</TableHead>
                            <TableHead className="font-bold text-slate-700 uppercase text-[10px]">Date</TableHead>
                            <TableHead className="font-bold text-slate-700 uppercase text-[10px]">Status</TableHead>
                            <TableHead className="text-right font-bold text-slate-700 uppercase text-[10px]">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.length > 0 ? pedidos.map((item: any, index) => (
                            <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                              <TableCell className="font-mono font-bold text-[#f39200] flex items-center gap-2">
                                {item.isBooking ? <Bookmark className="h-3 w-3 text-slate-400" /> : <Package className="h-3 w-3 text-slate-400" />}
                                {item.tracking_code}
                              </TableCell>
                              <TableCell className="text-slate-600 font-medium text-xs">{item.eta || item.data}</TableCell>
                              <TableCell>
                                <Badge className={cn(
                                  "font-bold px-2 py-0.5 border-none uppercase text-[9px]",
                                  item.status === 'Entregado' || item.status === 'Aprovat' ? 'bg-green-100 text-green-700' : 
                                  item.status === 'En transito' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                )}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-slate-400 hover:text-[#f39200] font-bold text-[10px]"
                                  onClick={() => handleNavigation(item.isBooking ? '/booking' : `/documents?id=${item.tracking_code}`)}
                                >
                                  {item.isBooking ? 'VIEW' : 'DOC'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          )) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">{text.empty}</TableCell>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}