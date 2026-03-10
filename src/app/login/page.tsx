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
import Image from 'next/image';

export default function LoginPage() {
  const { t } = useLanguage();
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
          adreca: foundUser.adreca,
          telefon: foundUser.telefon,
          fiscalid: foundUser.fiscalid,
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
    <div className="flex min-h-screen flex-col bg-slate-900">
      <Header />
      <main className="flex-1 relative flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src="/camion.png"
          alt="InTrack Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Capa de degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        <div className="relative z-10 w-full max-w-sm mb-6">
          <Button variant="ghost" asChild className="font-bold text-xs tracking-widest uppercase p-0 h-auto text-white hover:text-primary hover:bg-transparent">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> {t.login.back}
            </Link>
          </Button>
        </div>

        <Card className="relative z-10 w-full max-w-sm border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
          <div className="h-2 bg-[#f39200] w-full" />
          <CardHeader>
            <CardTitle className="text-3xl font-black tracking-tighter uppercase">{t.login.title}</CardTitle>
            <CardDescription className="font-medium text-slate-600">{t.login.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{t.login.email}</Label>
                <Input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="font-bold h-12 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-slate-500">{t.login.password}</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-bold h-12 bg-white"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="border-2 bg-red-50/50 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-bold text-xs">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-14 font-black bg-[#f39200] hover:bg-black text-white uppercase transition-all shadow-lg shadow-orange-500/20" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : t.login.button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
