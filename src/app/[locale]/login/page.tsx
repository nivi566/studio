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

    const inputEmail = email.trim();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      setError('El correo electrónico y la contraseña son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Fetch user(s) by email, case-insensitively.
      const searchUrl = `https://sheetdb.io/api/v1/nmk5zmlkneovd/search?sheet=usuari&usuari=${encodeURIComponent(inputEmail)}&case_sensitive=false`;
      
      const response = await fetch(searchUrl);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'No se pudo leer el cuerpo de la respuesta de error.');
        console.error('Error de SheetDB:', { status: response.status, statusText: response.statusText, body: errorBody });
        throw new Error(`Error del servidor (${response.status}). Revisa la consola para más detalles.`);
      }
      
      const potentialUsers: any[] = await response.json();

      if (potentialUsers.length === 0) {
        setError('Datos incorrectos. Verifica tu correo y contraseña.');
        setIsLoading(false);
        return;
      }
      
      // Step 2: Find the exact user by checking the password case-sensitively on the client side.
      const foundUser = potentialUsers.find(
        (u) => u.password && String(u.password).trim() === inputPassword
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
