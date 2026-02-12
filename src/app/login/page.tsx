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
      setError(t.login.errorRequired);
      setIsLoading(false);
      return;
    }

    try {
      const fetchUrl = `https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=usuari`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(t.login.errorServer);
      }
      
      const allUsers: any[] = await response.json();

      if (!Array.isArray(allUsers)) {
          throw new Error(t.login.errorServer);
      }

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
        setError(t.login.errorInvalid);
      }
    } catch (err: any) {
      setError(err.message || t.login.errorServer);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
            <div className="w-full max-w-sm mb-6">
                <Button variant="ghost" asChild className="font-black text-xs tracking-widest uppercase hover:text-primary p-0 h-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        {t.login.back}
                    </Link>
                </Button>
            </div>

            <Card className="w-full max-w-sm border-2 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-black tracking-tighter">{t.login.title}</CardTitle>
                    <CardDescription className="font-medium text-muted-foreground">
                        {t.login.subtitle}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-widest">{t.login.email}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="font-bold h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-black uppercase text-[10px] tracking-widest">{t.login.password}</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
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

                        <Button type="submit" className="w-full h-14 font-black tracking-widest text-lg bg-primary hover:bg-primary/90 shadow-lg active:scale-[0.98] transition-all" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {t.login.entering}
                                </>
                            ) : (
                                t.login.button
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
