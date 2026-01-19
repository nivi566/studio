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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      setError('El correo electrónico y la contraseña son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Fetch all users. This is more reliable than search.
      const fetchUrl = `https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=usuari`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'No se pudo leer el cuerpo del error.');
        console.error('Error de SheetDB:', { status: response.status, statusText: response.statusText, body: errorBody });
        throw new Error(`Error del servidor (${response.status}). No se pudo conectar con la base de datos.`);
      }
      
      const allUsers: any[] = await response.json();

      if (!Array.isArray(allUsers)) {
          console.error("La respuesta de la API no es una lista de usuarios:", allUsers);
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
      }

      // Step 2: Find the user on the client side.
      // This is more robust as it avoids issues with SheetDB's search endpoint.
      const foundUser = allUsers.find(
        (u) => 
          u.usuari &&
          String(u.usuari).trim().toLowerCase() === inputEmail &&
          u.password &&
          String(u.password).trim() === inputPassword
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
        setError('Datos incorrectos. Verifica tu correo y contraseña.');
      }
    } catch (err: any) {
      console.error('Error detallado en el inicio de sesión:', err);
      setError(err.message || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.');
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
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
