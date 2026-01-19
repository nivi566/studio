'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LoginPage() {
  const [usuari, setUsuari] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuari || !password) {
      setError('El usuario y la contraseña son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=usuaris`
      );

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }
      
      const allUsers: any[] = await response.json();

      const foundUser = allUsers.find(
        (u) => u.usuari.toLowerCase() === usuari.toLowerCase() && String(u.password) === password
      );

      if (foundUser) {
        const userPayload = {
          usuari: foundUser.usuari,
          nom: foundUser.nom,
          empresa: foundUser.empresa,
          rol: foundUser.rol,
        };
        await login(userPayload);
      } else {
        setError('Datos incorrectos');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                    <CardDescription>
                        Accede a tu área privada.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="usuario">Usuario</Label>
                            <Input
                                id="usuario"
                                type="text"
                                placeholder="Tu usuario"
                                value={usuari}
                                onChange={(e) => setUsuari(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
        <Footer />
    </div>
  );
}
