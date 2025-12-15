'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'El camp usuari és requerit.' }),
  password: z.string().min(1, { message: 'La contrasenya és requerida.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://sheetdb.io/api/v1/qzvz5dqiomxdq/search?sheet=usuaris&usuario=${encodeURIComponent(data.username)}`);
            if (!response.ok) {
                throw new Error('No se pudo conectar con el servicio de autenticación.');
            }
            const users: any[] = await response.json();

            if (users.length > 0 && users[0].password === data.password) {
                const user = { username: users[0].usuario, empresa: users[0].empresa };
                login(user);
                toast({
                  title: "¡Sessió iniciada!",
                  description: `Benvingut de nou, ${user.username}.`,
                });
                form.reset();
                router.push('/');
            } else {
                setError('Usuario o contraseña incorrectos.');
            }
        } catch (e: any) {
            setError(e.message || 'Ha ocurrido un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24">
          <Card className="w-full max-w-md mx-4">
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {error && (
                              <Alert variant="destructive">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertDescription>
                                      {error}
                                  </AlertDescription>
                              </Alert>
                          )}
                          <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Usuario</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Usuario" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Contraseña</FormLabel>
                                      <FormControl>
                                          <Input type="password" placeholder="Tu contraseña" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                           <div className="flex items-center justify-between">
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    ¿Has olvidado tu contraseña?
                                </Link>
                            </div>
                          <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Iniciando...
                                </>
                            ) : 'Entrar'}
                          </Button>
                      </form>
                  </Form>
              </CardContent>
          </Card>
      </main>
      <Footer />
    </div>
  );
}
