
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, User, Building, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="space-y-4">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-8 w-80" />
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Benvingut a la teva zona privada, {user.username}
            </h1>
            
            <Card className="mt-12 text-left">
                <CardHeader>
                    <CardTitle>Detalls del teu Perfil</CardTitle>
                    <CardDescription>Aquesta és la informació associada al teu compte.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <p><span className="font-semibold">Nom d'usuari:</span> {user.username}</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <p><span className="font-semibold">Empresa:</span> {user.empresa}</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <p><span className="font-semibold">Rol:</span> {user.rol}</p>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={logout} className="mt-8" variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sortir
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
