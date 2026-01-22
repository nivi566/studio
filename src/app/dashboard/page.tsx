
'use client';

import React, { useEffect } from 'react';
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
import { FileEdit, KeyRound, Package, User as UserIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

const mockOrders = [
    {
        id: "INT72384",
        date: "15/07/2024",
        destination: "Barcelona",
        status: "Entregado",
        trackingUrl: "/tracking"
    },
    {
        id: "INT94831",
        date: "18/07/2024",
        destination: "Valencia",
        status: "En tránsito",
        trackingUrl: "/tracking"
    },
     {
        id: "INT28374",
        date: "20/07/2024",
        destination: "Madrid",
        status: "Procesando",
        trackingUrl: "/tracking"
    }
]

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading || !user) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </div>
                </div>
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
                <p className="mt-2 text-lg text-muted-foreground">Gestiona tu información personal y tus pedidos.</p>
            </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Columna Izquierda: Perfil y Acciones */}
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
                                <span className="text-muted-foreground">Nombre de usuario:</span>
                                <span className="font-medium text-foreground">{user.usuari}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Empresa:</span>
                                <span className="font-medium text-foreground">{user.empresa}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Rol:</span>
                                <span className="font-medium text-foreground">{user.rol}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full justify-start" variant="outline">
                                <FileEdit className="mr-2" /> Editar perfil
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <KeyRound className="mr-2" /> Cambiar contraseña
                            </Button>
                             <Button onClick={logout} className="w-full" variant="destructive">
                                Cerrar sesión
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Columna Derecha: Pedidos */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package /> Mis pedidos
                            </CardTitle>
                            <CardDescription>Aquí puedes ver un historial de tus pedidos recientes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Nº de seguimiento</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Destino</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono">{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.destination}</TableCell>
                                            <TableCell>
                                                 <Badge variant={order.status === 'Entregado' ? 'default' : order.status === 'En tránsito' ? 'secondary' : 'destructive'}
                                                  className={order.status === 'Entregado' ? 'bg-green-600' : ''}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => router.push(order.trackingUrl)}>
                                                    Seguir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button variant="ghost">Ver todos los pedidos</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
