'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Carregant...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24">
        <Card className="w-full max-w-2xl mx-4 text-center">
            <CardHeader>
                <CardTitle className="text-3xl">La teva zona privada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                 <p className="text-xl text-muted-foreground">
                    Benvingut de nou, <span className="font-bold text-primary">{user.username}</span>!
                 </p>
                 <div>
                    <h3 className="font-semibold text-lg text-foreground">Dades de l'empresa</h3>
                    <p className="text-muted-foreground">Empresa: {user.empresa}</p>
                 </div>

                <Button onClick={handleLogout} variant="destructive">
                    Sortir
                </Button>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
