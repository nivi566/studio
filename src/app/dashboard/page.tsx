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
  CardFooter
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FileEdit, KeyRound, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  // ESTADOS PARA LOS DATOS REALES
  const [pedidos, setPedidos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // CONFIGURACIÓN SHEETDB
  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }

    // Cargar pedidos reales cuando el usuario existe
    if (user) {
      fetchRealOrders();
    }
  }, [user, isLoading, router]);

  const fetchRealOrders = async () => {
    try {
      // Filtramos por el nombre de la empresa o nombre del usuario según tu Excel
      const response = await fetch(`${SHEETDB_URL}/search?sheet=tracking&client=${encodeURIComponent(user.empresa)}`);
      const data = await response.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando pedidos del Excel:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleVerFactura = async (trackingCode: string) => {
    try {
      const response = await fetch(`${SHEETDB_URL}/search?sheet=documents&tracking_code=${trackingCode}`);
      const data = await response.json();

      if (data.length > 0 && data[0].num_factura) {
        const invoiceId = data[0].num_factura;
        router.push(`/documents?id=${invoiceId}`);
      } else {
        alert("No se ha encontrado una factura vinculada a este código de seguimiento.");
      }
    } catch (error) {
      console.error("Error al buscar la factura:", error);
      alert("Error al conectar con la base de datos para buscar la factura.");
    }
  };

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full rounded-lg" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Mi perfil</h1>
            <p className="mt-2 text-lg text-muted-foreground">Gestiona tu información personal y tus pedidos reales.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Columna Izquierda: Perfil */}
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl">{getInitials(user.nom)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{user.nom}</CardTitle>
                    <CardDescription>{user.rol} en {user.empresa}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuario:</span>
                    <span className="font-medium">{user.usuari}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Empresa vinculada:</span>
                    <span className="font-medium text-orange-600 font-bold">{user.empresa}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Acciones rápidas</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline"><FileEdit className="mr-2 h-4 w-4" /> Editar perfil</Button>
                  <Button className="w-full justify-start" variant="outline"><KeyRound className="mr-2 h-4 w-4" /> Cambiar contraseña</Button>
                  <Button onClick={logout} className="w-full" variant="destructive">Cerrar sesión</Button>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: Pedidos del Excel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src="/logoi.png" alt="InTrack" className="h-6 w-6" /> Mis pedidos vinculados
                  </CardTitle>
                  <CardDescription>Datos extraídos en tiempo real de tu seguimiento.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isFetching ? (
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Seguimiento</TableHead>
                          <TableHead>Fecha (ETA)</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pedidos.length > 0 ? pedidos.map((order: any) => (
                          <TableRow key={order.tracking_code}>
                            <TableCell className="font-mono font-bold text-blue-600">{order.tracking_code}</TableCell>
                            <TableCell>{order.eta}</TableCell>
                            <TableCell>
                              <Badge className={
                                order.status === 'Entregado' ? 'bg-green-600' : 
                                order.status === 'En transito' ? 'bg-blue-500' : 'bg-orange-500'
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => router.push(`/tracking?id=${order.tracking_code}`)}
                              >
                                Seguir
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="bg-gray-900"
                                onClick={() => handleVerFactura(order.tracking_code)}
                              >
                                <FileText className="h-4 w-4 mr-1" /> Factura
                              </Button>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No se encontraron pedidos vinculados a {user.empresa}.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
