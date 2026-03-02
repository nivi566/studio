'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, ChevronLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function LoginPage() {
  const { t } = useLanguage();
  // 1. CAMBIADO: Ahora se llama username en lugar de email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz11VTa8UXoSJXlRk1e53aOCFxzjexp5DNUhpotDONP3tUISE6bT6bMiTzSRtFqikhn/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 2. CAMBIADO: Usamos el estado username
    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    try {
      const response = await fetch(`${SCRIPT_URL}?sheet=usuari`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) throw new Error();
      
      const allUsers: any[] = await response.json();

      const foundUser = allUsers.find(
        (u) => 
          String(u.usuari).toLowerCase() === inputUser && 
          String(u.password) === inputPass
      );

      if (foundUser) {
        await login({
          usuari: foundUser.usuari,
          nom: foundUser.nom,
          empresa: foundUser.empresa,
          rol: foundUser.rol,
        });
        router.push('/dashboard');
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-sm mb-6">
          <Button variant="ghost" asChild className="font-black text-xs tracking-widest uppercase p-0 h-auto">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> VOLVER AL INICIO
            </Link>
          </Button>
        </div>

        <Card className="w-full max-w-sm border-2 shadow-2xl overflow-hidden">
          <div className="h-2 bg-[#f39200] w-full" />
          <CardHeader>
            <CardTitle className="text-3xl font-black tracking-tighter uppercase italic">INICIAR SESIÓN</CardTitle>
            <CardDescription className="font-medium">Accede a tu área privada.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">USUARIO</Label>
                <Input
                  type="text"
                  // 3. CAMBIADO: Ahora el placeholder es "Usuario"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="font-bold h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">CONTRASEÑA</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-bold h-12"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="border-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-bold text-xs">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-14 font-black bg-[#f39200] hover:bg-black text-white uppercase italic" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "ENTRAR"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}