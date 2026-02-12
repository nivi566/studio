'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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
import { FileEdit, KeyRound, FileText, Package, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  const [pedidos, setPedidos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
    if (user) {
      fetchRealOrders();
    }
  }, [user, isLoading, router]);

  const fetchRealOrders = async () => {
    try {
      const response = await fetch(`${SHEETDB_URL}/search?sheet=tracking&client=${encodeURIComponent(user.empresa)}`);
      const data = await response.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleVerFactura = async (trackingCode: string) => {
    try {
      const response = await fetch(`${SHEETDB_URL}/search?sheet=documents&tracking_code=${trackingCode}`);
      const data = await response.json();

      if (data.length > 0) {
        // Buscamos num_factura o albara
        const docId = data[0].num_factura || data[0].albara;
        router.push(`/documents?id=${docId}`);
      } else {
        alert("No se ha encontrado documento vinculado.");
      }
    } catch (error) {
      console.error("Error al buscar documento:", error);
    }
  };

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full rounded-lg" />
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
          
          {/* TÍTULO CORPORATIVO */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-[#f39200]" />
              <span className="text-xs font-bold text-[#f39200] uppercase tracking-widest">Panel de Cliente</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Bienvenido, <span className="text-[#f39200]">{user.nom}</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: PERFIL */}
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
                    <Badge variant="outline" className="border-orange-200 text-[#f39200] bg-orange-50">
                      {user.rol}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* ACCESO DIRECTO A FACTURACIÓN (NUEVA SECCIÓN) */}
              <Card className="border-none shadow-md bg-slate-900 text-white overflow-hidden group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="h-5 w-5 text-[#f39200]" /> Facturación
                  </CardTitle>
                  <CardDescription className="text-slate-400">Consulta tus facturas y albaranes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => router.push('/documents')}
                    className="w-full bg-[#f39200] hover:bg-[#d88200] text-white font-bold transition-all"
                  >
                    Ver historial completo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardHeader><CardTitle className="text-lg">Configuración</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start text-slate-600 hover:text-[#f39200] hover:bg-orange-50 transition-colors" variant="ghost">
                    <FileEdit className="mr-3 h-4 w-4" /> Editar perfil
                  </Button>
                  <Button className="w-full justify-start text-slate-600 hover:text-[#f39200] hover:bg-orange-50 transition-colors" variant="ghost">
                    <KeyRound className="mr-3 h-4 w-4" /> Seguridad
                  </Button>
                  <Button onClick={logout} className="w-full mt-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none font-bold" variant="outline">
                    Cerrar sesión
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* COLUMNA DERECHA: PEDIDOS */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="border-b border-slate-50 pb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl font-black italic">
                        <Package className="h-6 w-6 text-[#f39200]" /> MIS PEDIDOS
                      </CardTitle>
                      <CardDescription>Seguimiento de carga vinculada a {user.empresa}</CardDescription>
                    </div>
                    <Badge className="bg-orange-100 text-[#f39200] border-none font-bold px-3">
                      {pedidos.length} envíos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {isFetching ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <div className="rounded-md border border-slate-100 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className="font-bold text-slate-700">Tracking</TableHead>
                            <TableHead className="font-bold text-slate-700">ETA (Entrega)</TableHead>
                            <TableHead className="font-bold text-slate-700">Estado</TableHead>
                            <TableHead className="text-right font-bold text-slate-700">Documento</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.length > 0 ? pedidos.map((order: any) => (
                            <TableRow key={order.tracking_code} className="hover:bg-slate-50 transition-colors">
                              <TableCell className="font-mono font-bold text-[#f39200]">
                                {order.tracking_code}
                              </TableCell>
                              <TableCell className="text-slate-600 font-medium">{order.eta}</TableCell>
                              <TableCell>
                                <Badge className={cn(
                                  "font-bold px-2 py-0.5 border-none",
                                  order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 
                                  order.status === 'En transito' ? 'bg-blue-100 text-blue-700' : 
                                  'bg-orange-100 text-orange-700'
                                )}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-slate-400 hover:text-[#f39200] hover:bg-orange-50 font-bold"
                                  onClick={() => handleVerFactura(order.tracking_code)}
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Ver Doc
                                </Button>
                              </TableCell>
                            </TableRow>
                          )) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">
                                No hay pedidos activos para esta empresa.
                              </TableCell>
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

// Función auxiliar para clases condicionales
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}