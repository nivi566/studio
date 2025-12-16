
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, LogIn } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuario || !contrasena) {
      setError('Por favor, introduce el usuario y la contraseña.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/nkfnyayqlypxg/search?sheet=usuaris&login=${encodeURIComponent(usuario)}`);
      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }
      const data: any[] = await response.json();

      if (data.length > 0 && data[0].password === contrasena) {
        // Correct credentials
        const userPayload = {
          usuario: data[0].login,
          nombre: data[0].nom,
          empresa: data[0].empresa,
          rol: data[0].rol,
        };
        await login(userPayload);
      } else {
        // Incorrect credentials
        setError('Dades incorrectes');
      }
    } catch (err) {
      console.error(err);
      setError('Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
       <div className="absolute top-8 left-8">
         <Logo />
       </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta de InTrack</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Tu nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
